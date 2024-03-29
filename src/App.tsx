import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import '@twa-dev/sdk'
import styled from 'styled-components'
import TicTacToe from './components'
import * as UI from './components/style'

const StyledApp = styled.div`
  background-color: #2eaddc;
  background-image: linear-gradient(207deg, rgba(13, 129, 218, 1) 35%, rgba(212, 39, 233, 1) 100%);
  width: 100%;
  height: 100vh;
  color: black;
  font-family: 'Starborn';

  @font-face {
    font-family: 'Starborn';
    src: url('font/Starborn.otf') format('opentype');
    font-display: swap;
  }
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
        <UI.ConnectWallet>
          <TonConnectButton />
        </UI.ConnectWallet>
        <TicTacToe />
      </AppContainer>
    </StyledApp>
  )
}

export default App
