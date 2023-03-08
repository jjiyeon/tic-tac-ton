import { useCallback, useEffect, useReducer } from 'react'
import produce from 'immer'
import useGetResult from './useGetResult'
import { main } from './get-result'
import { Result } from '../libs/game'
import { useTonConnect } from './useTonConnect'

export type GameState = {
  whoTurn: string
  board: string[]
  winner: string
  isModalShow: boolean
  localResult: ResultCount
  contractResult: Result[]
}
type ResultCount = {
  win: number
  lose: number
  tie: number
}

interface IndexResult {
  [index: string]: string
}
const resultType: IndexResult = {
  win: 'win',
  lose: 'lose',
  tie: 'tie',
}
export type GameAction =
  | {
      type: 'SET_TURN'
      payload: {
        who: string
      }
    }
  | {
      type: 'SET_BOARD'
      payload: { idx: number }
    }
  | {
      type: 'SET_AI_BOARD'
    }
  | {
      type: 'CHECK_RESULT'
      payload: string
    }
  | {
      type: 'GAME_INIT'
    }
  | {
      type: 'TRIGGER_RESULT_MODAL'
    }
  | {
      type: 'CHECK_BOARD'
    }

type GameReducer = (state: GameState, action: GameAction) => GameState
const HUMAN = 'o'
const AI = 'x'
const DEFAULT = ''
const winCombos = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //slant
  [0, 4, 8],
  [6, 4, 2],
]

const useTicTacToe = () => {
  const getGameValue = useGetResult()
  // const { sender, connected } = useTonConnect()

  const [gameState, gameDispatcher] = useReducer<GameReducer>(
    produce((state, action) => {
      switch (action.type) {
        case 'SET_BOARD': {
          // 누구차례고 보드가 클릭 가능한건지 아니면 리턴

          if (state.whoTurn !== HUMAN) return
          if (state.board[action.payload.idx] !== DEFAULT) return

          state.board[action.payload.idx] = state.whoTurn
          winCombos.forEach((winArray) => {
            const checkList = winArray.map((item, idx) => state.board[item])
            if (checkList[0] !== DEFAULT && checkList[0] === checkList[1] && checkList[1] === checkList[2]) {
              state.winner = checkList[0]
              console.log('winner : ', checkList[0])
              // return
            }
          })
          // if (state.winner !== '') return
          state.whoTurn = AI

          // 여기서 ai turn
          break
        }
        case 'SET_AI_BOARD': {
          if (state.winner !== '') return
          const array = state.board
            .map((val, idx) => {
              return val === DEFAULT ? idx : null
            })
            .filter((val, _) => val !== null)

          if (array.length === 0) state.winner = resultType.tie

          const random = Math.floor(Math.random() * array.length)
          console.log('random : ', random)
          const index = array[random]!
          //
          if (state.board[index] !== DEFAULT) return

          winCombos.map((winArray) => {
            const checkList = winArray.map((item, idx) => state.board[item])
            if (checkList[0] !== DEFAULT && checkList[0] === checkList[1] && checkList[1] === checkList[2]) {
              state.winner = checkList[0]
              console.log('winner : ', checkList[0])
              return checkList[0]
            }
          })

          state.board[index] = state.whoTurn
          state.whoTurn = HUMAN
          break
        }
        case 'CHECK_RESULT': {
          //승부 확인
          if (state.winner === resultType.tie) state.localResult.tie += 1
          if (state.winner === 'o') state.localResult.win += 1
          if (state.winner === 'x') state.localResult.lose += 1

          // console.log(sender)
          // console.log(connected)
          break
        }
        case 'GAME_INIT': {
          //게임 초기화
          state.board = Array.from({ length: 9 }, () => '')

          state.whoTurn = HUMAN

          break
        }
        case 'CHECK_BOARD': {
          console.log('-CHECK_BOARD')

          const checkBoard = state.board.filter((val, _) => val !== DEFAULT)
          if (checkBoard.length === 0) state.winner = 'tie'

          break
        }
        case 'TRIGGER_RESULT_MODAL': {
          console.log('modal sy!')
          state.isModalShow = !state.isModalShow
          if (state.isModalShow === false) state.winner = ''
          break
        }
        default:
          throw new Error()
      }
    }),
    {
      whoTurn: HUMAN,
      board: Array.from({ length: 9 }, () => ''),
      winner: '',
      isModalShow: false,
      localResult: { win: 0, lose: 0, tie: 0 },
      contractResult: [],
    }
  )

  useEffect(() => {
    if (gameState.whoTurn === AI) {
      gameDispatcher({ type: 'CHECK_BOARD' })
      gameDispatcher({ type: 'SET_AI_BOARD' })
    }
  }, [gameState.whoTurn])

  useEffect(() => {
    // board가 다 찼고, 승리자가 없으면 무승부!
    // gameDispatcher({ type: 'CHECK_BOARD' })
  }, [gameState.board])
  useEffect(() => {
    if (gameState.winner !== '') {
      gameDispatcher({ type: 'TRIGGER_RESULT_MODAL' })
      gameDispatcher({ type: 'CHECK_RESULT', payload: resultType[gameState.winner] })
      gameDispatcher({ type: 'GAME_INIT' })
    }
  }, [gameState.winner])

  // \
  return [gameState, gameDispatcher] as const
}

export default useTicTacToe
