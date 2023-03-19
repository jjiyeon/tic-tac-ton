import * as UI from '../style'
import { Result } from '../../contract/game'

const toFiveOfResult = (result: Result[]) => {
  const sortedResults = [...result]
    .sort((a, b) => {
      if (b.win > a.win) return 1
      if (b.win < a.win) return -1
      if (b.win === a.win) {
        return b.tie - a.tie
      }
      return 0
    })
    .slice(0, 5)
  return sortedResults
}
const Ranking = ({ config, onCloseClick }: { config: Result[]; onCloseClick: () => void }) => {
  return (
    <UI.ModalContainer>
      <UI.Wrapper>
        <UI.WinnerText>Ranking</UI.WinnerText>
        <UI.RankingButton onClick={onCloseClick}>X</UI.RankingButton>
        <UI.RankingUsers>
          {config ? ( //
            toFiveOfResult(config).map((val, idx) => <li key={idx}>{`${idx + 1}.st ${val.address.toString().slice(0, 12)}...${val.address.toString().slice(-4)}`}</li>)
          ) : (
            <p>Let's make it to the ranking!</p>
          )}
        </UI.RankingUsers>
      </UI.Wrapper>
    </UI.ModalContainer>
  )
}

export default Ranking
