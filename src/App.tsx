import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import TicTacToe from "./components";
import * as UI from "./components/style";

const StyledApp = styled.div`
  background-color: #2eaddc;
  background-image: radial-gradient(
    149.59% 88.94% at -53.99% -42.96%,
    rgba(249, 69, 141, 0) 0%,
    rgba(249, 69, 141, 0) 0.01%,
    #201e45 100%
  );
  width: 100%;
  height: 100vh;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  /* min-height: 100vh; */
  /* padding: 20px 20px; */
`;

const AppContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <UI.ConnectWallet>
          <TonConnectButton />
        </UI.ConnectWallet>
        <TicTacToe />
        {/* <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Counter />
          <TransferTon />
          <Jetton />
        </FlexBoxCol> */}
      </AppContainer>
    </StyledApp>
  );
}

export default App;
