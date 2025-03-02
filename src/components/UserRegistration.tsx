'use client'

import { useState } from 'react'

interface UserRegistrationProps {
  onRegister: (username: string) => void;
  previousUsers: string[];
  onBack: () => void;
}

const UserRegistration = ({ onRegister, previousUsers = [], onBack }: UserRegistrationProps) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPreviousUsers, setShowPreviousUsers] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    onRegister(username);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{
      backgroundColor: 'var(--game-background)',
      backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), 
                       radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)`,
      backgroundSize: '100px 100px'
    }}>
      <div className="w-full max-w-md mx-4 my-8">
        <div className="mb-12">
          <button
            onClick={onBack}
            className="mb-8 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl
                     hover:from-gray-700 hover:to-gray-600 transform hover:scale-[1.02] transition-all duration-200
                     shadow-[0_0_15px_rgba(75,85,99,0.3)] hover:shadow-[0_0_20px_rgba(75,85,99,0.5)]
                     flex items-center gap-3 font-medium"
          >
            <span className="text-xl">←</span>
            <span>Back to Mode Selection</span>
          </button>
          
          <div className="text-center">
            <h1 className="game-title text-5xl font-bold mb-4 text-white">
              Tic Tac Toe
            </h1>
            <p className="text-indigo-300 text-lg">
              Enter your name to challenge the computer
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-purple-400">Player</h2>
              <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-purple-500/50 to-transparent rounded"></div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                  {previousUsers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPreviousUsers(!showPreviousUsers)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      ▼
                    </button>
                  )}
                </div>
                {showPreviousUsers && (
                  <div className="mt-2 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
                    {previousUsers.map((user) => (
                      <button
                        key={user}
                        type="button"
                        onClick={() => {
                          setUsername(user);
                          setShowPreviousUsers(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-purple-600/20 transition-colors"
                      >
                        {user}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Your Symbol</label>
                <div className="py-3 rounded-lg bg-gray-700/50 text-center font-bold text-2xl text-purple-400">
                  X
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-center text-sm bg-red-900/20 py-2 px-4 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-xl
                     hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200
                     shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration; 