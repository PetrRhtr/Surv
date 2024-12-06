import React, { useEffect, useRef, useState } from 'react';

const images = {
    right: '/images/newplayer_right.png',
    middle: '/images/newplayer_middle.png',
    left: '/images/newplayer_left.png',
};

const GameCanvas = () => {
    const canvasRef = useRef(null);
    const [player, setPlayer] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: 60,
        height: 100,
        direction: 'middle', // 'left', 'right', oder 'middle'
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const drawPlayer = () => {
            const img = new Image();
            img.src = images[player.direction]; // Das Bild basierend auf der Bewegungsrichtung
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren
                context.drawImage(
                    img,
                    player.x - player.width / 2,
                    player.y - player.height / 2,
                    player.width,
                    player.height
                );
            };
        };

        drawPlayer();
    }, [player]);

    const handleKeyDown = (e) => {
        setPlayer((prev) => {
            const newPlayer = { ...prev };
            if (e.key === 'ArrowLeft') {
                newPlayer.x -= 10;
                newPlayer.direction = 'left';
            }
            if (e.key === 'ArrowRight') {
                newPlayer.x += 10;
                newPlayer.direction = 'right';
            }
            if (e.key === 'ArrowUp') {
                newPlayer.y -= 10;
                newPlayer.direction = 'middle';
            }
            if (e.key === 'ArrowDown') {
                newPlayer.y += 10;
                newPlayer.direction = 'middle';
            }
            return newPlayer;
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className="game-canvas"
        />
    );
};

export default GameCanvas;
