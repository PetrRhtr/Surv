import { useRef, useEffect } from 'react';

function GameCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} style={{ border: '1px solid white' }} />;
}

export default GameCanvas;
