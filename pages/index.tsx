import { Roboto_Mono } from 'next/font/google';
import { useState } from 'react';

const font = Roboto_Mono({ subsets: ['latin'] });

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  function handleClick(index: number) {
    if (board[index] !== null) {
      // The tile has already been clicked, ignore the click
      return;
    }
  
    // Update the board with the current player's move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
  
    // Check if the current player has won
    if (checkWinner(currentPlayer)) {
      alert(`${currentPlayer} has won!`);
      // Here you could also stop the game or set up the board for a new game
    }
  
    // Switch the current player
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
  }

  function checkWinner(player: string) {
    for (let line of winningLines) {
      if (line.every(index => board[index] === player)) {
        return true;
      }
    }
    return false;
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  }


  return (
    <main className={`${font.className} h-screen bg-teal-950`}>
      <div className="flex justify-center pt-24 font-mono text-7xl text-neutral-300">
        Tic-Tac-Toe
      </div>

      <div className="absolute inset-0 grid justify-center items-center">
        <div className="box relative w-[400px] h-[400px] bg-lime-950/10 overflow-hidden shadow-cust">
          <div className="relative w-[94%] h-[94%] z-10 m-3 grid grid-cols-3 grid-rows-3 gap-1 p-2">
            {board.map((value, index) => (
              <div
                key={index}
                className={`tile ${
                  value === 'X'
                    ? 'text-red-500 font-bold justify-center'
                    : value === 'O'
                    ? 'text-blue-500 font-bold justify-center'
                    : ''
                }`}
                onClick={() => handleClick(index)}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        <div className='absolute '>
      <button onClick={resetGame}>Reset</button>
    </div>
      </div>
    </main>
  );
}
