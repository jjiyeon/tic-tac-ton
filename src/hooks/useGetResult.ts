import { getHttpEndpoint } from '@orbs-network/ton-access'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Address, TonClient } from 'ton'
import { TransactionProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game, { Config } from '../contract/game'

type DeferredPromise<Config> = {
  resolve: (value: Config) => void
  reject: (value: unknown) => void
  promise: Promise<Config>
}

// const useGetResult = async ({ client }: TransactionProps) => {
//   console.log('useGetResult')
//   const deferRef = useRef<Promise<Config>>(null)

//   const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
//   const game = new Game(gameAddress)

//   return useCallback(async () => {
//     const deferred = {} as DeferredPromise<Config>
//     const promise = new Promise<Config>((resolve, reject) => {
//       deferred.resolve = resolve
//       deferred.reject = reject
//     })

//     deferred.promise = promise
//     deferRef.current = deferred

//     if (client) {
//       const gameContract = client.open(game)
//       const value = await gameContract.getConfig()
//       const gameResult = value.results
//       console.log('value : ', value.results)
//       return gameResult
//     }
//   }, [])
// }

const useGetResult = async ({ client }: TransactionProps) => {
  console.log('useGetResult')

  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)

  const game = new Game(gameAddress)
  if (client) {
    const gameContract = client.open(game)
    const value = await gameContract.getConfig()
    const gameResult = value.results
    console.log('value : ', value.results)

    return gameResult
  }
}

export default useGetResult
