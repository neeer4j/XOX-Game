'use client'

export interface LeaderboardEntry {
  username: string;
  wins: number;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  return (
    <div className="bg-indigo-900 bg-opacity-50 rounded-xl border-2 border-indigo-400 shadow-lg p-4 w-full">
      <h2 className="text-center text-lg font-bold text-yellow-300 mb-3">
        Leaderboard
      </h2>
      
      {data.length === 0 ? (
        <p className="text-center text-indigo-200 text-sm">No players yet</p>
      ) : (
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-indigo-300 uppercase tracking-wider py-2">
                  Rank
                </th>
                <th className="text-left text-xs font-medium text-indigo-300 uppercase tracking-wider py-2">
                  Player
                </th>
                <th className="text-right text-xs font-medium text-indigo-300 uppercase tracking-wider py-2">
                  Wins
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={entry.username} className={index % 2 === 0 ? 'bg-indigo-800 bg-opacity-30' : ''}>
                  <td className="py-2 text-sm font-medium text-white">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </td>
                  <td className="py-2 text-sm text-white">
                    {entry.username}
                  </td>
                  <td className="py-2 text-sm text-white text-right">
                    {entry.wins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 