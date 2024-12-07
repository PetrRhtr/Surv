import { useEffect, useState } from "react";
import imageFrames from "../path/to/imageFrames.json";

const Player = ({ canvasRef }) => {
    const [player, setPlayer] = useState({
        x: 850,
        y: 500,
        width: 60,
        height: 80,
        speed: 8,
        direction: "middle", // "left", "right", "up", "down", "up-right", etc.
        frameIndex: 0,
    });

    const keysPressed = {};

    useEffect(() => {
        const handleKeyDown = (e) => {
            keysPressed[e.key] = true;

            setPlayer((prev) => {
                let newDirection = prev.direction;
                let newX = prev.x;
                let newY = prev.y;

                if (keysPressed["ArrowUp"] && keysPressed["ArrowLeft"]) {
                    newY -= prev.speed / Math.sqrt(2);
                    newX -= prev.speed / Math.sqrt(2);
                    newDirection = "up-left";
                } else if (keysPressed["ArrowUp"] && keysPressed["ArrowRight"]) {
                    newY -= prev.speed / Math.sqrt(2);
                    newX += prev.speed / Math.sqrt(2);
                    newDirection = "up-right";
                } else if (keysPressed["ArrowDown"] && keysPressed["ArrowLeft"]) {
                    newY += prev.speed / Math.sqrt(2);
                    newX -= prev.speed / Math.sqrt(2);
                    newDirection = "down-left";
                } else if (keysPressed["ArrowDown"] && keysPressed["ArrowRight"]) {
                    newY += prev.speed / Math.sqrt(2);
                    newX += prev.speed / Math.sqrt(2);
                    newDirection = "down-right";
                } else if (keysPressed["ArrowUp"]) {
                    newY -= prev.speed;
                    newDirection = "up";
                } else if (keysPressed["ArrowDown"]) {
                    newY += prev.speed;
                    newDirection = "down";
                } else if (keysPressed["ArrowLeft"]) {
                    newX -= prev.speed;
                    newDirection = "left";
                } else if (keysPressed["ArrowRight"]) {
                    newX += prev.speed;
                    newDirection = "right";
                } else {
                    newDirection = "middle";
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

        const handleKeyUp = (e) => {
            delete keysPressed[e.key];

            setPlayer((prev) => {
                return { ...prev, direction: "middle" };
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [canvasRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlayer((prev) => ({
                ...prev,
                frameIndex: (prev.frameIndex + 1) % imageFrames[prev.direction]?.length || 0,
            }));
        }, 200); // Ändert das Bild alle 200ms

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        const playerImage = new Image();
        playerImage.src = imageFrames[player.direction]?.[player.frameIndex] || "";

        playerImage.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                playerImage,
                player.x,
                player.y,
                player.width,
                player.height
            );
        };
    }, [player, canvasRef]);

    return null;
};

export default Player;
