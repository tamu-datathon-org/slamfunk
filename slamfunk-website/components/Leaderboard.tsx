'use client';
import React, { useState, useEffect } from 'react';

const scoringPoints = [1, 2, 4, 8, 16, 32];
const roundOrder = [
  'round_64',
  'round_32',
  'sweet_16',
  'elite_8',
  'final_4',
  'championship',
];

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

type OfficialBracket = {
  rounds: Record<string, Record<string, Match>>;
};

export default function Leaderboard() {
  const [brackets, setBrackets] = useState<Bracket[]>([]);
  const [officalbracket, setOfficalBrackets] = useState<OfficialBracket | null>(
    null
  );
  const [selectedBracketId, setSelectedBracketId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setBrackets([
      {
        id: 'alice123',
        name: 'Alice',
        predictions: {
          rounds: {
            round_64: {
              match_1: {
                team1: 'Gonzaga',
                team2: 'Texas A&M',
                winner: 'Gonzaga',
              },
              match_2: { team1: 'Duke', team2: 'Kansas', winner: 'Duke' },
            },
            round_32: {
              match_1: { team1: 'Gonzaga', team2: 'Duke', winner: 'Gonzaga' },
            },
            sweet_16: {},
            elite_8: {},
            final_4: {},
            championship: {},
          },
        },
      },
      {
        id: 'bob456',
        name: 'Bob',
        predictions: {
          rounds: {
            round_64: {
              match_1: {
                team1: 'Gonzaga',
                team2: 'Texas A&M',
                winner: 'Texas A&M',
              },
              match_2: { team1: 'Duke', team2: 'Kansas', winner: 'Kansas' },
            },
            round_32: {
              match_1: {
                team1: 'Texas A&M',
                team2: 'Kansas',
                winner: 'Kansas',
              },
            },
            sweet_16: {},
            elite_8: {},
            final_4: {},
            championship: {},
          },
        },
      },
    ]);

    setOfficalBrackets({
      rounds: {
        round_64: {
          match_1: { team1: 'Gonzaga', team2: 'Texas A&M', winner: 'Gonzaga' },
          match_2: { team1: 'Duke', team2: 'Kansas', winner: 'Kansas' },
        },
        round_32: {
          match_1: { team1: 'Gonzaga', team2: 'Kansas', winner: 'Kansas' },
        },
        sweet_16: {},
        elite_8: {},
        final_4: {},
        championship: {},
      },
    });
  }, []);

  //
  // COMMENT OUT LATER WHEN APIS ARE WORKING
  //
  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const response = await fetch('/api/leaderboard', {
  //         method: 'GET',
  //       }); // FIX LATER
  //       const data = await response.json();

  //       setBrackets(data);
  //     } catch (error) {
  //       console.error('Error fetching leaderboard:', error);
  //     }
  //   };

  //   fetchLeaderboard();
  // }, []);

  // useEffect(() => {
  //   const fetchOfficalBracket = async () => {
  //     try {
  //       const response = await fetch('/api/officalbracket', {
  //         method: 'GET',
  //       }); // FIX LATER
  //       const data = await response.json();

  //       setOfficalBrackets(data);
  //     } catch (error) {
  //       console.error('Error fetching leaderboard:', error);
  //     }
  //   };

  //   fetchOfficalBracket();
  // }, []);
  function calculateBracketScore(
    userBracket: Bracket['predictions'],
    officialResults: OfficialBracket
  ) {
    let score = 0;

    roundOrder.forEach((round, roundIndex) => {
      const userRound = userBracket.rounds[round] || {};
      const officialRound = officialResults.rounds[round] || {};

      for (const match in userRound) {
        if (
          userRound[match].winner === officialRound[match]?.winner &&
          officialRound[match]
        ) {
          score += scoringPoints[roundIndex];
        }
      }
    });

    return score;
  }

  if (officalbracket) {
    brackets.forEach((bracket) => {
      bracket.score = calculateBracketScore(
        bracket.predictions,
        officalbracket
      );
    });
  }

  const sortedBracket = [...brackets].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );
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
