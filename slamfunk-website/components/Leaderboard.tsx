'use client';
import React, { useState, useEffect } from 'react';
import { User } from 'app/api/user/route';
import MarchMadnessBracket from './MarchMadnessBracket';
import { Bracket } from 'app/api/bracket/route';

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedBracket, setSelectedBracket] = useState<Bracket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        const sortedUsers = data.sort((a: User, b: User) => b.maxScore - a.maxScore);
        const filteredUsers = sortedUsers.filter((user: User) => user.maxScore > 0); // filter out users that dont have a score
        console.log(sortedUsers);
        setUsers(filteredUsers);
        setLoading(false);
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
        const bracketResponse = await fetch(`/api/bracket/get/${user.bestBracket}`);
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

  if (loading) { return <div>loading...</div>; }

  return (
    <div className="relative w-full text-black bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-100 dark:bg-blue-900 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200">
        Click on any name to view their best performing bracket
      </div>
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
                  <td colSpan={3} className="p-0 bg-white">
                    {user.bestBracket ? (
                      selectedBracket ? (
                        <div className="w-full overflow-x-auto">
                          <MarchMadnessBracket
                            roundData={selectedBracket}
                            userID={user.uid}
                            submissionId={selectedBracket.id}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="text-red-500 p-4">Error loading bracket.</div>
                      )
                    ) : (
                      <div className="text-gray-500 p-4">No bracket submitted yet</div>
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
