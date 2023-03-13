import { Address, Sender, TonClient } from 'ton'
import { TransactionProps, UpdateUserProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game, { configToCell } from '../contract/game'

type UpdateTransaction = TransactionProps & UpdateUserProps

const useUpdateResult = async ({ sender, wallet, client, user }: UpdateTransaction) => {
  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  const config = await gameContract.getConfig() //sender가 없어도 호출할 수 있음

  const findUser = config.results.filter((item, _) => {
    return item.address.toRawString() === user.address.toRawString()
  })
  const newResult = config.results.map((value, idx) => {
    if (value.address.toRawString() === user.address.toRawString()) {
      value.win = user.win
      value.lose = user.lose
      value.tie = user.tie
    }
    return value
  })
  if (findUser.length) {
    config.results = newResult
  } else {
    config.results.push(user) //{ address: Address.parse(wallet), win: 2, lose: 0, tie: 0 }
  }

  await gameContract.sendUpdateResult(sender, configToCell(config))

  const updateConfig = await gameContract.getConfig()
  return [updateConfig]
}

export default useUpdateResult
