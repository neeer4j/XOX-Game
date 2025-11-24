"use client"

import React, { useState } from 'react';
import FallingSymbols from './FallingSymbols';

interface PvPRegistrationProps {
  onRegister: (player1: { name: string; symbol: 'X' | 'O' }, player2: { name: string; symbol: 'X' | 'O' }) => void;
  previousUsers: string[];
  onBack: () => void;
}

const PvPRegistration: React.FC<PvPRegistrationProps> = ({ onRegister, previousUsers, onBack }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Symbol, setPlayer1Symbol] = useState<'X' | 'O'>('X');
  const [showPreviousUsers1, setShowPreviousUsers1] = useState(false);
  const [showPreviousUsers2, setShowPreviousUsers2] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!player1Name || !player2Name) {
      setError('Both players must enter their names');
      return;
    }

    if (player1Name === player2Name) {
      setError('Players must have different names');
      return;
    }

    const player2Symbol = player1Symbol === 'X' ? 'O' : 'X';
    onRegister(
      { name: player1Name, symbol: player1Symbol },
      { name: player2Name, symbol: player2Symbol }
    );
  };

  return (
    <div className="landing-bg min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <FallingSymbols />
      <div className="landing-card w-full max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base font-medium secondary-button"
          >
            <span className="text-base sm:text-lg">←</span>
            <span>Back to Mode Selection</span>
          </button>
          <div className="text-center">
            <h1 className="game-title text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
              PvP Registration
            </h1>
            <p className="text-indigo-300 text-xs sm:text-sm">
              Enter player names and choose symbols
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player 1 Section */}
            <div className="bg-indigo-900/30 rounded-xl p-4 md:p-6 border-2 border-indigo-400/30 flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white mb-2">Player 1</h2>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    onFocus={() => setShowPreviousUsers1(true)}
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-white text-base
                             focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter name"
                  />
                  {showPreviousUsers1 && previousUsers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 z-10">
                      {previousUsers.map((user) => (
                        <button
                          key={user}
                          type="button"
                          onClick={() => {
                            setPlayer1Name(user);
                            setShowPreviousUsers1(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white text-base hover:bg-purple-600/20 transition-colors"
                        >
                          {user}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Symbol</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlayer1Symbol('X')}
                    className={`py-3 rounded-lg font-bold text-2xl transition-all duration-300
                      ${player1Symbol === 'X'
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70'
                      }`}
                  >
                    X
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayer1Symbol('O')}
                    className={`py-3 rounded-lg font-bold text-2xl transition-all duration-300
                      ${player1Symbol === 'O'
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700/70'
                      }`}
                  >
                    O
                  </button>
                </div>
              </div>
            </div>
            {/* Player 2 Section */}
            <div className="bg-indigo-900/30 rounded-xl p-4 md:p-6 border-2 border-indigo-400/30 flex flex-col gap-3">
              <h2 className="text-lg font-bold text-white mb-2">Player 2</h2>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    onFocus={() => setShowPreviousUsers2(true)}
                    className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-white text-base
                             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                  {showPreviousUsers2 && previousUsers.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 z-10">
                      {previousUsers.map((user) => (
                        <button
                          key={user}
                          type="button"
                          onClick={() => {
                            setPlayer2Name(user);
                            setShowPreviousUsers2(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white text-base hover:bg-blue-600/20 transition-colors"
                        >
                          {user}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Symbol</label>
                <div className="py-3 rounded-lg bg-gray-700/50 text-center font-bold text-2xl text-gray-400">
                  {player1Symbol === 'X' ? 'O' : 'X'}
                </div>
              </div>
            </div>
          </div>
          {error && (
            <div className="text-red-400 text-center text-xs sm:text-sm bg-red-900/20 py-2 px-4 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 sm:py-4 px-6 text-base sm:text-lg font-bold rounded-xl game-button"
          >
            Start Game
          </button>
        </form>
      </div>
      <div className="landing-bg-overlay"></div>
    </div>
  );
};

export default PvPRegistration; 