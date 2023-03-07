import { GameState } from '../../hooks/useTicTacToe'
import * as UI from './style'

type Props = {
  onSquareClick: (id: number) => void
  squareCurrentValue: GameState
}
const Game = ({ onSquareClick, squareCurrentValue }: Props) => {
  return (
    <UI.Table>
      <thead></thead>
      <tbody>
        <UI.Tr>
          <UI.Td id="0" onClick={() => onSquareClick(0)}>
            {squareCurrentValue.board[0] ? squareCurrentValue.board[0] : ''}
          </UI.Td>
          <UI.Td id="1" onClick={() => onSquareClick(1)}>
            {squareCurrentValue.board[1] ? squareCurrentValue.board[1] : ''}
          </UI.Td>
          <UI.Td id="2" onClick={() => onSquareClick(2)}>
            {squareCurrentValue.board[2] ? squareCurrentValue.board[2] : ''}
          </UI.Td>
        </UI.Tr>
        <UI.Tr>
          <UI.Td id="3" onClick={() => onSquareClick(3)}>
            {squareCurrentValue.board[3] ? squareCurrentValue.board[3] : ''}
          </UI.Td>
          <UI.Td id="4" onClick={() => onSquareClick(4)}>
            {squareCurrentValue.board[4] ? squareCurrentValue.board[4] : ''}
          </UI.Td>
          <UI.Td id="5" onClick={() => onSquareClick(5)}>
            {squareCurrentValue.board[5] ? squareCurrentValue.board[5] : ''}
          </UI.Td>
        </UI.Tr>
        <UI.Tr>
          <UI.Td id="6" onClick={() => onSquareClick(6)}>
            {squareCurrentValue.board[6] ? squareCurrentValue.board[6] : ''}
          </UI.Td>
          <UI.Td id="7" onClick={() => onSquareClick(7)}>
            {squareCurrentValue.board[7] ? squareCurrentValue.board[7] : ''}
          </UI.Td>
          <UI.Td id="8" onClick={() => onSquareClick(8)}>
            {squareCurrentValue.board[8] ? squareCurrentValue.board[8] : ''}
          </UI.Td>
        </UI.Tr>
      </tbody>
    </UI.Table>
  )
}

export default Game
