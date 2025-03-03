'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import UserRegistration from '@/components/UserRegistration'
import PvPRegistration from '@/components/PvPRegistration'
import Leaderboard, { LeaderboardEntry } from '@/components/Leaderboard'
import GameModeSelection from '@/components/GameModeSelection'

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

interface GamePlayers {
  player1: { name: string; symbol: 'X' | 'O' };
  player2: { name: string; symbol: 'X' | 'O' };
}

export default function Home() {
  const [gameMode, setGameMode] = useState<'pvp' | 'pvc' | null>(null);
  const [players, setPlayers] = useState<GamePlayers | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [previousUsers, setPreviousUsers] = useState<string[]>([]);

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

  const handlePvPRegister = (
    player1: { name: string; symbol: 'X' | 'O' },
    player2: { name: string; symbol: 'X' | 'O' }
  ) => {
    setPlayers({ player1, player2 });
    
    // Add both players to previous users if they're not already there
    const newPreviousUsers = [...previousUsers];
    if (!newPreviousUsers.includes(player1.name)) {
      newPreviousUsers.push(player1.name);
    }
    if (!newPreviousUsers.includes(player2.name)) {
      newPreviousUsers.push(player2.name);
    }
    setPreviousUsers(newPreviousUsers);
    localStorage.setItem(PREVIOUS_USERS_KEY, JSON.stringify(newPreviousUsers));
  };

  const handleSinglePlayerRegister = (name: string) => {
    setPlayers({
      player1: { name, symbol: 'X' },
      player2: { name: 'Computer', symbol: 'O' }
    });
    
    if (!previousUsers.includes(name)) {
      const newPreviousUsers = [...previousUsers, name];
      setPreviousUsers(newPreviousUsers);
      localStorage.setItem(PREVIOUS_USERS_KEY, JSON.stringify(newPreviousUsers));
    }
  };

  const updateLeaderboard = (name: string, winsToAdd: number) => {
    setLeaderboard(prev => {
      const userIndex = prev.findIndex(entry => entry.username === name);
      
      if (userIndex !== -1) {
        const newLeaderboard = [...prev];
        newLeaderboard[userIndex] = {
          ...newLeaderboard[userIndex],
          wins: newLeaderboard[userIndex].wins + winsToAdd
        };
        return newLeaderboard.sort((a, b) => b.wins - a.wins);
      }
      
      return [...prev, { username: name, wins: winsToAdd }].sort((a, b) => b.wins - a.wins);
    });
  };

  const handleGameEnd = () => {
    setPlayers(null);
  };

  const handleModeSelect = (mode: 'pvp' | 'pvc') => {
    setGameMode(mode);
  };

  const handleBack = () => {
    setGameMode(null);
  };

  const handleTitleClick = () => {
    setGameMode(null);
    setPlayers(null);
  };

  if (!gameMode) {
    return <GameModeSelection onModeSelect={handleModeSelect} />;
  }

  if (!players) {
    return gameMode === 'pvp' ? (
      <PvPRegistration
        onRegister={handlePvPRegister}
        previousUsers={previousUsers}
        onBack={handleBack}
      />
    ) : (
      <UserRegistration
        onRegister={handleSinglePlayerRegister}
        previousUsers={previousUsers}
        onBack={handleBack}
      />
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-2 sm:p-4">
      <div className="w-full text-center pt-2 sm:pt-4 pb-2 sm:pb-3 mb-1 sm:mb-2">
        <div className="relative inline-block cursor-pointer hover:scale-105 transition-transform duration-200" onClick={handleTitleClick}>
          <span className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl">👑</span>
          <h1 className="game-title text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-4 sm:mt-6 px-2 sm:px-4">
            World's Best TIC TAC TOE
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-center gap-4 max-w-7xl mx-auto">
        <div className="w-full lg:w-3/5">
          <TicTacToe
            currentUsername={players.player1.name}
            updateLeaderboard={updateLeaderboard}
            onGameEnd={handleGameEnd}
            gameMode={gameMode}
            player1={players.player1}
            player2={players.player2}
          />
        </div>
        
        <div className="w-full lg:w-2/5 flex flex-col">
          <Leaderboard data={leaderboard.slice(0, 10)} />
          
          <div className="flex justify-center mt-2 sm:mt-4">
            <button 
              onClick={handleGameEnd}
              className="game-button px-3 sm:px-4 py-1.5 sm:py-2 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg border-b-4 border-purple-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Switch Players
            </button>
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center text-[10px] sm:text-xs text-indigo-300 opacity-70 mt-1 sm:mt-2">
        <p>Challenge a friend and see who's the Tic Tac Toe champion!</p>
      </footer>
    </main>
  )
} 