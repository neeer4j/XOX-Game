'use client'

import React, { useState } from 'react'
import FallingSymbols from './FallingSymbols';

interface UserRegistrationProps {
  onRegister: (name: string) => void;
  previousUsers: string[];
  onBack: () => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, previousUsers, onBack }) => {
  const [username, setUsername] = useState('');
  const [showPreviousUsers, setShowPreviousUsers] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    onRegister(username);
  };

  return (
    <div className="landing-bg min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <FallingSymbols />
      <div className="playful-card w-full max-w-md mx-auto px-3 sm:px-0 py-8 sm:py-10 z-10 animate-bounceIn">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl
                     hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base font-bold"
          >
            <span className="text-base sm:text-lg">←</span>
            <span>Back to Mode Selection</span>
          </button>
          <div className="text-center">
            <span className="inline-block text-3xl sm:text-4xl md:text-5xl animate-bounce">😃</span>
            <h1 className="game-title text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-yellow-300 playful-title">
              Play vs Computer
            </h1>
            <p className="text-pink-200 text-xs sm:text-base font-semibold">
              Enter your fun nickname and get started!
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="bg-indigo-900/30 rounded-xl p-3 sm:p-4 border-2 border-indigo-400/30">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setShowPreviousUsers(true)}
                  className="w-full px-3 py-2 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-white text-sm
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                {showPreviousUsers && previousUsers.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600 z-10">
                    {previousUsers.map((user) => (
                      <button
                        key={user}
                        type="button"
                        onClick={() => {
                          setUsername(user);
                          setShowPreviousUsers(false);
                        }}
                        className="w-full px-3 py-1.5 text-left text-white text-xs sm:text-sm hover:bg-blue-600/20 transition-colors"
                      >
                        {user}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1 sm:mb-2">Your Symbol</label>
              <div className="py-2 sm:py-3 rounded-lg bg-gray-700/50 text-center font-bold text-lg sm:text-xl text-blue-400">
                X
              </div>
              <p className="mt-1 text-xs text-indigo-300 text-center">
                You'll play as X against the computer (O)
              </p>
            </div>
          </div>
          {error && (
            <div className="text-red-400 text-center text-xs bg-red-900/20 py-2 px-3 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 px-4 sm:px-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white text-lg font-extrabold rounded-2xl
                     hover:from-yellow-300 hover:via-pink-400 hover:to-purple-500 transform hover:scale-110 transition-all duration-200
                     shadow-xl hover:shadow-2xl tracking-wider playful-btn"
          >
            <span className="mr-2">✨</span> Start Game <span className="ml-2">🎉</span>
          </button>
        </form>
      </div>
      <div className="landing-bg-overlay"></div>
    </div>
  );
};

export default UserRegistration; 