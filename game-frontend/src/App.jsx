import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameCanvas from "./components/GameCanvas";

function App() {
    const [isGameRunning, setGameStarted] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <div>
            {isGameRunning ? (
                <GameCanvas />
            ) : (
                <StartScreen onStart={handleStartGame} />
            )}
        </div>
    );
}

export default App;
