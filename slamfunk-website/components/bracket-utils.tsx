//ts basically populates the bracket - 2025 March Madness Official Matchups

export const generateSampleMatches = () => {
    // Official 2025 March Madness First Round Matchups
    // Bracket Layout: Top Left = East, Bottom Left = South, Top Right = West, Bottom Right = Midwest

    const round64: { [key: string]: { team1: string; team2: string } } = {
      // EAST REGION (Top Left - Washington D.C.)
      "match_1": { team1: "Duke", team2: "Siena" },
      "match_2": { team1: "Ohio St", team2: "TCU" },
      "match_3": { team1: "St John's", team2: "Northern Iowa" },
      "match_4": { team1: "Kansas", team2: "Cal Baptist" },
      "match_5": { team1: "Louisville", team2: "South Florida" },
      "match_6": { team1: "Michigan St", team2: "North Dakota St" },
      "match_7": { team1: "UCLA", team2: "UCF" },
      "match_8": { team1: "UConn", team2: "Furman" },

      // SOUTH REGION (Bottom Left - Houston)
      "match_9": { team1: "Florida", team2: "Prairie View A&M/Lehigh" },
      "match_10": { team1: "Clemson", team2: "Iowa" },
      "match_11": { team1: "Vanderbilt", team2: "McNeese" },
      "match_12": { team1: "Nebraska", team2: "Troy" },
      "match_13": { team1: "North Carolina", team2: "VCU" },
      "match_14": { team1: "Illinois", team2: "Penn" },
      "match_15": { team1: "Saint Mary's", team2: "Texas A&M" },
      "match_16": { team1: "Houston", team2: "Idaho" },

      // WEST REGION (Top Right - San Jose)
      "match_17": { team1: "Arizona", team2: "LIU" },
      "match_18": { team1: "Villanova", team2: "Utah St" },
      "match_19": { team1: "Wisconsin", team2: "High Point" },
      "match_20": { team1: "Arkansas", team2: "Hawai'i" },
      "match_21": { team1: "BYU", team2: "Texas/NC State" },
      "match_22": { team1: "Gonzaga", team2: "Kennesaw St" },
      "match_23": { team1: "Miami (FL)", team2: "Missouri" },
      "match_24": { team1: "Purdue", team2: "Queens" },

      // MIDWEST REGION (Bottom Right - Chicago)
      "match_25": { team1: "Michigan", team2: "UMBC/Howard" },
      "match_26": { team1: "Georgia", team2: "Saint Louis" },
      "match_27": { team1: "Texas Tech", team2: "Akron" },
      "match_28": { team1: "Alabama", team2: "Hofstra" },
      "match_29": { team1: "Tennessee", team2: "Miami (OH)/SMU" },
      "match_30": { team1: "Virginia", team2: "Wright St" },
      "match_31": { team1: "Kentucky", team2: "Santa Clara" },
      "match_32": { team1: "Iowa St", team2: "Tennessee St" },
    };

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