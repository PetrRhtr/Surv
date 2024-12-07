import { useState } from "react";
import GameCanvas from "./components/GameCanvas";
import StartScreen from "./components/StartScreen";
import levels from "./assets/levels";

const App = () => {
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [level, setLevel] = useState(0); // Start bei Level 0
    const [backgroundImage, setBackgroundImage] = useState(levels[0].background);

    const startGame = () => {
        setIsGameRunning(true);
        setLevel(0); // Start mit dem ersten Level
        setBackgroundImage(levels[0].background);
    };

    const nextLevel = () => {
        const newLevel = level + 1;
        if (newLevel < levels.length) {
            setLevel(newLevel);
            setBackgroundImage(levels[newLevel].background);
        }
    };

    return (
        <div>
            {isGameRunning ? (
                <GameCanvas 
                    backgroundImage={backgroundImage} 
                    onNextLevel={nextLevel} // Zum Wechseln der Level
                />
            ) : (
                <StartScreen onStart={startGame} />
            )}
        </div>
    );
};

export default App;
