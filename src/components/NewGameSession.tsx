import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewGameSession: React.FC = () => {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (player1 && player2) {
      navigate('/game');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Start New Game</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Player 1 Name</label>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Player 2 Name</label>
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleStartGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default NewGameSession;
