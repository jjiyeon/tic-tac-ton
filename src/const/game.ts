const GAME_CONTRACT_ADDRESS = 'EQCG2m0OX_VTLLtJk8o_kDaIcWQeTxrQ_NyG312Gz29tfRNw' //'EQCxp6l46-l9xe48MPKANcUK_dz484UxJyABhG9iK8E88YAB'
const GAME_CONTRACT_TEST = 'EQDnzE3w0ccVLqCXBaOMSlLkxcNynW739q6Vb1uDGkr6f-xp'

const HUMAN = 'o'
const AI = 'x'
const DEFAULT = ''

const winCombos = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //slant
  [0, 4, 8],
  [6, 4, 2],
]

export { GAME_CONTRACT_ADDRESS, GAME_CONTRACT_TEST, HUMAN, AI, DEFAULT, winCombos }
