import { PropsWithChildren } from 'react'
import * as UI from '../style'

type WinnerProps = {
  winner: string
}
const Modal = ({ winner }: PropsWithChildren<WinnerProps>) => {
  return (
    <UI.StyledModal>
      <UI.WinnerText>Winner: {winner}</UI.WinnerText>
    </UI.StyledModal>
  )
}

export default Modal
