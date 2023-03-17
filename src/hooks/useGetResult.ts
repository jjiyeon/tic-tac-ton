import { Address } from 'ton'
import { TransactionProps } from '../components'
import { GAME_CONTRACT_ADDRESS } from '../const/game'
import Game from '../contract/game'

const useGetResult = async ({ client }: TransactionProps) => {
  const gameAddress = Address.parse(GAME_CONTRACT_ADDRESS)
  const game = new Game(gameAddress)
  const gameContract = client.open(game)

  const value = await gameContract.getConfig()
  return value
}

export default useGetResult
