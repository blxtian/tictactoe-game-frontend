let mockGames = [
    { id: '1', player1: '', player2: '', result: 'Win' },
    { id: '1', player1: '', player2: '', result: 'Lose' },
    { id: '2', player1: '', player2: '', result: 'Draw' },
  ];
  
  // Function to simulate fetching all games
  export const getPreviousGames = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGames);
      }, 1000);
    });
  };
  
  // Function to add a new game
  export const addGame = (game: { id: string; player1: string; player2: string; result: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockGames.push(game);
        resolve(game);
      }, 1000);
    });
  };