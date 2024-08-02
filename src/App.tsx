import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import NewGameSession from './components/NewGameSession';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Tic-Tac-Toe Game'; 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/new-game" element={<NewGameSession />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
