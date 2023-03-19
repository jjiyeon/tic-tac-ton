import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { Config, Result } from '../contract/game'
import useGetResult from '../hooks/useGetResult'
import useTicTacToe from '../hooks/useTicTacToe'
import { useTonConnect } from '../hooks/useTonConnect'
import Game from './Game'
import Modal from './Modal'
import * as UI from './style'
import WebApp from '@twa-dev/sdk'
import { useTonClient } from '../hooks/useTonClient'
import { Address, Sender, TonClient } from 'ton'
import Ranking from './Ranking'

export type TransactionProps = {
  sender: Sender
  wallet: string
  client: TonClient
}

export type UpdateUserProps = {
  user: Result
  configValue: Config
}
const TicTacToe = () => {
  const [gameState, gameDispatcher] = useTicTacToe()
  const { sender, connected, wallet } = useTonConnect()
  const { client } = useTonClient()

  const [isRankingShow, setIsRankingShow] = useState(false)

  const handleSquareClick = (id: number) => {
    // if (!connected) return gameDispatcher({ type: 'WALLET_NOT_FOUND' }) // 알림창 컴포넌트 필요
    gameDispatcher({ type: 'SET_BOARD', payload: { idx: id } })
  }
  const getConfigResult = async () => {
    const configResult = await useGetResult({ sender: sender, wallet: wallet!, client: client! })
    if (!configResult.results.length) return alert('다시 접속해주세요')
    gameDispatcher({ type: 'SET_CONFIG_RESULT', payload: { configValue: configResult!, wallet: wallet! } })
  }

  const onRankingClick = () => {
    console.log('click')
    setIsRankingShow(true)
  }

  const onRecordClick = () => {
    // 기록하기를 누르면 트랜잭션이 발생한다. 다만 그전에 이겼는지 졌는지 결과가 필요하다.
    gameDispatcher({ type: 'RECORD_MY_SCORE' })
  }
  useEffect(() => {
    if (connected && wallet && client) {
      getConfigResult()
    }
  }, [client])
  return (
    <UI.Container>
      <UI.Header>
        <button onClick={onRankingClick}>
          <img src="./crown.png" alt="main logo img" />
        </button>
      </UI.Header>
      <UI.ScoreTextList>
        <UI.Text>Win: {gameState.localResult.win || 0}</UI.Text>
        <UI.Text>Lose: {gameState.localResult.lose || 0}</UI.Text>
        <UI.Text>Tie: {gameState.localResult.tie || 0}</UI.Text>
      </UI.ScoreTextList>

      <div>
        {gameState.isModalShow && (
          <Modal winner={gameState.winner} dispatch={gameDispatcher}>
            {gameState.winner}
          </Modal>
        )}
        {isRankingShow && <Ranking config={gameState.contractResult?.results || []} onCloseClick={() => setIsRankingShow((state) => !state)} />}

        <Game squareCurrentValue={gameState} onSquareClick={(id) => handleSquareClick(id)} />
      </div>

      <UI.RecordButtonWrapper>
        <UI.RecordButton onClick={onRecordClick}>Record My Score</UI.RecordButton>
      </UI.RecordButtonWrapper>
    </UI.Container>
  )
}

export default TicTacToe
