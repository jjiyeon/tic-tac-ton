/** @format */

import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient, Address, WalletContractV4, OpenedContract, Sender, Contract } from 'ton'
import { mnemonicToWalletKey } from 'ton-crypto'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game, { configToCell } from '../contract/game'
import { useAsyncInitialize } from './useAsyncInitialize'
import { useTonClient } from './useTonClient'
import { useTonConnect } from './useTonConnect'

type UpdateProps = {
  sender: Sender
  wallet: string
  client: TonClient
}
export async function updateMain({ sender, wallet, client }: UpdateProps) {
  // const endpoint = await getHttpEndpoint({ network: 'mainnet' })
  // const client = new TonClient({ endpoint })
  // const { wallet, sender } = useTonConnect()
  // console.log(client)

  // const { client } = useTonClient()
  // console.log(sender, connected)
  // 지갑연결이 됐는지, 어떤 주소가 연결이 됐는지

  // const mnemonic = ''
  // const key = await mnemonicToWalletKey(mnemonic.split(' '))
  // const wallet = WalletContractV4.create({
  //   publicKey: key.publicKey,
  //   workchain: 0,
  // })

  // const walletContract = client.open(wallet)
  // const walletSender = walletContract.sender(key.secretKey)
  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  // const walletContract = useAsyncInitialize(async () => {
  //   if (!gameContract || !client) return
  //   const ticWalletAddress = Address.parse(wallet!)
  //   return client!.open(new TicWallet(ticWalletAddress)) as OpenedContract<TicWallet>
  // }, [gameContract, client])

  // const seqno = await walletContract!.getSeqno()

  const config = await gameContract.getConfig() //sender가 없어도 호출할 수 있음
  config.results.push({ address: Address.parse(wallet), win: 2, lose: 0, tie: 0 }) //{ address: gameAddress, win: 1, lose: 0, tie: 0 }
  await gameContract.sendUpdateResult(sender, configToCell(config))

  // let currentSeqno = seqno
  // while (currentSeqno == seqno) {
  //   console.log('waiting for transaction to confirm...')
  //   await sleep(1500)
  //   currentSeqno = await walletContract.getSeqno()
  // }
  console.log('transaction confirmed!')
}

// updateMain()

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
