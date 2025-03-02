'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import UserRegistration from '@/components/UserRegistration'
import Leaderboard, { LeaderboardEntry } from '@/components/Leaderboard'

// Use dynamic import for the TicTacToe component to avoid hydration issues
const TicTacToe = dynamic(() => import('@/components/TicTacToe'), {
  ssr: false,
})

// Mock initial leaderboard data
const initialLeaderboard: LeaderboardEntry[] = [
  { username: 'GameMaster', wins: 15 },
  { username: 'XOChamp', wins: 12 },
  { username: 'TicTacPro', wins: 10 },
  { username: 'PlayerOne', wins: 8 },
  { username: 'WinnerX', wins: 6 }
];

// Local storage keys
const LEADERBOARD_KEY = 'ticTacToeLeaderboard';
const PREVIOUS_USERS_KEY = 'ticTacToePreviousUsers';
const LAST_USER_KEY = 'ticTacToeLastUser';
const OPPONENT_NAME_KEY = 'ticTacToeOpponentName';

export default function Home() {
  const [username, setUsername] = useState<string>('');
  const [opponentName, setOpponentName] = useState<string>('Computer');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [previousUsers, setPreviousUsers] = useState<string[]>([]);
  const [showOpponentInput, setShowOpponentInput] = useState<boolean>(false);

  // Load data from localStorage when component mounts
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Load leaderboard
      const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
      if (storedLeaderboard) {
        try {
          setLeaderboard(JSON.parse(storedLeaderboard));
        } catch (e) {
          console.error('Failed to parse leaderboard data', e);
        }
      }

      // Load previous users
      const storedPreviousUsers = localStorage.getItem(PREVIOUS_USERS_KEY);
      if (storedPreviousUsers) {
        try {
          setPreviousUsers(JSON.parse(storedPreviousUsers));
        } catch (e) {
          console.error('Failed to parse previous users data', e);
        }
      }

      // Check for last used username
      const lastUser = localStorage.getItem(LAST_USER_KEY);
      if (lastUser) {
        setUsername(lastUser);
      }
      
      // Check for opponent name
      const storedOpponentName = localStorage.getItem(OPPONENT_NAME_KEY);
      if (storedOpponentName) {
        setOpponentName(storedOpponentName);
      }
    }
  }, []);

  // Save leaderboard data to localStorage when it changes
  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    }
  }, [leaderboard]);

  // Save previous users data to localStorage when it changes
  useEffect(() => {
    if (previousUsers && previousUsers.length > 0) {
      localStorage.setItem(PREVIOUS_USERS_KEY, JSON.stringify(previousUsers));
    }
  }, [previousUsers]);

  // Handler for user registration
  const handleRegister = (name: string) => {
    setUsername(name);
    
    // Save as last user
    localStorage.setItem(LAST_USER_KEY, name);
    
    // Add to previous users if not already there
    if (!previousUsers.includes(name)) {
      const updatedUsers = [...previousUsers, name];
      setPreviousUsers(updatedUsers);
      localStorage.setItem(PREVIOUS_USERS_KEY, JSON.stringify(updatedUsers));
    }
    
    // Add user to leaderboard if they don't exist yet
    if (!leaderboard.some(entry => entry.username === name)) {
      setLeaderboard(prev => [...prev, { username: name, wins: 0 }]);
    }
  };

  // Handler to update opponent name
  const handleOpponentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpponentName(e.target.value);
    localStorage.setItem(OPPONENT_NAME_KEY, e.target.value);
  };

  // Handler to update leaderboard when a player wins
  const updateLeaderboard = (name: string, winsToAdd: number) => {
    setLeaderboard(prev => {
      // Find the user in the leaderboard
      const userIndex = prev.findIndex(entry => entry.username === name);
      
      if (userIndex !== -1) {
        // Create a new array with the updated win count
        const newLeaderboard = [...prev];
        newLeaderboard[userIndex] = {
          ...newLeaderboard[userIndex],
          wins: newLeaderboard[userIndex].wins + winsToAdd
        };
        
        // Sort by wins in descending order
        return newLeaderboard.sort((a, b) => b.wins - a.wins);
      }
      
      // If user not found, add them with the specified win count
      return [...prev, { username: name, wins: winsToAdd }].sort((a, b) => b.wins - a.wins);
    });
  };

  // Handler to log out
  const handleLogout = () => {
    setUsername('');
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-4 pb-2">
      <div className="w-full text-center pt-4 pb-3 mb-2">
        <div className="relative inline-block">
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl">👑</span>
          <h1 className="game-title text-xl sm:text-2xl md:text-3xl font-bold mt-6 px-4">
            World's Best TIC TAC TOE
          </h1>
        </div>
      </div>

      {!username ? (
        <UserRegistration onRegister={handleRegister} previousUsers={previousUsers || []} />
      ) : (
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:gap-6">
          <div className="w-full md:w-3/5 mb-4 md:mb-0">
            {showOpponentInput ? (
              <div className="bg-indigo-900 bg-opacity-50 rounded-xl border-2 border-indigo-400 p-4 mb-4">
                <label className="block mb-2 text-sm font-medium text-indigo-200">
                  Who are you playing against?
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={opponentName}
                    onChange={handleOpponentNameChange}
                    className="flex-grow px-4 py-2 bg-indigo-800 border border-indigo-500 rounded-l-lg text-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                    placeholder="Opponent's name"
                  />
                  <button 
                    onClick={() => setShowOpponentInput(false)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mb-4">
                <button 
                  onClick={() => setShowOpponentInput(true)}
                  className="text-xs text-indigo-300 hover:text-white underline"
                >
                  Set opponent's name (currently: {opponentName})
                </button>
              </div>
            )}
            
            <TicTacToe 
              currentUsername={username} 
              opponentName={opponentName}
              updateLeaderboard={updateLeaderboard}
              onGameEnd={handleLogout}
            />
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col">
            <Leaderboard data={leaderboard.slice(0, 10)} />
            
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleLogout} 
                className="game-button px-4 py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg border-b-4 border-purple-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Switch Player
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="w-full text-center text-xs text-indigo-300 opacity-70 mt-2">
        <p>Challenge a friend and see who's the Tic Tac Toe champion!</p>
      </footer>
    </main>
  )
} 