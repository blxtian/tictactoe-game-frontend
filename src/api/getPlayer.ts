const mockGames = [
    { id: '1', player1: '', player2: '', result: 'Win' },
    { id: '2', player1: '', player2: '', result: 'Lose' },
    { id: '3', player1: '', player2: '', result: 'Draw' },
  ];
  

  export const getGameByPlayerNames = (player1: string, player2: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const game = mockGames.find(
          (g) => g.player1 === player1 && g.player2 === player2
        );
        if (game) {
          resolve(game);
        } else {
          reject(new Error('Game not found'));
        }
      }, 1000);
    });
  };