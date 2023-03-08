/** @format */

import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient, Address } from 'ton'
import Game from '../libs/game'

/**
 * 결과값을 가지고 오는 함수,
 * result[]만 사용하면 될듯
 */
export async function main() {
  const endpoint = await getHttpEndpoint({ network: 'mainnet' })
  const client = new TonClient({ endpoint })

  const gameAddress = Address.parse('EQCG2m0OX_VTLLtJk8o_kDaIcWQeTxrQ_NyG312Gz29tfRNw')
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  const value = await gameContract.getConfig()
  return value
}

// main()
