import { useNavigate } from 'react-router-dom';

function StartScreen() {
    const navigate = useNavigate();

    return (
        <div className="start-screen">
            <h1>Willkommen!</h1>
            <button onClick={() => navigate('/game')}>Spiel starten</button>
        </div>
    );
}

export default StartScreen;
