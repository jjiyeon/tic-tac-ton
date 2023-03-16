import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Starborn';
  /* font-style: italic; */
`

const ConnectWallet = styled.div`
  display: flex;
  justify-content: center;

  button {
    background-color: tomato;
  }
`
const Header = styled.h1`
  text-align: center;
  width: 100px;
  height: auto;
  margin: 0 auto;

  button {
    all: unset;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
  }
`
const WinnerText = styled.h2`
  text-align: center;
  font-size: 40px;
  color: #000;
`
const WinnerButtonWrapper = styled.div``
const WinnerButton = styled.button``
const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
`
const Wrapper = styled.div`
  width: 100%;
  height: 33.33%;
  background: #9bfa3c;
  align-items: center;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
const ResetButton = styled.button`
  width: 200px;
  height: 60px;
  border: 1px solid #000;
  background: #52abfc;
  border-radius: 20px;
  color: #fff;
`
const ScoreTextList = styled.ul`
  display: flex;
  gap: 20px;
  justify-content: end;

  width: 300px;
  margin: 0 auto;

  font-size: 20px;
  justify-content: space-between;
  padding: 10px 0;
`
const Text = styled.li``

const ScoreWrapper = styled.div`
  margin: 0 45px;
`
export {
  Container,
  ScoreWrapper, //
  WinnerButtonWrapper,
  WinnerButton,
  ScoreTextList,
  Text,
  ConnectWallet,
  WinnerText,
  Header,
  ModalContainer,
  Wrapper,
  ResetButton,
}
