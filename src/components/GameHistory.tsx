import { useState } from 'react';


const GameHistory: React.FC = () => {
  const [games] = useState<any[]>([]);

  return (
    <div className="p-4 border-t border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Game History</h2>
      <ul className="list-disc pl-5">
        {games.map((game: any) => (
          <li key={game._id} className="mb-2">
            {`Game between ${game.player1.name} and ${game.player2.name}. Status: ${game.status}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
