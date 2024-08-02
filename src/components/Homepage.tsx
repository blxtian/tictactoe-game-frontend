import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/png/bg.png';

interface GameData {
  id: string;
  player1: string;
  player2: string;
  result: string;
}

const HomePage: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add('fade-in');
    }, 0);

    const savedGames = localStorage.getItem('games');
    if (savedGames) {
      const parsedGames: GameData[] = JSON.parse(savedGames);
      const limitedGames = parsedGames.slice(-7);
      setGames(limitedGames);
    }

    return () => clearTimeout(timer);
  }, []);

  const startNewGame = () => {
    if (player1 && player2) {
      navigate('/game', { state: { player1, player2 } });
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-cover bg-center fade-in"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-[#FFA07A] border-2 border-orange-400 shadow-lg rounded-lg p-6 mb-6 max-w-lg w-full md:w-1/2 md:mr-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Tic-Tac-Toe Game</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">Previous Games</h2>
        <ul className="space-y-2">
          {games.length > 0 ? (
            games.map(game => (
              <li key={game.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="font-semibold">{game.player1} vs {game.player2}</div>
                <div className="text-gray-700">{game.result}</div>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No games played yet.</li>
          )}
        </ul>
      </div>
      <div className="bg-[#FFA07A] border-2 border-orange-400 shadow-lg rounded-lg p-6 max-w-lg w-full md:w-1/2 mt-6 md:mt-0" style={{ marginLeft: "0", marginTop: "1rem" }}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Start New Game?</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={startNewGame} className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          New Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;
