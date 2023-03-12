import { useEffect, useReducer } from 'react'
import produce from 'immer'
import { Result } from '../contract/game'
import { getMidAiIndex } from '../utils/ai'
import { AI, DEFAULT, HUMAN } from '../const/game'
import { checkGame } from '../utils/game'

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
export const resultType: IndexResult = {
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
  | {
      type: 'WALLET_NOT_FOUND'
    }
  | {
      type: 'SET_CONFIG_RESULT'
      payload: { result: Result[]; wallet: string }
    }
  | {
      type: 'CHECK_GAME'
    }

type GameReducer = (state: GameState, action: GameAction) => GameState

const useTicTacToe = () => {
  const [gameState, gameDispatcher] = useReducer<GameReducer>(
    produce((state, action) => {
      switch (action.type) {
        case 'SET_BOARD': {
          // 누구차례고 보드가 클릭 가능한건지 아니면 리턴

          if (state.whoTurn !== HUMAN) return
          if (state.board[action.payload.idx] !== DEFAULT) return

          state.board[action.payload.idx] = state.whoTurn
          const result = checkGame(state.board)

          if (result !== null) {
            state.winner = result
            return
          }
          state.whoTurn = AI

          break
        }
        case 'SET_AI_BOARD': {
          if (state.winner !== '') return

          const aiIndex = getMidAiIndex(state.board)
          if (aiIndex === null) return (state.winner = resultType.tie)
          if (state.board[aiIndex] !== DEFAULT) return
          state.board[aiIndex] = state.whoTurn

          const result = checkGame(state.board)
          if (result !== null) {
            state.winner = result
            return
          }
          state.whoTurn = HUMAN
          break
        }
        case 'CHECK_GAME': {
          break
        }
        case 'CHECK_RESULT': {
          //승부 확인
          if (state.winner === resultType.tie) state.localResult.tie += 1
          if (state.winner === 'o') state.localResult.win += 1
          if (state.winner === 'x') state.localResult.lose += 1

          //@todo update transaction
          break
        }
        case 'GAME_INIT': {
          //게임 초기화
          state.board = Array.from({ length: 9 }, () => '')
          state.whoTurn = HUMAN

          break
        }
        case 'CHECK_BOARD': {
          const checkBoard = state.board.filter((val, _) => val !== DEFAULT)
          if (checkBoard.length === 0) state.winner = 'tie'

          break
        }
        case 'TRIGGER_RESULT_MODAL': {
          state.isModalShow = !state.isModalShow
          if (state.isModalShow === false) state.winner = ''

          break
        }
        case 'WALLET_NOT_FOUND': {
          console.log('지갑연결이 필요합니다.')
          break
        }
        case 'SET_CONFIG_RESULT': {
          console.log('reducer , ', action.payload.result)

          const result = action.payload.result.filter((val, _) => val.address.toRawString() === action.payload.wallet)
          state.localResult = { win: result[0].win, lose: result[0].lose, tie: result[0].tie }
          console.log(result)
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
    if (gameState.winner !== '') {
      gameDispatcher({ type: 'TRIGGER_RESULT_MODAL' })
      gameDispatcher({ type: 'CHECK_RESULT', payload: resultType[gameState.winner] })
    }
  }, [gameState.winner])

  return [gameState, gameDispatcher] as const
}

export default useTicTacToe
