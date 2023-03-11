import { DEFAULT, HUMAN, winCombos } from '../const/game'
import { resultType } from '../hooks/useTicTacToe'

const checkVictory = (gameBoard: string[]) => {
  let winner = null
  winCombos.map((winArray) => {
    const checkList = winArray.map((item, idx) => gameBoard[item])
    if (checkList[0] !== DEFAULT && checkList[0] === checkList[1] && checkList[1] === checkList[2]) {
      console.log('winner : ', checkList[0])
      winner = checkList[0]
      return
    }
  })
  return winner
}
const checkTie = (gameBoard: string[]) => {
  const blank = gameBoard
    .map((val, idx) => {
      return val === DEFAULT ? idx : null
    })
    .filter((val, _) => val !== null)

  return blank.length === 0
}

const checkGame = (gameBoard: string[]) => {
  const winner = checkVictory(gameBoard)
  if (winner !== null) {
    return winner === HUMAN ? resultType.win : resultType.lose
  }
  const isTie = checkTie(gameBoard)
  if (isTie) {
    return resultType.tie
  }
  return null
}
export { checkGame }
