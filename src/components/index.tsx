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
    gameDispatcher({ type: 'SET_CONFIG_RESULT', payload: { configValue: configResult!, wallet: wallet! } })
  }

  const onRankingClick = () => {
    console.log('click')
    setIsRankingShow(true)
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
        <UI.Text>Win : {gameState.localResult.win || 0}</UI.Text>
        <UI.Text>Lose :{gameState.localResult.lose || 0}</UI.Text>
        <UI.Text>Tie :{gameState.localResult.tie || 0}</UI.Text>
      </UI.ScoreTextList>

      <div>
        {gameState.isModalShow && (
          <Modal winner={gameState.winner} dispatch={gameDispatcher}>
            {gameState.winner}
          </Modal>
        )}
        {isRankingShow && <Ranking />}

        <Game squareCurrentValue={gameState} onSquareClick={(id) => handleSquareClick(id)} />
      </div>

      <UI.ConnectWallet>
        <TonConnectButton />
      </UI.ConnectWallet>
    </UI.Container>
  )
}

export default TicTacToe
