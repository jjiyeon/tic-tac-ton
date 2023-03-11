import { useCallback, useEffect, useReducer } from 'react'
import produce from 'immer'
import useGetResult from './useGetResult'
import { getMain } from './get-result'
import { Result } from '../contract/game'
import { useTonConnect } from './useTonConnect'
import { updateMain } from './update-result'
import { useTonClient } from './useTonClient'
import { getMidAiIndex } from '../utils/ai'
import { AI, DEFAULT, HUMAN, winCombos } from '../const/game'
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
  // const getGameValue = useGetResult()
  // const { sender, connected } = useTonConnect()
  // const { sender, connected, wallet } = useTonConnect()
  // const { client } = useTonClient()

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
          // if (state.winner !== '') return
          state.whoTurn = AI

          // 여기서 ai turn
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
          state.isModalShow = !state.isModalShow
          if (state.isModalShow === false) state.winner = ''

          state.board = Array.from({ length: 9 }, () => '')

          state.whoTurn = HUMAN
          break
        }
        case 'WALLET_NOT_FOUND': {
          console.log('지갑연결이 필요합니다.')
          break
        }
        case 'SET_CONFIG_RESULT': {
          console.log('reducer , ', action.payload.result)

          // const result = action.payload.result.filter((val, idx) => val.address.toRawString() === action.payload.wallet)
          // state.localResult.win = result[0].win
          // state.localResult.lose = result[0].lose
          // state.localResult.tie = result[0].tie
          // console.log(result)
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
  }, [])
  useEffect(() => {
    if (gameState.winner !== '') {
      gameDispatcher({ type: 'TRIGGER_RESULT_MODAL' })
      gameDispatcher({ type: 'CHECK_RESULT', payload: resultType[gameState.winner] })
      // gameDispatcher({ type: 'GAME_INIT' })
    }
  }, [gameState.winner])

  return [gameState, gameDispatcher] as const
}

export default useTicTacToe
