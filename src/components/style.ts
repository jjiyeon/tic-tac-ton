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
`
const StyledModal = styled.div`
  /* width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1); */
`

const ScoreTextList = styled.ul`
  display: flex;
  gap: 20px;
  justify-content: end;
`
const Text = styled.li``

const ScoreWrapper = styled.div`
  margin: 0 45px;
`
export { Container, ScoreWrapper, ScoreTextList, Text, ConnectWallet, WinnerText, Header, StyledModal }
