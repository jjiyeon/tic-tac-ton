import styled from 'styled-components'

const Table = styled.table`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;

  border-collapse: collapse;
`
const Tr = styled.tr``
const Td = styled.td<{ player?: string }>`
  border: 2px solid rgba(255, 255, 255, 0.5);
  width: calc(100% / 3);
  height: calc(100% / 3);

  font-size: 36px;

  color: ${({ player }) => (player === 'o' ? '#52ABFC' : '#F9284D')};
`

export { Table, Td, Tr }
