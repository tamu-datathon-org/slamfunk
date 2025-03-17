'use client';
import React, { useState, useEffect } from 'react';

// Define Match and Bracket types

type Match = {
  team1: string;
  team2: string;
  winner: string;
};

type Bracket = {
  id: string;
  user_id: string;
  rounds: {
    round_64: Record<string, Match>;
    round_32: Record<string, Match>;
    sweet_16: Record<string, Match>;
    elite_8: Record<string, Match>;
    final_4: Record<string, Match>;
    championship: Record<string, Match>;
  };
};

type User = {
  uid: string;
  email: string;
  name: string;
  maxScore: number;
  bestBracket: string | null;
};

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedBracket, setSelectedBracket] = useState<Bracket | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
        });
        const data = await response.json();
        const sortedUsers = data.sort((a: User, b: User) => b.maxScore - a.maxScore);
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRowClick = async (user: User) => {
    setSelectedUserId(selectedUserId === user.uid ? null : user.uid);
    if (user.bestBracket && selectedUserId !== user.uid) {
      try {
        const bracketResponse = await fetch(`/api/bracket/${user.bestBracket}`);
        if (!bracketResponse.ok) throw new Error('Failed to fetch bracket');
        const bracketData = await bracketResponse.json();
        setSelectedBracket(bracketData);
      } catch (error) {
        console.error('Error fetching bracket:', error);
        setSelectedBracket(null);
      }
    } else {
      setSelectedBracket(null);
    }
  };

  return (
    <div className="my-32 mx-4 sm:mx-8 md:mx-16 lg:mx-20 relative text-black bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl px-2 font-bold mb-4">March Madness Leaderboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-200 px-1 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={user.uid}>
              <tr
                className="hover:bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => handleRowClick(user)}
              >
                <td className="border border-gray-200 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{user.maxScore}</td>
              </tr>
              {selectedUserId === user.uid && (
                <tr>
                  <td colSpan={3} className="p-4 bg-white shadow-md rounded-lg">
                    {user.bestBracket ? (
                      selectedBracket ? (
                        <pre className="text-sm mt-2">
                          {JSON.stringify(selectedBracket.rounds, null, 2)}
                        </pre>
                      ) : (
                        <div className="text-red-500">Error loading bracket.</div>
                      )
                    ) : (
                      <div className="text-gray-500">No bracket submitted yet</div>
                    )}
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
