import { useState } from 'react';
import { figtree, oswald, robotoSlab } from '../styles/fonts';

// const font = firaCode;

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
      className={`${robotoSlab.className} min-w-screen flex min-h-screen justify-center bg-teal-950`}
    >
      <div className="grid items-center">
        <div className="flex flex-col items-center space-y-10">
          <h1
            className={`typewriter text-5xl font-semibold text-neutral-100/70 underline decoration-yellow-600 underline-offset-8 drop-shadow-[0_-4px_1px_rgba(0,0,0,0.4)] md:text-7xl ${
              gameOver ? 'decoration-solid' : 'decoration-dashed'
            } `}
          >
            Tic-Tac-Toe
          </h1>
          {!gameOver ? (
            <div
              className={`text-3xl ${figtree.className} font-semibold text-neutral-300/70 drop-shadow-[0_0_2px_rgba(0,0,0,1)]`}
            >
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
            <div
              className={`text-3xl ${figtree.className} font-semibold text-neutral-300/70 drop-shadow-[0_0_2px_rgba(0,0,0,1)]`}
            >
              {message}
            </div>
          )}

          <div className="box shadow-cust relative h-96 w-96 overflow-hidden bg-lime-950/10">
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
                      ? 'flex items-center justify-center text-6xl font-black text-red-800/90'
                      : value === 'O'
                        ? 'flex items-center justify-center text-6xl font-black text-blue-800/90'
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
              className={`rounded-md border-none ${oswald.className} bg-yellow-600 p-3 text-3xl font-medium text-neutral-300/90 shadow-[0_8px_0_0px_rgba(0,0,0,1)] transition hover:text-white active:translate-y-2 active:scale-95 active:shadow-none`}
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
