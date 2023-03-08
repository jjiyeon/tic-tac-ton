import { TonConnectButton } from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { Config } from '../libs/game'
import { main } from '../hooks/get-result'
import { updateMain } from '../hooks/update-result'
import useGetResult from '../hooks/useGetResult'
import useTicTacToe from '../hooks/useTicTacToe'
import { useTonConnect } from '../hooks/useTonConnect'
import Game from './Game'
import Modal from './Modal'
import * as UI from './style'

const TicTacToe = () => {
  const [gameState, gameDispatcher] = useTicTacToe()
  const { sender, connected } = useTonConnect()
  if (connected) updateMain()
  console.log(sender.address, connected.valueOf)
  const handleSquareClick = (id: number) => {
    console.log('id : ', id)
    gameDispatcher({ type: 'SET_BOARD', payload: { idx: id } })
  }
  useEffect(() => {}, [connected])
  return (
    <UI.Container>
      <UI.Header>Tic Tac Toe-!</UI.Header>
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
          <UI.Text>Win : {gameState.localResult.win}</UI.Text>
          <UI.Text>Lose :{gameState.localResult.lose}</UI.Text>
          <UI.Text>Tie :{gameState.localResult.tie}</UI.Text>
        </UI.ScoreTextList>
      </UI.ScoreWrapper>
    </UI.Container>
  )
}

export default TicTacToe
