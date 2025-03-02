import React, { useState } from 'react';

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
              Enter player names and choose symbols
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player 1 Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-purple-400">Player 1</h2>
              <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-purple-500/50 to-transparent rounded"></div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                  {previousUsers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPreviousUsers1(!showPreviousUsers1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      ▼
                    </button>
                  )}
                </div>
                {showPreviousUsers1 && (
                  <div className="mt-2 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
                    {previousUsers.map((user) => (
                      <button
                        key={user}
                        type="button"
                        onClick={() => {
                          setPlayer1Name(user);
                          setShowPreviousUsers1(false);
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
                <label className="block text-sm font-medium text-gray-200 mb-2">Choose Symbol</label>
                <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* Player 2 Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-400">Player 2</h2>
              <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-blue-500/50 to-transparent rounded"></div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                  {previousUsers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowPreviousUsers2(!showPreviousUsers2)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      ▼
                    </button>
                  )}
                </div>
                {showPreviousUsers2 && (
                  <div className="mt-2 bg-gray-700/50 rounded-lg overflow-hidden border border-gray-600">
                    {previousUsers.map((user) => (
                      <button
                        key={user}
                        type="button"
                        onClick={() => {
                          setPlayer2Name(user);
                          setShowPreviousUsers2(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-600/20 transition-colors"
                      >
                        {user}
                      </button>
                    ))}
                  </div>
                )}
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

export default PvPRegistration; 