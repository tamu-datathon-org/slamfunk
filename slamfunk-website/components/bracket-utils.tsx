//ts basically populates the bracket

export const generateSampleMatches = () => {
    const teams = [
      "Auburn", "Alabama St.", "Louisville", "Creighton",
      "Michigan", "UC San Diego", "Texas A&M", "Yale",
      "Ole Miss", "North Carolina", "Iowa St.", "Lipscomb",
      "Marquette", "New Mexico", "Michigan St.", "Bryant",
      "Florida", "Norfolk St.", "UConn", "Oklahoma",
      "Memphis", "Colorado St.", "Maryland", "Grand Canyon",
      "Missouri", "Drake", "Texas Tech", "UNCW",
      "Kansas", "Arkansas", "St. John's", "Omaha",
      "Duke", "AMER/MTSM", "Miss St.", "Baylor",
      "Oregon", "Liberty", "Arizona", "Akron",
      "BYU", "VCU", "Wisconsin", "Montana",
      "Saint Mary's", "Vanderbilt", "Alabama", "Robert Morris",
      "Houston", "SIUE", "Gonzaga", "Georgia",
      "Clemson", "McNeese", "Purdue", "High Point",
      "Illinois", "TEX/XAV", "Kentucky", "Troy",
      "UCLA", "Utah St.", "Tennessee", "Wofford"
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