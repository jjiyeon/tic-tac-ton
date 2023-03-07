import { useCallback, useEffect, useReducer } from "react";
import produce from "immer";

export type GameState = {
  whoTurn: string;
  board: string[];
  winner: string;
};

export type GameAction =
  | {
      type: "SET_TURN";
      payload: {
        who: string;
      };
    }
  | {
      type: "SET_BOARD";
      payload: { idx: number };
    }
  | {
      type: "SET_AI_BOARD";
    }
  | {
      type: "CHECK_WIN";
    };

type GameReducer = (state: GameState, action: GameAction) => GameState;
const HUMAN = "o";
const AI = "x";
const DEFAULT = "";
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
];
// const calc = (props: string[]) => {
//   const array = props
//     .map((val, idx) => {
//       return val === DEFAULT ? idx : null
//     })
//     .filter((val, _) => val !== null)

//   const random = Math.floor(Math.random() * array.length)

//   return random
// }

const useTicTacToe = () => {
  const [gameState, gameDispatcher] = useReducer<GameReducer>(
    produce((state, action) => {
      switch (action.type) {
        case "SET_BOARD": {
          // 누구차례고 보드가 클릭 가능한건지 아니면 리턴

          if (state.whoTurn !== HUMAN) return;
          if (state.board[action.payload.idx] !== DEFAULT) return;

          state.board[action.payload.idx] = state.whoTurn;
          winCombos.forEach((winArray) => {
            const checkList = winArray.map((item, idx) => state.board[item]);
            if (
              checkList[0] !== DEFAULT &&
              checkList[0] === checkList[1] &&
              checkList[1] === checkList[2]
            ) {
              state.winner = checkList[0];

              return;
            }
          });
          if (state.winner !== "") return;
          state.whoTurn = AI;

          // 여기서 ai turn
          break;
        }
        case "SET_AI_BOARD": {
          const array = state.board
            .map((val, idx) => {
              return val === DEFAULT ? idx : null;
            })
            .filter((val, _) => val !== null);

          const random = Math.floor(Math.random() * array.length);
          const index = array[random]!;
          //
          if (state.board[index] !== DEFAULT) return;

          winCombos.forEach((winArray) => {
            const checkList = winArray.map((item, idx) => state.board[item]);
            if (
              checkList[0] !== DEFAULT &&
              checkList[0] === checkList[1] &&
              checkList[1] === checkList[2]
            ) {
              state.winner = checkList[0];
              return;
            }
          });

          state.board[index] = state.whoTurn;
          state.whoTurn = HUMAN;
          break;
        }
        case "CHECK_WIN": {
          break;
        }
        default:
          throw new Error();
      }
    }),
    {
      whoTurn: HUMAN,
      board: Array.from({ length: 9 }, () => ""),
      winner: "",
    }
  );

  useEffect(() => {
    if (gameState.whoTurn === AI) {
      gameDispatcher({ type: "SET_AI_BOARD" });
    }
  }, [gameState.whoTurn]);
  return [gameState, gameDispatcher] as const;
};

export default useTicTacToe;
