import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import '@twa-dev/sdk'
import styled from 'styled-components'
import TicTacToe from './components'
import * as UI from './components/style'

const StyledApp = styled.div`
  background-color: #2eaddc;
  background-image: radial-gradient(149.59% 88.94% at -53.99% -42.96%, rgba(249, 69, 141, 0) 0%, rgba(249, 69, 141, 0) 0.01%, #201e45 100%);
  width: 100%;
  height: 100vh;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
`

const AppContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  flex-direction: column;
  justify-content: center;
  gap: 20px;
`

function App() {
  return (
    <StyledApp>
      <AppContainer>
        <UI.ConnectWallet>{/* <TonConnectButton /> */}</UI.ConnectWallet>
        <TicTacToe />
      </AppContainer>
    </StyledApp>
  )
}

export default App
