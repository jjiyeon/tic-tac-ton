/** @format */

import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient, Address, Sender } from 'ton'
import Game from '../contract/game'
import { useTonClient } from './useTonClient'

/**
 * 결과값을 가지고 오는 함수,
 * result[]만 사용하면 될듯
 */
export async function getMain({ sender, walletAddr, client }: { sender: Sender; walletAddr: string; client: TonClient }) {
  // const endpoint = await getHttpEndpoint({ network: 'mainnet' })
  // const client = new TonClient({ endpoint })
  // const { client } = useTonClient()
  const gameAddress = Address.parse('EQCG2m0OX_VTLLtJk8o_kDaIcWQeTxrQ_NyG312Gz29tfRNw')
  const game = new Game(gameAddress)
  // const gameContract = client.open(game)
  if (client) {
    const gameContract = client.open(game)
    const value = await gameContract.getConfig()
    console.log('value : ', value.results)
    return value
  }
}

// main()
