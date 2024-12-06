import { useNavigate } from 'react-router-dom';

function GameOverScreen() {
    const navigate = useNavigate();

    return (
        <div className="game-over">
            <h1>Game Over</h1>
            <button onClick={() => navigate('/')}>Zurück zum Start</button>
        </div>
    );
}

export default GameOverScreen;
