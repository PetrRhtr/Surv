import { useEffect, useState } from "react";


const imageFrames = {
    left: [
        "/images/Walk 1.png",
        "/images/Walk 2.png",
        "/images/Walk 3.png",
        "/images/Walk 4.png",
        "/images/Walk 5.png",
        "/images/Walk 6.png",
        "/images/Walk 7.png",
        "/images/Walk 8.png",
        "/images/Walk 9.png",
        "/images/Walk 10.png"
    ],
    right: [
        "/images/Walk 1.png",
        "/images/Walk 2.png",
        "/images/Walk 3.png",
        "/images/Walk 4.png",
        "/images/Walk 5.png",
        "/images/Walk 6.png",
        "/images/Walk 7.png",
        "/images/Walk 8.png",
        "/images/Walk 9.png",
        "/images/Walk 10.png"
    ],
    middle: [
        "/images/Idle1.png",
        "/images/Idle 2.png",
        "/images/Idle 3.png",
        "/images/Idle 4.png",
        "/images/Idle 5.png",
        "/images/Idle 6.png",
        "/images/Idle 7.png",
        "/images/Idle 8.png",
        "/images/Idle 9.png",
        "/images/Idle 10.png"
    ],
};

const Player = ({ canvasRef }) => {
    const [player, setPlayer] = useState({
        x: 850,
        y: 500,
        width: 60,
        height: 80,
        speed: 8,
        direction: "middle", // "left", "right", or "middle"
        frameIndex: 0, // Aktuelles Frame der Animation
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
        const canvas = canvasRef.current;
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

export default Player;
