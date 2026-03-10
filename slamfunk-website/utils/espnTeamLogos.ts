interface TeamLogo {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
}

interface Team {
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  logos: TeamLogo[];
}

interface ESPNTeamsResponse {
  sports: Array<{
    leagues: Array<{
      teams: Array<{
        team: Team;
      }>;
    }>;
  }>;
}

let teamsCache: Team[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; 

const TEAM_NAME_TO_ID: { [key: string]: string } = {
  "Auburn": "2",
  "Alabama St.": "2010",
  "Louisville": "97",
  "Creighton": "156",
  "Michigan": "130",
  "UC San Diego": "2110",
  "Texas A&M": "245",
  "Yale": "704",
  "Ole Miss": "145",
  "North Carolina": "153",
  "Iowa St.": "66",
  "Lipscomb": "288",
  "Marquette": "269",
  "New Mexico": "167",
  "Michigan St.": "127",
  "Bryant": "2065",
  "Florida": "57",
  "Norfolk St.": "2335",
  "UConn": "41",
  "Oklahoma": "201",
  "Memphis": "235",
  "Colorado St.": "36",
  "Maryland": "120",
  "Grand Canyon": "2253",
  "Missouri": "142",
  "Drake": "2181",
  "Texas Tech": "2641",
  "UNCW": "350",
  "Kansas": "2305",
  "Arkansas": "8",
  "St. John's": "2599",
  "Omaha": "2437",
  "Duke": "150",
  "St. Mary's": "2608",
  "Miss St.": "344",
  "Baylor": "239",
  "Oregon": "2483",
  "Liberty": "2335",
  "Arizona": "12",
  "Akron": "2",
  "BYU": "252",
  "VCU": "2670",
  "Wisconsin": "275",
  "Montana": "149",
  "Saint Mary's": "2608",
  "Vanderbilt": "238",
  "Alabama": "333",
  "Robert Morris": "2545",
  "Houston": "248",
  "SIUE": "2565",
  "Gonzaga": "2250",
  "Georgia": "61",
  "Clemson": "228",
  "McNeese": "2377",
  "Purdue": "2509",
  "High Point": "2272",
  "Illinois": "356",
  "Xavier": "2752",
  "Kentucky": "96",
  "Troy": "2653",
  "UCLA": "26",
  "Utah St.": "328",
  "Tennessee": "2633",
  "Wofford": "2747"
};

export async function fetchTeams(): Promise<Team[]> {
  const now = Date.now();
  if (teamsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return teamsCache;
  }

  try {
    const response = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=1000'
    );

    if (!response.ok) {
      throw new Error(`ESPN API error: ${response.status}`);
    }

    const data: ESPNTeamsResponse = await response.json();
    const teams = data.sports[0]?.leagues[0]?.teams.map(t => t.team) || [];

    teamsCache = teams;
    cacheTimestamp = now;

    return teams;
  } catch (error) {
    console.error('Error fetching teams from ESPN:', error);
    return [];
  }
}


export async function getTeamLogo(teamName: string, size: number = 500): Promise<string | null> {
  if (!teamName || teamName === "—") return null;

  const teamId = TEAM_NAME_TO_ID[teamName];
  if (teamId) {
    return `https://a.espncdn.com/i/teamlogos/ncaa/500/${teamId}.png`;
  }

  const teams = await fetchTeams();
  const team = teams.find(t =>
    t.displayName === teamName ||
    t.shortDisplayName === teamName ||
    t.name === teamName ||
    t.nickname === teamName
  );

  if (team && team.logos && team.logos.length > 0) {
    const logo = team.logos.find(l => l.width === size) || team.logos[0];
    return logo.href;
  }

  return null;
}

export async function preloadTeamLogos(teamNames: string[]): Promise<Map<string, string>> {
  const logoMap = new Map<string, string>();

  await Promise.all(
    teamNames.map(async (teamName) => {
      const logo = await getTeamLogo(teamName);
      if (logo) {
        logoMap.set(teamName, logo);
      }
    })
  );

  return logoMap;
}

export function getTeamLogoById(teamId: string, size: number = 500): string {
  return `https://a.espncdn.com/i/teamlogos/ncaa/${size}/${teamId}.png`;
}

export function getTeamId(teamName: string): string | null {
  return TEAM_NAME_TO_ID[teamName] || null;
}
