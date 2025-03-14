'use client';
import React, { useState, useEffect } from 'react';

// const scoringPoints = [1, 2, 4, 8, 16, 32];
// const roundOrder = [
//   'round_64',
//   'round_32',
//   'sweet_16',
//   'elite_8',
//   'final_4',
//   'championship',
// ];

type Match = {
  team1: string;
  team2: string;
  winner: string;
};

type Bracket = {
  id: string;
  name: string;
  predictions: {
    rounds: Record<string, Record<string, Match>>;
  };
  score?: number;
  rank?: number;
};

export default function Leaderboard() {
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [selectedBracketId, setSelectedBracketId] = useState<string | null>(
    null
  );

  //

  // COMMENT OUT LATER WHEN APIS ARE WORKING

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/bracket', {
          method: 'GET',
        }); // FIX LATER
        const data = await response.json();

        setBrackets(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortedBracket = [...brackets].sort((a, b) => b.score - a.score);
  let currentRank = 1;

  sortedBracket.forEach((user, index) => {
    if (index > 0 && user.score === sortedBracket[index - 1].score) {
      user.rank = sortedBracket[index - 1].rank;
    } else {
      user.rank = currentRank;
    }
    currentRank++;
  });

  const handleRowClick = (userId: string) => {
    setSelectedBracketId(selectedBracketId === userId ? null : userId);
  };

  return (
    <div className="my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-20 relative text-black bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl px-2 font-bold mb-4">
        March Madness Leaderboard
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-200 px-1 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedBracket.map((user) => (
            <React.Fragment key={user.id}>
              <tr
                className="hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => handleRowClick(user.id)}
              >
                <td className="border border-gray-200 px-4 py-2 text-center">
                  {user.rank}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  {user.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  {user.score}
                </td>
              </tr>
              {selectedBracketId === user.id && (
                <tr>
                  <td colSpan={3} className="p-4 bg-white shadow-md rounded-lg">
                    <pre className="text-sm mt-2">
                      {JSON.stringify(user.predictions, null, 2)}
                    </pre>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
