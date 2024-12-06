import React, { useRef, useEffect, useState } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [player, setPlayer] = useState({
    x: 0,
    y: 0,
    width: 60,
    height: 100,
    speed: 5,
    health: 100,
    image: null,
  });

  // Bilder als Referenzen laden
  const images = useRef({});
  useEffect(() => {
    const loadImages = () => {
      const imageSources = {
        playerRight: 'assets/images/newplayer_right.png',
        playerMiddle: 'assets/images/newplayer_middle.png',
        playerLeft: 'assets/images/newplayer_left.png',
        background: 'assets/images/field.png',
      };

      Object.keys(imageSources).forEach((key) => {
        const img = new Image();
        img.src = imageSources[key];
        images.current[key] = img;
      });
    };
    loadImages();
  }, []);

  // Canvas initialisieren
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    // Fenstergröße anpassen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        x: canvas.width / 2,
        y: canvas.height / 2,
      }));
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Spielschleife
  useEffect(() => {
    if (!context) return;

    const updateGame = () => {
      // Spielerlogik
      movePlayer();

      // Zeichnen
      renderGame();
    };

    const gameLoop = () => {
      updateGame();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [context, player]);

  // Spielerbewegung
  const movePlayer = () => {
    const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
    window.addEventListener('keydown', (event) => {
      if (keys.hasOwnProperty(event.key)) keys[event.key] = true;
    });
    window.addEventListener('keyup', (event) => {
      if (keys.hasOwnProperty(event.key)) keys[event.key] = false;
    });

    setPlayer((prevPlayer) => {
      let { x, y } = prevPlayer;
      if (keys.ArrowUp) y -= prevPlayer.speed;
      if (keys.ArrowDown) y += prevPlayer.speed;
      if (keys.ArrowLeft) x -= prevPlayer.speed;
      if (keys.ArrowRight) x += prevPlayer.speed;

      return {
        ...prevPlayer,
        x: Math.max(0, Math.min(x, context.canvas.width)),
        y: Math.max(0, Math.min(y, context.canvas.height)),
      };
    });
  };

  // Zeichnen
  const renderGame = () => {
    // Hintergrund
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    const bg = images.current.background;
    if (bg) context.drawImage(bg, 0, 0, context.canvas.width, context.canvas.height);

    // Spieler
    const playerImage = images.current.playerMiddle;
    if (playerImage) {
      context.drawImage(
        playerImage,
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
      );
    }
  };

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
