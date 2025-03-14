import React, { useState, useEffect } from 'react';

// Type definitions
type Team = string | null;

interface Match {
  team1: Team;
  team2: Team;
  winner?: Team;
}

interface RoundData {
  [matchId: string]: Match;
}

interface BracketData {
  id?: string;
  user_id?: string;
  rounds: {
    round_64: RoundData;
    round_32: RoundData;
    sweet_16: RoundData;
    elite_8: RoundData;
    final_4: RoundData;
    championship: RoundData;
  };
}

interface MarchMadnessBracketProps {
  initialMatches?: { rounds: RoundData };
  onBracketChange?: (bracket: BracketData) => void;
  submissionId?: string;
  userID?: string;
}

const MarchMadnessBracket: React.FC<MarchMadnessBracketProps> = ({
  initialMatches,
  onBracketChange,
  submissionId = "user_bracket",
  userID = crypto.randomUUID(),
}) => {
  // Initialize bracket data
  const [bracket, setBracket] = useState<BracketData>({
    id: submissionId,
    user_id: userID,
    rounds: {
      round_64: {},
      round_32: {},
      sweet_16: {},
      elite_8: {},
      final_4: {},
      championship: {}
    }
  });

  // Initialize from provided matches
  useEffect(() => {
    if (initialMatches && initialMatches.rounds) {
      const round64: RoundData = {};
      
      // Convert initial matches to our format
      Object.entries(initialMatches.rounds).forEach(([matchId, match]) => {
        round64[matchId] = { ...match, winner: null };
      });
      
      setBracket(prev => ({
        ...prev,
        rounds: {
          ...prev.rounds,
          round_64: round64
        }
      }));
    }
  }, [initialMatches]);

  // Notify parent component of changes
  useEffect(() => {
    if (onBracketChange) {
      onBracketChange(bracket);
    }
  }, [bracket, onBracketChange]);

  // Update winner selection
  const handleWinnerSelection = (round: string, matchId: string, winner: Team) => {
    const updatedBracket = { ...bracket };
    
    // Update the winner for the current match
    if (updatedBracket.rounds[round as keyof typeof updatedBracket.rounds][matchId]) {
      updatedBracket.rounds[round as keyof typeof updatedBracket.rounds][matchId].winner = winner;
    }
    
    // Propagate the winner to the next round
    const nextRoundMap: { [key: string]: string } = {
      'round_64': 'round_32',
      'round_32': 'sweet_16',
      'sweet_16': 'elite_8',
      'elite_8': 'final_4',
      'final_4': 'championship'
    };
    
    if (nextRoundMap[round]) {
      const nextRound = nextRoundMap[round];
      const nextMatchId = `match_${Math.ceil(parseInt(matchId.split('_')[1]) / 2)}`;
      const isFirstTeam = parseInt(matchId.split('_')[1]) % 2 !== 0;
      
      // Create the next match if it doesn't exist
      if (!updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId]) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId] = {
          team1: null,
          team2: null,
          winner: null
        };
      }
      
      // Update the team in the next match
      if (isFirstTeam) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team1 = winner;
      } else {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team2 = winner;
      }
      
      // Clear the winner of the next match if one of its teams changed
      updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].winner = null;
      
      // Recursively clear subsequent rounds
      clearSubsequentRounds(updatedBracket, nextRound, nextMatchId);
    }
    
    setBracket(updatedBracket);
  };
  
  // Clear subsequent rounds when a winner changes
  const clearSubsequentRounds = (updatedBracket: BracketData, round: string, matchId: string) => {
    const nextRoundMap: { [key: string]: string } = {
      'round_32': 'sweet_16',
      'sweet_16': 'elite_8',
      'elite_8': 'final_4',
      'final_4': 'championship'
    };
    
    if (nextRoundMap[round]) {
      const nextRound = nextRoundMap[round];
      const nextMatchId = `match_${Math.ceil(parseInt(matchId.split('_')[1]) / 2)}`;
      const isFirstTeam = parseInt(matchId.split('_')[1]) % 2 !== 0;
      
      // Create or update the next match
      if (!updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId]) {
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId] = {
          team1: null,
          team2: null,
          winner: null
        };
      } else {
        // Clear the appropriate team and the winner
        if (isFirstTeam) {
          updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team1 = null;
        } else {
          updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].team2 = null;
        }
        updatedBracket.rounds[nextRound as keyof typeof updatedBracket.rounds][nextMatchId].winner = null;
      }
      
      // Recursively clear subsequent rounds
      clearSubsequentRounds(updatedBracket, nextRound, nextMatchId);
    }
  };

  // Export bracket data as JSON
  const exportBracket = async () => {
    try {
      const response = await fetch('/api/bracket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bracket),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send bracket: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Bracket successfully sent:', result);
    } catch (error) {
      console.error('Error sending bracket:', error);
    }
  };

  // Render a match card
  const renderMatch = (round: string, matchId: string, match: Match) => {
    const { team1, team2, winner } = match;
    
    return (
      <div key={`${round}-${matchId}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-2 text-xs">
        <div className="flex flex-col">
          <div className={`flex items-center justify-between p-1 ${winner === team1 ? 'bg-blue-100 dark:bg-blue-900 rounded' : ''}`}>
            <span className="truncate max-w-[80px]">{team1 || '—'}</span>
            <input 
              type="radio" 
              name={`${round}-${matchId}`} 
              checked={winner === team1} 
              onChange={() => team1 && handleWinnerSelection(round, matchId, team1)}
              disabled={!team1 || !team2}
              className="ml-1"
            />
          </div>
          <div className={`flex items-center justify-between p-1 ${winner === team2 ? 'bg-blue-100 dark:bg-blue-900 rounded' : ''}`}>
            <span className="truncate max-w-[80px]">{team2 || '—'}</span>
            <input 
              type="radio" 
              name={`${round}-${matchId}`} 
              checked={winner === team2} 
              onChange={() => team2 && handleWinnerSelection(round, matchId, team2)}
              disabled={!team1 || !team2}
              className="ml-1"
            />
          </div>
        </div>
      </div>
    );
  };

  // Render empty match placeholder
  const renderEmptyMatch = (key: string) => (
    <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-2 text-xs opacity-50">
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-1">
          <span className="truncate max-w-[80px]">—</span>
          <input type="radio" disabled className="ml-1" />
        </div>
        <div className="flex items-center justify-between p-1">
          <span className="truncate max-w-[80px]">—</span>
          <input type="radio" disabled className="ml-1" />
        </div>
      </div>
    </div>
  );

  // Render first round (split into left and right sides)
  const renderFirstRound = (side: 'left' | 'right') => {
    const roundData = bracket.rounds.round_64;
    const startMatchId = side === 'left' ? 1 : 17;
    const endMatchId = side === 'left' ? 16 : 32;
    
    return (
      <div className="flex flex-col justify-around h-full">
        <div className="text-center font-bold mb-2 text-sm">First Round</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 16 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`;
            if (roundData[matchId]) {
              return renderMatch('round_64', matchId, roundData[matchId]);
            } else {
              return renderEmptyMatch(`empty-round64-${matchId}`);
            }
          })}
        </div>
      </div>
    );
  };

  // Render second round (split into left and right sides)
  const renderSecondRound = (side: 'left' | 'right') => {
    const roundData = bracket.rounds.round_32;
    const startMatchId = side === 'left' ? 1 : 9;
    const endMatchId = side === 'left' ? 8 : 16;
    
    return (
      <div className="flex flex-col justify-around h-full">
        <div className="text-center font-bold mb-2 text-sm">Second Round</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 8 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`;
            if (roundData[matchId]) {
              return renderMatch('round_32', matchId, roundData[matchId]);
            } else {
              return renderEmptyMatch(`empty-round32-${matchId}`);
            }
          })}
        </div>
      </div>
    );
  };

  // Render sweet 16 (split into left and right sides)
  const renderSweet16 = (side: 'left' | 'right') => {
    const roundData = bracket.rounds.sweet_16;
    const startMatchId = side === 'left' ? 1 : 5;
    const endMatchId = side === 'left' ? 4 : 8;
    
    return (
      <div className="flex flex-col justify-around h-full space-y-4">
        <div className="text-center font-bold mb-2 text-sm">Sweet 16</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 4 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`;
            if (roundData[matchId]) {
              return renderMatch('sweet_16', matchId, roundData[matchId]);
            } else {
              return renderEmptyMatch(`empty-sweet16-${matchId}`);
            }
          })}
        </div>
      </div>
    );
  };

  // Render elite 8 (split into left and right sides)
  const renderElite8 = (side: 'left' | 'right') => {
    const roundData = bracket.rounds.elite_8;
    const startMatchId = side === 'left' ? 1 : 3;
    const endMatchId = side === 'left' ? 2 : 4;
    
    return (
      <div className="flex flex-col justify-around h-full space-y-6">
        <div className="text-center font-bold mb-2 text-sm">Elite 8</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 2 }).map((_, index) => {
            const matchId = `match_${startMatchId + index}`;
            if (roundData[matchId]) {
              return renderMatch('elite_8', matchId, roundData[matchId]);
            } else {
              return renderEmptyMatch(`empty-elite8-${matchId}`);
            }
          })}
        </div>
      </div>
    );
  };

  // Render final four
  const renderFinalFour = () => {
    const roundData = bracket.rounds.final_4;
    
    return (
      <div className="flex flex-col justify-around h-full space-y-8">
        <div className="text-center font-bold mb-2 text-sm">Final Four</div>
        <div className="flex flex-col justify-around h-full">
          {Array.from({ length: 2 }).map((_, index) => {
            const matchId = `match_${index + 1}`;
            if (roundData[matchId]) {
              return renderMatch('final_4', matchId, roundData[matchId]);
            } else {
              return renderEmptyMatch(`empty-final4-${matchId}`);
            }
          })}
        </div>
      </div>
    );
  };

  // Render championship
  const renderChampionship = () => {
    const roundData = bracket.rounds.championship;
    
    return (
      <div className="flex flex-col justify-center h-full mb-8">
        <div className="text-center font-bold mb-2 text-sm">Championship</div>
        <div className="flex flex-col justify-center h-full">
          {roundData['match_1'] ? 
            renderMatch('championship', 'match_1', roundData['match_1']) : 
            renderEmptyMatch('empty-championship-1')
          }
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen p-4 font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{"March Madness Mania!"}</h1>
        <button
          onClick={exportBracket}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          Export Bracket
        </button>
      </div>
      
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left side bracket */}
        <div className="flex flex-1">
          {/* First Round - Left side */}
          <div className="w-1/4 min-w-[140px]">
            {renderFirstRound('left')}
          </div>
          
          {/* Second Round - Left side */}
          <div className="w-1/4 min-w-[140px]">
            {renderSecondRound('left')}
          </div>
          
          {/* Sweet 16 - Left side */}
          <div className="w-1/4 min-w-[140px]">
            {renderSweet16('left')}
          </div>
          
          {/* Elite 8 - Left side */}
          <div className="w-1/4 min-w-[140px]">
            {renderElite8('left')}
          </div>
        </div>
        
        {/* Center (Championship and Final Four) */}
        <div className="flex flex-col items-center mx-4">
          <div className="flex flex-col justify-center h-full">
            {/* Championship */}
            <div className="min-w-[140px]">
              {renderChampionship()}
            </div>
            
            {/* Final Four */}
            <div className="min-w-[140px]">
              {renderFinalFour()}
            </div>
          </div>
        </div>
        
        {/* Right side bracket */}
        <div className="flex flex-1">
          {/* Elite 8 - Right side */}
          <div className="w-1/4 min-w-[140px]">
            {renderElite8('right')}
          </div>
          
          {/* Sweet 16 - Right side */}
          <div className="w-1/4 min-w-[140px]">
            {renderSweet16('right')}
          </div>
          
          {/* Second Round - Right side */}
          <div className="w-1/4 min-w-[140px]">
            {renderSecondRound('right')}
          </div>
          
          {/* First Round - Right side */}
          <div className="w-1/4 min-w-[140px]">
            {renderFirstRound('right')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarchMadnessBracket;