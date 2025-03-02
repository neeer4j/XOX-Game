'use client'

import { useState, useEffect } from 'react'

interface UserRegistrationProps {
  onRegister: (username: string) => void;
  previousUsers: string[];
}

const UserRegistration = ({ onRegister, previousUsers = [] }: UserRegistrationProps) => {
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
    
    // Submit username
    onRegister(username);
  };

  const selectPreviousUser = (name: string) => {
    setUsername(name);
    setShowPreviousUsers(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-indigo-900 bg-opacity-50 rounded-xl border-2 border-indigo-400 shadow-lg p-6">
        <h2 className="game-title text-lg sm:text-xl mb-6 text-center">Player Registration</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-indigo-200">
              Enter Your Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-indigo-800 border border-indigo-500 rounded-lg text-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                placeholder="XO Champion"
              />
              {previousUsers && previousUsers.length > 0 && (
                <button 
                  type="button"
                  onClick={() => setShowPreviousUsers(!showPreviousUsers)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white"
                >
                  ▼
                </button>
              )}
            </div>
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
            
            {/* Dropdown for previous users */}
            {showPreviousUsers && previousUsers && previousUsers.length > 0 && (
              <div className="mt-1 bg-indigo-800 border border-indigo-500 rounded-lg overflow-hidden">
                <ul className="max-h-40 overflow-y-auto">
                  {previousUsers.map((user, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-indigo-700 cursor-pointer text-white"
                      onClick={() => selectPreviousUser(user)}
                    >
                      {user}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="game-button px-6 py-3 mt-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg border-b-4 border-indigo-800"
          >
            Start Playing
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration; 