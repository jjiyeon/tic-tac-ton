import { useEffect, useReducer } from 'react'
import produce from 'immer'
import { Config, Result } from '../contract/game'
import { getMidAiIndex } from '../utils/ai'
import { AI, DEFAULT, HUMAN } from '../const/game'
import { checkGame } from '../utils/game'
import { useTonConnect } from './useTonConnect'
import { useTonClient } from './useTonClient'
import useUpdateResult from './useUpdateResult'
import { Address } from 'ton'

export type GameState = {
  whoTurn: string
  board: string[]
  winner: string
  isModalShow: boolean
  localResult: ResultCount
  contractResult?: Config
}
export type ResultCount = {
  address: Address | string
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
      payload: { configValue: Config; wallet: string }
    }
  | {
      type: 'CHECK_GAME'
    }
  | {
      type: 'RECORD_MY_SCORE'
      // payload: Omit<ResultCount, 'address'>
    }

type GameReducer = (state: GameState, action: GameAction) => GameState

const useTicTacToe = () => {
  const { sender, connected, wallet } = useTonConnect()
  const { client } = useTonClient()

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
          if (state.winner === resultType.win) state.localResult.win += 1
          if (state.winner === resultType.lose) state.localResult.lose += 1

          break
        }
        case 'RECORD_MY_SCORE': {
          console.log('RECORD_MY_SCORE')
          if (!wallet) {
            alert('Please connect to your wallet.')
          }
          const updateUser = async () => {
            if (wallet && client) {
              await useUpdateResult({
                sender: sender,
                wallet: wallet, //
                client: client,
                user: { ...state.localResult, address: Address.parse(wallet) },
                configValue: state.contractResult!,
              })
            }
          }

          updateUser()
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
          console.log(action.payload.configValue)
          alert(action.payload.configValue)

          state.contractResult = action.payload.configValue
          if (action.payload.configValue.results.length) {
            const result = action.payload.configValue.results.filter((val, _) => {
              if (!val.address) return alert('undefined!')
              return val.address.toString() === Address.parse(action.payload.wallet).toString()
            })
            state.localResult = { address: result[0].address, win: result[0].win, lose: result[0].lose, tie: result![0].tie }
          }
          break
        }
        default:
          console.log('error!!!!!')
          alert('error!')
          throw new Error()
      }
    }),
    {
      whoTurn: HUMAN,
      board: Array.from({ length: 9 }, () => ''),
      winner: '',
      isModalShow: false,
      localResult: { address: '', win: 0, lose: 0, tie: 0 },
      contractResult: undefined,
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
