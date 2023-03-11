import { getHttpEndpoint } from '@orbs-network/ton-access'
import { useMemo } from 'react'
import { Address, TonClient } from 'ton'
import { TransactionProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game from '../contract/game'

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
