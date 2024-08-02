import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/png/bg.png'; // Adjust the path if needed

interface GameState {
  player1: string;
  player2: string;
}

const GameBoard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameState | null;
  const player1 = state?.player1 ?? '';
  const player2 = state?.player2 ?? '';

  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add('fade-in');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard);

    if (!winner && newBoard.every(cell => cell)) {
      setWinner('Draw');
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board: string[]) => {
    const winPatterns: [number, number, number][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(currentPlayer === 'X' ? player1 : player2);
        return;
      }
    }
  };

  const handleEndGame = (result: string) => {
    navigate('/', { state: { player1, player2, result } });
  };

  const handleContinue = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
    setCurrentPlayer('X');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center fade-in"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md w-full border border-gray-300 bg-orange-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tic-Tac-Toe</h1>
        <div className="grid grid-cols-3 gap-1 w-80 mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`w-20 h-20 flex items-center justify-center text-5xl font-bold transition-colors duration-300 border-4 ${cell === 'X' ? 'text-red-600 border-red-600' : 'text-blue-600 border-blue-600'} ${cell ? 'bg-gray-300' : 'bg-white'} rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500`}
              style={{ marginLeft: '12px' }}
            >
              {cell}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          {winner ? (
            <div>
              <p className="text-3xl font-bold mb-4">{winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`}</p>
              <button
                onClick={() => handleEndGame(winner === 'Draw' ? 'Draw' : winner)}
                className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500"
              >
                Stop
              </button>
              <button
                onClick={handleContinue}
                className="ml-4 mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500"
              >
                Continue
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEndGame('Draw')}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500"
            >
              End Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
