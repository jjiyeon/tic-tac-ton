import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  color: #fff;
`

const ConnectWallet = styled.div`
  display: flex;
`
const Header = styled.h1`
  text-align: center;
  font-family: 'Roboto', sans-serif;
`
const WinnerText = styled.h2`
  text-align: center;
  font-size: 40px;
`
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
  background: rgba(255, 255, 255, 0.3);
  align-items: center;
  text-align: center;
`
const ResetButton = styled.button``
const ScoreTextList = styled.ul`
  display: flex;
  gap: 20px;
  justify-content: end;

  width: 300px;
  margin: 0 auto;
`
const Text = styled.li``

const ScoreWrapper = styled.div`
  margin: 0 45px;
`
export { Container, ScoreWrapper, ScoreTextList, Text, ConnectWallet, WinnerText, Header, ModalContainer, Wrapper, ResetButton }
