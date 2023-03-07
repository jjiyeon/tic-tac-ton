import { TonConnectButton } from '@tonconnect/ui-react'
import useTicTacToe from '../hooks/useTicTacToe'
import Game from './Game'
import Modal from './Modal'
import * as UI from './style'

const TicTacToe = () => {
  const [gameState, gameDispatcher] = useTicTacToe()

  const handleSquareClick = (id: number) => {
    console.log(id)
    gameDispatcher({ type: 'SET_BOARD', payload: { idx: id } })
  }

  return (
    <UI.Container>
      <UI.Header>Tic Tac Toe-!</UI.Header>
      <div>
        {/* {gameState.winner !== '' && <Modal winner={gameState.winner}>{gameState.winner}</Modal>} */}
        <Game squareCurrentValue={gameState} onSquareClick={(id) => handleSquareClick(id)} />
      </div>
      <UI.ScoreWrapper>
        <UI.ScoreTextList>
          <UI.Text>win : {gameState.winner}</UI.Text>
          <UI.Text>mid :</UI.Text>
          <UI.Text>defeat :</UI.Text>
        </UI.ScoreTextList>
      </UI.ScoreWrapper>
    </UI.Container>
  )
}

export default TicTacToe
