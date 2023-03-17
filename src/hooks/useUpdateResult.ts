import { Address, Sender, TonClient } from 'ton'
import { TransactionProps, UpdateUserProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game, { configToCell } from '../contract/game'

type UpdateTransaction = TransactionProps & UpdateUserProps

const useUpdateResult = async ({ sender, wallet, client, user, configValue }: UpdateTransaction) => {
  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  // const config = await gameContract.getConfig() //sender가 없어도 호출할 수 있음

  const findUser = configValue.results.filter((item, _) => {
    return item.address.toRawString() === user.address.toRawString()
  })
  const newResult = configValue.results.map((value, idx) => {
    if (value.address.toRawString() === user.address.toRawString()) {
      value.win = user.win
      value.lose = user.lose
      value.tie = user.tie
    }
    return value
  })
  if (findUser.length) {
    configValue.results = newResult
  } else {
    configValue.results.push(user)
  }

  await gameContract.sendUpdateResult(sender, configToCell(configValue))

  const updateConfig = await gameContract.getConfig()
  return [updateConfig]
}

export default useUpdateResult
