"use client";

import React, { useState } from 'react';
import MarchMadnessBracket from '../../components/MarchMadnessBracket';
import { generateSampleMatches } from '../../components/bracket-utils';

const App: React.FC = () => {
  const [sampleMatches] = useState(generateSampleMatches());
  
  const handleBracketChange = (bracketData: any) => {
    console.log('Bracket updated:', bracketData);
    // You could save to localStorage, send to a server, etc.
  };
  
  return (
    <div className="dark:bg-gray-900 min-h-screen">
      <MarchMadnessBracket
        initialMatches={sampleMatches}
        onBracketChange={handleBracketChange}
        submissionId="user123_bracket"
      />
    </div>
  );
};

export default App;