import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import imageFrames from "../assets/imageFrames"

const Player = ({ canvasRef }) => {
    const [player, setPlayer] = useState({
        x: 850,
        y: 500,
        width: 60,
        height: 80,
        speed: 8,
        direction: "middle", 
        frameIndex: 0, 
    });

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
                    newDirection = "up";
                } else if (e.key === "ArrowDown") {
                    newY += prev.speed;
                    newDirection = "down";
                }

                // Begrenzungen des Spielfeldes
                if (canvasRef?.current) {
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

    useEffect(() => {
        const interval = setInterval(() => {
            setPlayer((prev) => ({
                ...prev,
                frameIndex: (prev.frameIndex + 1) % imageFrames[prev.direction].length,
            }));
        }, 200); // Ändert das Bild alle 200ms

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef?.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        const playerImage = new Image();
        playerImage.src = imageFrames[player.direction][player.frameIndex];

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

Player.propTypes = {
    canvasRef: PropTypes.object.isRequired, // `canvasRef` muss ein Objekt sein
};

export default Player;
