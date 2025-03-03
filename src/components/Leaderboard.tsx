'use client'

import React from 'react';

export interface LeaderboardEntry {
  username: string;
  wins: number;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="bg-indigo-900 bg-opacity-50 rounded-xl border-2 border-indigo-400 p-2 sm:p-3">
      <h2 className="text-center text-base sm:text-lg font-bold text-yellow-300 mb-2">
        🏆 Leaderboard
      </h2>
      <div className="space-y-1">
        {data.map((entry, index) => (
          <div
            key={entry.username}
            className={`flex justify-between items-center px-2 py-1 rounded-lg 
              ${index === 0 ? 'bg-yellow-500 bg-opacity-20' : 
                index === 1 ? 'bg-gray-400 bg-opacity-20' : 
                index === 2 ? 'bg-orange-700 bg-opacity-20' : 
                'bg-indigo-800 bg-opacity-30'}`}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-medium text-indigo-200 w-4">
                {index + 1}.
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {entry.username}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm font-bold text-indigo-200">
                {entry.wins}
              </span>
              <span className="text-xs text-indigo-300 ml-1">
                wins
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 