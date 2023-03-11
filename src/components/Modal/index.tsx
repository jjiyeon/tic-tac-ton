import { Dispatch, PropsWithChildren } from 'react'
import { GameAction } from '../../hooks/useTicTacToe'
import * as UI from '../style'

type WinnerProps = {
  winner: string
  dispatch: Dispatch<GameAction>
}
const Modal = ({ winner, dispatch }: PropsWithChildren<WinnerProps>) => {
  const onResetClick = () => {
    dispatch({ type: 'TRIGGER_RESULT_MODAL' })
  }
  return (
    <UI.ModalContainer>
      <UI.Wrapper>
        <UI.WinnerText>{winner}</UI.WinnerText>
        <UI.ResetButton onClick={() => onResetClick()}>다시하기</UI.ResetButton>
      </UI.Wrapper>
    </UI.ModalContainer>
  )
}

export default Modal
