//ts basically populates the bracket

export const generateSampleMatches = () => {
    const teams = [
      "Gonzaga", "Grand Canyon", "Mississippi St", "Michigan St",
      "Purdue", "Montana St", "Kansas", "Samford",
      "Arizona", "Long Beach St", "Dayton", "Nevada",
      "Alabama", "Charleston", "Wisconsin", "Oregon",
      "UConn", "Stetson", "Northwestern", "Florida Atlantic",
      "San Diego St", "UAB", "Yale", "Auburn",
      "Houston", "Longwood", "Texas A&M", "Nebraska",
      "Iowa St", "South Dakota St", "Washington St", "Drake",
      "North Carolina", "Howard", "Michigan", "Colorado St",
      "Kentucky", "Oakland", "Texas Tech", "NC State",
      "Tennessee", "Saint Peter's", "Texas", "Colorado",
      "Duke", "Vermont", "James Madison", "Wisconsin",
      "Marquette", "Western Kentucky", "Florida", "Boise St",
      "Illinois", "Morehead St", "Washington", "Creighton",
      "Baylor", "Colgate", "Utah St", "TCU",
      "Iowa", "New Mexico", "BYU", "Virginia"
    ];
  
    const round64: { [key: string]: { team1: string; team2: string } } = {};
    
    for (let i = 0; i < 32; i++) {
      round64[`match_${i + 1}`] = {
        team1: teams[i * 2],
        team2: teams[i * 2 + 1]
      };
    }
    
    return {
      rounds: round64
    };
  };
  
  // Usage example
  /*
  import { MarchMadnessBracket } from './MarchMadnessBracket';
  import { generateSampleMatches } from './bracket-utils';
  
  const App = () => {
    const sampleMatches = generateSampleMatches();
    
    const handleBracketChange = (bracketData) => {
      console.log('Bracket updated:', bracketData);
      // Save to local storage, send to server, etc.
    };
    
    return (
      <MarchMadnessBracket
        initialMatches={sampleMatches}
        onBracketChange={handleBracketChange}
        submissionId="user123_bracket"
        tournamentName="March Madness 2025"
      />
    );
  };
  
  export default App;
  */