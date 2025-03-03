'use client'

import React, { useState } from 'react'

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
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4" style={{
      backgroundColor: 'var(--game-background)',
      backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), 
                       radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)`,
      backgroundSize: '100px 100px'
    }}>
      <div className="w-full max-w-md mx-auto px-3 sm:px-0">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl
                     hover:from-gray-700 hover:to-gray-600 transform hover:scale-[1.02] transition-all duration-200
                     shadow-[0_0_15px_rgba(75,85,99,0.3)] hover:shadow-[0_0_20px_rgba(75,85,99,0.5)]
                     flex items-center gap-2 text-sm sm:text-base font-medium"
          >
            <span className="text-base sm:text-lg">←</span>
            <span>Back to Mode Selection</span>
          </button>
          
          <div className="text-center">
            <h1 className="game-title text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
              Tic Tac Toe
            </h1>
            <p className="text-indigo-300 text-xs sm:text-sm">
              Enter your name to play against the computer
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
            className="w-full py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-bold rounded-xl
                     hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200
                     shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration; 