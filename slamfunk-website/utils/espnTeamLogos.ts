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
  // 2025 Tournament Teams
  "Duke": "150",
  "Siena": "2561",
  "Ohio St": "194",
  "Ohio St.": "194",
  "TCU": "2628",
  "St John's": "2599",
  "St. John's": "2599",
  "Northern Iowa": "2460",
  "Kansas": "2305",
  "Cal Baptist": "2934",
  "Louisville": "97",
  "South Florida": "58",
  "Michigan St": "127",
  "Michigan St.": "127",
  "North Dakota St": "2449",
  "North Dakota St.": "2449",
  "UCLA": "26",
  "UCF": "2116",
  "UConn": "41",
  "Furman": "231",

  "Florida": "57",
  "Prairie View A&M": "2504",
  "Lehigh": "2287",
  "Clemson": "228",
  "Iowa": "2294",
  "Vanderbilt": "238",
  "McNeese": "2377",
  "Nebraska": "158",
  "Troy": "2653",
  "North Carolina": "153",
  "VCU": "2670",
  "Illinois": "356",
  "Penn": "219",
  "Saint Mary's": "2608",
  "St Mary's": "2608",
  "Texas A&M": "245",
  "Houston": "248",
  "Idaho": "70",

  "Arizona": "12",
  "LIU": "2329",
  "Villanova": "222",
  "Utah St": "328",
  "Utah St.": "328",
  "Wisconsin": "275",
  "High Point": "2272",
  "Arkansas": "8",
  "Hawai'i": "62",
  "BYU": "252",
  "Texas": "251",
  "NC State": "152",
  "Gonzaga": "2250",
  "Kennesaw St": "338",
  "Kennesaw St.": "338",
  "Miami (FL)": "2390",
  "Missouri": "142",
  "Purdue": "2509",
  "Queens": "3228",

  "Michigan": "130",
  "UMBC": "2378",
  "Howard": "47",
  "Georgia": "61",
  "Saint Louis": "139",
  "St Louis": "139",
  "St. Louis": "139",
  "Texas Tech": "2641",
  "Akron": "7",
  "Alabama": "333",
  "Hofstra": "2275",
  "Tennessee": "2633",
  "Miami (OH)": "193",
  "SMU": "2567",
  "Virginia": "258",
  "Wright St": "2750",
  "Wright St.": "2750",
  "Kentucky": "96",
  "Santa Clara": "2595",
  "Iowa St": "66",
  "Iowa St.": "66",
  "Tennessee St": "2634",
  "Tennessee St.": "2634",

  // Legacy teams (keeping for old brackets)
  "Auburn": "2",
  "Alabama St.": "2010",
  "Creighton": "156",
  "UC San Diego": "2110",
  "Yale": "704",
  "Ole Miss": "145",
  "Lipscomb": "288",
  "Marquette": "269",
  "New Mexico": "167",
  "Bryant": "2065",
  "Norfolk St.": "2450",
  "Oklahoma": "201",
  "Memphis": "235",
  "Colorado St.": "36",
  "Maryland": "120",
  "Grand Canyon": "2253",
  "Drake": "2181",
  "UNCW": "350",
  "Omaha": "2437",
  "St. Mary's": "2608",
  "Miss St.": "344",
  "Baylor": "239",
  "Oregon": "2483",
  "Liberty": "2335",
  "Montana": "149",
  "Robert Morris": "2545",
  "SIUE": "2565",
  "Xavier": "2752",
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
  // Handle play-in game teams (e.g., "Team A/Team B")
  if (teamName && teamName.includes('/')) {
    const firstTeam = teamName.split('/')[0].trim();
    return TEAM_NAME_TO_ID[firstTeam] || null;
  }
  return TEAM_NAME_TO_ID[teamName] || null;
}
