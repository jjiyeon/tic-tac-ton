import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Starborn';
  /* font-style: italic; */
`

const ConnectWallet = styled.div`
  /* display: flex;
  justify-content: center; */

  position: absolute;
  top: 20px;
  right: 20px;

  button {
    background-color: tomato;
    font-family: sans-serif;
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
  justify-content: center;
  gap: 20px;
  position: relative;
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
const Text = styled.li`
  font-size: 16px;
`

const ScoreWrapper = styled.div`
  margin: 0 45px;
`
const RecordButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`
const RecordButton = styled.button`
  width: 200px;
  height: 42px;
  border-radius: 16px;
  border: 0;
  background-color: #52abfc;
  color: #fff;
`
const RankingButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border: 0;
  background: tomato;
  border-radius: 4px;
`
const RankingUsers = styled.ul`
  li {
    color: #000;
  }
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
  RecordButtonWrapper,
  RecordButton,
  RankingButton,
  RankingUsers,
}
