import React, { useRef, useEffect } from "react";
import "../styles/GameCanvas.css";
import Player from "./Player";



const GameCanvas = ({ backgroundImage, onNextLevel }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        // Initialisiere die Canvas-Größe
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Hintergrund rendern
        context.clearRect(0, 0, canvas.width, canvas.height);
        const background = new Image();
        background.src = backgroundImage;

        background.onload = () => {
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
        };

        // Eventlistener für Levelwechsel
        const handleKeyPress = (event) => {
            if (event.key === "n") {
                onNextLevel();
            }
        };
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [backgroundImage, onNextLevel]);

    return (
        <div className="game-canvas">
            <canvas id="gameCanvas" ref={canvasRef} />
            <Player canvasRef={canvasRef} />
        </div>
    );
};

export default GameCanvas;
