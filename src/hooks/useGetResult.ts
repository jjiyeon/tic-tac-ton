import { getHttpEndpoint } from '@orbs-network/ton-access'
import { useMemo } from 'react'
import { Address, TonClient } from 'ton'
import Game from './game'

const useGetResult = async () => {
  // console.log('useGetResult')
  const endpoint = await getHttpEndpoint({ network: 'mainnet' })
  const client = new TonClient({ endpoint })

  const gameAddress = Address.parse('EQCG2m0OX_VTLLtJk8o_kDaIcWQeTxrQ_NyG312Gz29tfRNw')
  const game = new Game(gameAddress)
  const gameContract = client.open(game)
  const value = await gameContract.getConfig()

  const gameResult = value.results
  return gameResult
}

export default useGetResult
