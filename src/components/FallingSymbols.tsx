"use client"

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
    // Set initial dimensions for the falling area (centered panel)
    const areaWidth = Math.min(window.innerWidth * 0.9, 720);
    const areaHeight = Math.max(window.innerHeight * 0.5, 400);
    setDimensions({
      width: areaWidth,
      height: areaHeight
    });

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Initialize symbols inside the centered area
    const initialSymbols: Symbol[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * Math.min(window.innerWidth * 0.9, 720),
      y: -Math.random() * 200, // start slightly above the area
      speed: 0.6 + Math.random() * 1.6,
      symbol: Math.random() > 0.5 ? 'X' : 'O',
      size: 26 + Math.random() * 28, // a bit larger
      opacity: 0.15 + Math.random() * 0.5,
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
          let newRotation = symbol.rotation + 0.6;

          // Reset if symbol goes off the bottom of the falling area
          const areaH = Math.max(window.innerHeight * 0.5, 400);
          if (newY > areaH + 40) {
            newY = -40; // Reset to above area
            symbol.x = Math.random() * Math.min(window.innerWidth * 0.9, 720);
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
    <div
      className="fixed pointer-events-none overflow-hidden"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: Math.min(window.innerWidth * 0.9, 720),
        height: Math.max(window.innerHeight * 0.5, 400),
        zIndex: 0
      }}
    >
      {symbols.map(symbol => (
        <div
          key={symbol.id}
          className={`absolute ${symbol.symbol === 'X' ? 'text-yellow-300' : 'text-purple-300'} font-extrabold`}
          style={{
            left: symbol.x,
            top: symbol.y,
            fontSize: `${symbol.size}px`,
            opacity: Math.min(1, symbol.opacity),
            transform: `rotate(${symbol.rotation}deg)`,
            transition: 'transform 0.1s linear',
            textShadow: `0 0 8px ${symbol.symbol === 'X' ? 'rgba(212,175,55,0.8)' : 'rgba(107,33,168,0.6)'}`
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
};

export default FallingSymbols; 