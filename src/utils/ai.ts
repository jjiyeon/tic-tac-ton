import { AI, DEFAULT, HUMAN, winCombos } from '../const/game'

const getWinningIndex = (board: string[], targetPlayer: string) => {
  let newBoard = board
  let winningIndex: number | null = null

  winCombos.forEach((winArray) => {
    let count = 0,
      index = 0

    winArray.map((value, idx) => {
      if (board[value] === targetPlayer) {
        count++
      } else {
        index = value
      }
    })
    if (count === 2 && board[index] === '') {
      console.log('getWinningIndex  : ', index)
      winningIndex = index
      return
    }
  })

  return winningIndex
}
const getMidAiIndex = (board: string[]) => {
  const attack = getWinningIndex(board, AI)

  console.log('attack  ! ', attack)
  if (attack !== null) return attack

  const defense = getWinningIndex(board, HUMAN)
  console.log('defense  ! ', defense)
  if (defense !== null) return defense

  const random = getRandomAiIndex(board)
  console.log('random  ! ', random)
  return random
}

const getRandomAiIndex = (board: string[]) => {
  const blank = board
    .map((val, idx) => {
      return val === DEFAULT ? idx : null
    })
    .filter((val, _) => val !== null)
  if (blank.length === 0) return null

  const random = Math.floor(Math.random() * blank.length)
  console.log('random : ', random)
  const index = blank[random]!

  return index
}

export { getRandomAiIndex, getMidAiIndex }
