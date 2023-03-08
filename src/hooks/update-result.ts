/** @format */

import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient, Address, WalletContractV4 } from 'ton'
import { mnemonicToWalletKey } from 'ton-crypto'
import Game, { configToCell } from '../libs/game'
import { useTonConnect } from './useTonConnect'

export async function updateMain() {
  const endpoint = await getHttpEndpoint({ network: 'mainnet' })
  const client = new TonClient({ endpoint })
  // const { sender, connected } = useTonConnect()
  console.log('1. update start!------------')
  // console.log(sender, connected)
  // 지갑연결이 됐는지, 어떤 주소가 연결이 됐는지
  const mnemonic = 'trend type fringe express phone custom phrase prevent gauge method anxiety vapor drastic attack stomach void culture priority fire nominee spoil orange exile gain'
  const key = await mnemonicToWalletKey(mnemonic.split(' '))
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  })
  console.log('publickKey : ', key.publicKey)
  console.log('publickKey : ', key.secretKey)
  const walletContract = client.open(wallet)
  const walletSender = walletContract.sender(key.secretKey)
  //

  const seqno = await walletContract.getSeqno()

  const gameAddress = Address.parse('EQCG2m0OX_VTLLtJk8o_kDaIcWQeTxrQ_NyG312Gz29tfRNw')
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  const config = await gameContract.getConfig() //sender가 없어도 호출할 수 있음
  config.results.push() //{ address: gameAddress, win: 1, lose: 0, tie: 0 }
  await gameContract.sendUpdateResult(walletSender, configToCell(config))

  let currentSeqno = seqno
  while (currentSeqno == seqno) {
    console.log('waiting for transaction to confirm...')
    await sleep(1500)
    currentSeqno = await walletContract.getSeqno()
  }
  console.log('transaction confirmed!')
}

// updateMain()

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
