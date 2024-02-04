import { Oswald } from 'next/font/google';

import { useState } from 'react';

const font = Oswald({ subsets: ['latin'] });

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [winningIndices, setWinningIndices] = useState<number[]>([]);

  function handleClick(index: number) {
    if (gameOver || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(currentPlayer, newBoard)) {
      setGameOver(true);
      setMessage(`${currentPlayer} has won!`);
      return;
    }

    if (isDraw(newBoard)) {
      setGameOver(true);
      setMessage(`The game is a draw!`);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
    setWinningIndices([]);
  }

  function checkWinner(player: string, board: (string | null)[]) {
    for (let line of winningLines) {
      if (line.every((index) => board[index] === player)) {
        setWinningIndices(line); // the indices of the winning tiles
        return true;
      }
    }
    return false;
  }

  function isDraw(board: (string | null)[]): boolean {
    return board.every((tile) => tile !== null);
  }

  return (
    <main
      className={`${font.className} flex min-h-screen justify-center bg-teal-950`}
    >
      <div className="grid items-center">
        <div className="flex flex-col items-center space-y-10">
          <h1
            className={`font-semibold underline ${
              gameOver ? 'decoration-solid' : 'decoration-dashed'
            } text-8xl text-neutral-400 decoration-yellow-600 underline-offset-8`}
          >
            Tic-Tac-Toe
          </h1>
          {!gameOver ? (
            <div className="text-5xl drop-shadow-lg ">
              Current Player: &nbsp;
              <span
                className={`font-black 
                  ${currentPlayer === 'X' ? 'text-red-900' : 'text-blue-900'}
                `}
              >
                {currentPlayer}
              </span>
            </div>
          ) : (
            <div className="text-5xl">{message}</div>
          )}

          <div className="box shadow-cust relative h-[450px] w-[450px] overflow-hidden bg-lime-950/10">
            <div className="relative z-10 m-3 grid h-[94%] w-[94%] grid-cols-3 grid-rows-3 gap-1 p-2">
              {board.map((value, index) => (
                <div
                  key={index}
                  className={`${
                    gameOver
                      ? 'disabled-tile'
                      : 'tile hover:scale-95 active:scale-90'
                  } ${winningIndices.includes(index) ? 'winning-tile' : ''} ${
                    value === 'X'
                      ? 'flex items-center justify-center text-6xl font-black text-red-900'
                      : value === 'O'
                        ? 'flex items-center justify-center text-6xl font-black text-blue-900'
                        : ''
                  }`}
                  onClick={() => {
                    if (!gameOver && !value) {
                      handleClick(index);
                    }
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          <div className="justify-self-center">
            <button
              className="rounded-md border-none bg-neutral-900 p-3 text-3xl text-white/70 shadow-[0_8px_0_0px_rgba(0,0,0,0.3)] transition hover:text-white active:translate-y-2 active:shadow-none"
              onClick={resetGame}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
