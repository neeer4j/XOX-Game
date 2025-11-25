"use client"

import React from 'react';
import FallingSymbols from './FallingSymbols';

interface GameModeSelectionProps {
  onModeSelect: (mode: 'pvp' | 'pvc') => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="landing-bg min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <FallingSymbols />
      <a 
        href="https://github.com/neeer4j" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full 
                   hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 z-20
                   text-white text-sm font-semibold shadow-lg hover:shadow-xl"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="24" 
          height="24" 
          className="fill-current"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span>Meet the Developer</span>
      </a>
      <div className="landing-card relative flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-14 z-10 shadow-2xl animate-[fadeIn_1s_ease-out] max-w-[680px]">
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-[bounce_2s_infinite]">👑</span>
        <h1 className="game-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white floating-title px-3 py-3 sm:px-4 sm:py-4 mb-6 text-center">
          World's Best<br />TIC TAC TOE
        </h1>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => onModeSelect('pvp')}
            className="game-button w-full px-6 py-4 text-lg font-bold rounded-lg 
                       transform hover:scale-105 transition-all duration-200
                       animate-[slideRight_0.5s_ease-out] border-2"
          >
            Player vs Player
          </button>
          <button
            onClick={() => onModeSelect('pvc')}
            className="game-button w-full px-6 py-4 text-lg font-bold rounded-lg 
                       transform hover:scale-105 transition-all duration-200
                       animate-[slideLeft_0.5s_ease-out] border-2"
          >
            Player vs Computer
          </button>
        </div>
      </div>
      <div className="landing-bg-overlay"></div>
    </div>
  );
};

export default GameModeSelection; 