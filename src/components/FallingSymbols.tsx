import React, { useEffect, useState } from 'react';

interface Symbol {
  id: number;
  x: number;
  y: number;
  speed: number;
  symbol: 'X' | 'O';
  size: number;
  opacity: number;
  rotation: number;
}

const FallingSymbols: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Initialize symbols
    const initialSymbols: Symbol[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * -1, // Start above the screen
      speed: 0.5 + Math.random() * 1.5,
      symbol: Math.random() > 0.5 ? 'X' : 'O',
      size: 20 + Math.random() * 30,
      opacity: 0.1 + Math.random() * 0.3,
      rotation: Math.random() * 360
    }));

    setSymbols(initialSymbols);

    // Animation frame
    let animationFrameId: number;
    const animate = () => {
      setSymbols(prevSymbols => 
        prevSymbols.map(symbol => {
          // Update position
          let newY = symbol.y + symbol.speed;
          let newRotation = symbol.rotation + 0.2;

          // Reset if symbol goes off screen
          if (newY > window.innerHeight) {
            newY = -50; // Reset to above screen
            symbol.x = Math.random() * window.innerWidth;
          }

          return {
            ...symbol,
            y: newY,
            rotation: newRotation
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {symbols.map(symbol => (
        <div
          key={symbol.id}
          className={`absolute ${symbol.symbol === 'X' ? 'text-blue-500' : 'text-pink-500'} font-bold`}
          style={{
            left: symbol.x,
            top: symbol.y,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
            transform: `rotate(${symbol.rotation}deg)`,
            transition: 'transform 0.1s linear',
            textShadow: `0 0 10px ${symbol.symbol === 'X' ? '#3b82f6' : '#ec4899'}`
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
};

export default FallingSymbols; 