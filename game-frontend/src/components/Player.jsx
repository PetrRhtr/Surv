import React, { useEffect, useState } from "react";

const Player = ({ canvasRef }) => {
    const [player, setPlayer] = useState({
        x: window.innerWidth / 2 - 25, // Start in der Mitte der Canvas
        y: window.innerHeight / 2 - 25,
        width: 60,
        height: 100,
        speed: 8,
        direction: "middle", // "left", "right", or "middle"
    });

    // Bewegung des Spielers basierend auf Tasten
    useEffect(() => {
        const handleKeyDown = (e) => {
            setPlayer((prev) => {
                let newDirection = prev.direction;
                let newX = prev.x;
                let newY = prev.y;

                if (e.key === "ArrowLeft") {
                    newX -= prev.speed;
                    newDirection = "left";
                } else if (e.key === "ArrowRight") {
                    newX += prev.speed;
                    newDirection = "right";
                } else if (e.key === "ArrowUp") {
                    newY -= prev.speed;
                } else if (e.key === "ArrowDown") {
                    newY += prev.speed;
                }

                // Begrenzungen des Spielfeldes
                if (canvasRef.current) {
                    const canvas = canvasRef.current;
                    newX = Math.max(0, Math.min(canvas.width - prev.width, newX));
                    newY = Math.max(0, Math.min(canvas.height - prev.height, newY));
                }

                return { ...prev, x: newX, y: newY, direction: newDirection };
            });
        };

        const handleKeyUp = () => {
            setPlayer((prev) => ({ ...prev, direction: "middle" }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [canvasRef]);

    // Spieler zeichnen
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        // Bild des Spielers basierend auf der Richtung laden
        const playerImage = new Image();
        if (player.direction === "left") {
            playerImage.src = "/images/newplayer_left.png";
        } else if (player.direction === "right") {
            playerImage.src = "/images/newplayer_right.png";
        } else {
            playerImage.src = "/images/newplayer_middle.png";
        }

        // Spielerbild nach dem Laden zeichnen
        playerImage.onload = () => {
            // Canvas leeren und Spieler zeichnen
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                playerImage,
                player.x,
                player.y,
                player.width,
                player.height
            );
        };

        // Fehler beim Laden des Bildes abfangen
        playerImage.onerror = () => {
            console.error("Fehler beim Laden des Spielerbildes:", playerImage.src);
        };
    }, [player, canvasRef]);

    return null;
};

export default Player;
