import { Address, Sender, TonClient } from 'ton'
import { TransactionProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game, { configToCell } from '../contract/game'

const useUpdateResult = async ({ sender, wallet, client }: TransactionProps) => {
  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  const config = await gameContract.getConfig() //sender가 없어도 호출할 수 있음
  config.results.push({ address: Address.parse(wallet), win: 2, lose: 0, tie: 0 }) //{ address: gameAddress, win: 1, lose: 0, tie: 0 }
  await gameContract.sendUpdateResult(sender, configToCell(config))

  console.log('useUpdateResult: ', await gameContract.getConfig())
  const updateCongint = await gameContract.getConfig()
  return [updateCongint]
}

export default useUpdateResult
