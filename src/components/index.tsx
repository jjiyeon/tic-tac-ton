import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { Config } from '../contract/game'
import { getMain } from '../hooks/get-result'
import { updateMain } from '../hooks/update-result'
import useGetResult from '../hooks/useGetResult'
import useTicTacToe from '../hooks/useTicTacToe'
import { useTonConnect } from '../hooks/useTonConnect'
import Game from './Game'
import Modal from './Modal'
import * as UI from './style'
import WebApp from '@twa-dev/sdk'
import { useTonClient } from '../hooks/useTonClient'
import { Address, Sender, TonClient } from 'ton'

export type TransactionProps = {
  sender: Sender
  wallet: string
  client: TonClient
}
const TicTacToe = () => {
  const [gameState, gameDispatcher] = useTicTacToe()
  const { sender, connected, wallet } = useTonConnect()
  const { client } = useTonClient()

  const handleSquareClick = (id: number) => {
    if (!connected) return gameDispatcher({ type: 'WALLET_NOT_FOUND' }) // 알림창 컴포넌트 필요
    gameDispatcher({ type: 'SET_BOARD', payload: { idx: id } })
  }
  // const getConfigResult = async () => {
  //   const configResult = await useGetResult({ sender: sender, wallet: wallet!, client: client! })
  //   gameDispatcher({ type: 'SET_CONFIG_RESULT', payload: { result: configResult || [], wallet: wallet! } })
  // }

  // useEffect(() => {
  //   if (connected && wallet && client) {
  //     console.log(1, wallet, connected, client)
  //     console.log(2)
  //     // updateMain({ sender: sender, wallet: wallet, client: client })
  //     // useGetResult({ sender: sender, wallet: wallet, client: client })
  //     getConfigResult()
  //   }
  // }, [client])
  return (
    <UI.Container>
      <UI.Header>Tic Tac Toe-!</UI.Header>
      {/* <UI.WinnerButtonWrapper>
        <UI.WinnerButton>
          <img src="/trophy-white.svg" alt="winner list check icon" />
        </UI.WinnerButton>
      </UI.WinnerButtonWrapper> */}
      <div>
        {gameState.isModalShow && (
          <Modal winner={gameState.winner} dispatch={gameDispatcher}>
            {gameState.winner}
          </Modal>
        )}
        <Game squareCurrentValue={gameState} onSquareClick={(id) => handleSquareClick(id)} />
      </div>
      <UI.ScoreWrapper>
        <UI.ScoreTextList>
          <UI.Text>Win : {gameState.localResult.win || 0}</UI.Text>
          <UI.Text>Lose :{gameState.localResult.lose || 0}</UI.Text>
          <UI.Text>Tie :{gameState.localResult.tie || 0}</UI.Text>
        </UI.ScoreTextList>
      </UI.ScoreWrapper>
    </UI.Container>
  )
}

export default TicTacToe
