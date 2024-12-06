import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameCanvas from './components/GameCanvas.jsx';

function App() {
  const [showGame, setShowGame] = useState(false);

  const startGame = () => {
    setShowGame(true);
  };

  return (
    <div>
      {showGame ? <GameCanvas /> : <StartScreen onStart={startGame} />}
    </div>
  );
}

export default App;
