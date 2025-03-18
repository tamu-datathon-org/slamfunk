import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
from collections import defaultdict

load_dotenv()
API_KEY = os.environ.get('API_KEY')

# Define the URL for ESPN's NCAA March Madness page
url = 'https://www.espn.com/mens-college-basketball/bracket/_/season/2025'

# Set headers to mimic a browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9'
}

try:
    # Use a session for persistent requests
    session = requests.Session()
    response = session.get(url, headers=headers)
    response.raise_for_status()  # Raise an exception for HTTP errors
except requests.exceptions.RequestException as e:
    print(f"Failed to fetch data: {e}")
    exit()

try:
    soup = BeautifulSoup(response.content, 'html.parser')
except Exception as e:
    print(f"Failed to parse HTML content: {e}")
    exit()

# Extract game data
matches = []
try:
    for game in soup.find_all('div', class_='BracketCell__Competitors'):
        teams = game.find_all('div', class_='BracketCell__Name')
        scores = game.find_all('div', class_='BracketCell__Score')

        if len(teams) == 2 and len(scores) == 2:
            # Determine the winner based on scores
            try:
                winner = (
                        "Unknown" 
                        if not scores[0].text.strip().isdigit() or not scores[1].text.strip().isdigit() 
                        else teams[0].text.strip() if int(scores[0].text.strip()) > int(scores[1].text.strip()) 
                        else teams[1].text.strip()
                    )
                match = {
                    'team1': teams[0].text.strip(),
                    'team2': teams[1].text.strip(),
                    'score1': scores[0].text.strip(),
                    'score2': scores[1].text.strip(),
                    'winner': winner
                }
                matches.append(match)
            except ValueError:
                print("Error parsing scores — skipping match.")

    matches = matches[:-4] # Remove the first four matches 
except Exception as e:
    print(f"Error extracting matches: {e}")
    exit()


# Count actual team appearances
actual_team_counts = defaultdict(int)
for match in matches:
    actual_team_counts[match['winner']] += 1
# print(matches)
points = [0, 1, 3, 7, 15, 31]

bracket_url = 'https://mm.tamudatathon.com/api/bracket/'
user_url = 'https://mm.tamudatathon.com/api/user/'
user_update_url='https://mm.tamudatathon.com/api/user/update/'

try:
    response = requests.get(bracket_url)
    response.raise_for_status()
    brackets = response.json()
    # print(brackets)
except requests.exceptions.RequestException as e:
    print(f"Failed to fetch bracket data: {e}")
    exit()

# print(brackets)
# brackets = [{'id': 'ca1cf53f-4f04-4e78-9eea-2205e915d50e', 'user_id': 'weiwu@tamu.edu', 'rounds': {'round_64': {'match_22': {'team1': 'Wisconsin', 'team2': 'Montana', 'winner': 'Wisconsin'}, 'match_23': {'team1': "Saint Mary's", 'team2': 'Vanderbilt', 'winner': "Saint Mary's"}, 'match_20': {'team1': 'Arizona', 'team2': 'Akron', 'winner': 'Arizona'}, 'match_21': {'team1': 'BYU', 'team2': 'VCU', 'winner': 'BYU'}, 'match_26': {'team1': 'Gonzaga', 'team2': 'Georgia', 'winner': 'Gonzaga'}, 'match_27': {'team1': 'Clemson', 'team2': 'McNeese', 'winner': 'Clemson'}, 'match_24': {'team1': 'Alabama', 'team2': 'Robert Morris', 'winner': 'Alabama'}, 'match_25': {'team1': 'Houston', 'team2': 'SIUE', 'winner': 'Houston'}, 'match_19': {'team1': 'Oregon', 'team2': 'Liberty', 'winner': 'Liberty'}, 'match_17': {'team1': 'Duke', 'team2': 'AMER/MTSM', 'winner': 'AMER/MTSM'}, 'match_18': {'team1': 'Miss St.', 'team2': 'Baylor', 'winner': 'Baylor'}, 'match_8': {'team1': 'Michigan St.', 'team2': 'Bryant', 'winner': 'Michigan St.'}, 'match_9': {'team1': 'Florida', 'team2': 'Norfolk St.', 'winner': 'Florida'}, 'match_6': {'team1': 'Iowa St.', 'team2': 'Lipscomb', 'winner': 'Lipscomb'}, 'match_7': {'team1': 'Marquette', 'team2': 'New Mexico', 'winner': 'Marquette'}, 'match_4': {'team1': 'Texas A&M', 'team2': 'Yale', 'winner': 'Yale'}, 'match_5': {'team1': 'Ole Miss', 'team2': 'SDSU/UNC', 'winner': 'Ole Miss'}, 'match_30': {'team1': 'Kentucky', 'team2': 'Troy', 'winner': 'Kentucky'}, 'match_2': {'team1': 'Louisville', 'team2': 'Creighton', 'winner': 'Creighton'}, 'match_3': {'team1': 'Michigan', 'team2': 'UC San Diego', 'winner': 'Michigan'}, 'match_11': {'team1': 'Memphis', 'team2': 'Colorado St.', 'winner': 'Colorado St.'}, 'match_1': {'team1': 'Auburn', 'team2': 'ALST/SFU', 'winner': 'ALST/SFU'}, 'match_12': {'team1': 'Maryland', 'team2': 'Grand Canyon', 'winner': 'Grand Canyon'}, 'match_31': {'team1': 'UCLA', 'team2': 'Utah St.', 'winner': 'UCLA'}, 'match_10': {'team1': 'UConn', 'team2': 'Oklahoma', 'winner': 'Oklahoma'}, 'match_32': {'team1': 'Tennessee', 'team2': 'Wofford', 'winner': 'Tennessee'}, 'match_15': {'team1': 'Kansas', 'team2': 'Arkansas', 'winner': 'Kansas'}, 'match_16': {'team1': "St. John's", 'team2': 'Omaha', 'winner': "St. John's"}, 'match_13': {'team1': 'Missouri', 'team2': 'Drake', 'winner': 'Missouri'}, 'match_14': {'team1': 'Texas Tech', 'team2': 'UNCW', 'winner': 'Texas Tech'}, 'match_28': {'team1': 'Purdue', 'team2': 'High Point', 'winner': 'Purdue'}, 'match_29': {'team1': 'Illinois', 'team2': 'TEX/XAV', 'winner': 'Illinois'}}, 'elite_8': {'match_1': {'team1': 'Creighton', 'team2': 'Marquette', 'winner': 'Marquette'}, 'match_4': {'team1': 'Clemson', 'team2': 'UCLA', 'winner': 'Clemson'}, 'match_2': {'team1': 'Florida', 'team2': 'Texas Tech', 'winner': 'Texas Tech'}, 'match_3': {'team1': 'Arizona', 'team2': "Saint Mary's", 'winner': 'Arizona'}}, 'round_32': {'match_8': {'team1': 'Kansas', 'team2': "St. John's", 'winner': 'Kansas'}, 'match_9': {'team1': 'AMER/MTSM', 'team2': 'Baylor', 'winner': 'Baylor'}, 'match_6': {'team1': 'Colorado St.', 'team2': 'Grand Canyon', 'winner': 'Colorado St.'}, 'match_7': {'team1': 'Missouri', 'team2': 'Texas Tech', 'winner': 'Texas Tech'}, 'match_4': {'team1': 'Marquette', 'team2': 'Michigan St.', 'winner': 'Marquette'}, 'match_5': {'team1': 'Florida', 'team2': 'Oklahoma', 'winner': 'Florida'}, 'match_2': {'team1': 'Michigan', 'team2': 'Yale', 'winner': 'Yale'}, 'match_3': {'team1': 'Ole Miss', 'team2': 'Lipscomb', 'winner': 'Ole Miss'}, 'match_11': {'team1': 'BYU', 'team2': 'Wisconsin', 'winner': 'BYU'}, 'match_1': {'team1': 'ALST/SFU', 'team2': 'Creighton', 'winner': 'Creighton'}, 'match_12': {'team1': "Saint Mary's", 'team2': 'Alabama', 'winner': "Saint Mary's"}, 'match_10': {'team1': 'Liberty', 'team2': 'Arizona', 'winner': 'Arizona'}, 'match_15': {'team1': 'Illinois', 'team2': 'Kentucky', 'winner': 'Illinois'}, 'match_16': {'team1': 'UCLA', 'team2': 'Tennessee', 'winner': 'UCLA'}, 'match_13': {'team1': 'Houston', 'team2': 'Gonzaga', 'winner': 'Houston'}, 'match_14': {'team1': 'Clemson', 'team2': 'Purdue', 'winner': 'Clemson'}}, 'sweet_16': {'match_8': {'team1': 'Illinois', 'team2': 'UCLA', 'winner': 'UCLA'}, 'match_6': {'team1': 'BYU', 'team2': "Saint Mary's", 'winner': "Saint Mary's"}, 'match_7': {'team1': 'Houston', 'team2': 'Clemson', 'winner': 'Clemson'}, 'match_4': {'team1': 'Texas Tech', 'team2': 'Kansas', 'winner': 'Texas Tech'}, 'match_5': {'team1': 'Baylor', 'team2': 'Arizona', 'winner': 'Arizona'}, 'match_2': {'team1': 'Ole Miss', 'team2': 'Marquette', 'winner': 'Marquette'}, 'match_3': {'team1': 'Florida', 'team2': 'Colorado St.', 'winner': 'Florida'}, 'match_1': {'team1': 'Creighton', 'team2': 'Yale', 'winner': 'Creighton'}}, 'final_4': {'match_1': {'team1': 'Marquette', 'team2': 'Texas Tech', 'winner': 'Marquette'}, 'match_2': {'team1': 'Arizona', 'team2': 'Clemson', 'winner': 'Arizona'}}, 'championship': {'match_1': {'team1': 'Marquette', 'team2': 'Arizona', 'winner': 'Arizona'}}}}, {'id': 'ac9d5caa-09c0-47c3-a3d1-e0224a835a87', 'user_id': 'justingao@tamu.edu', 'rounds': {'round_64': {'match_22': {'team1': 'Wisconsin', 'team2': 'Montana', 'winner': 'Wisconsin'}, 'match_23': {'team1': "Saint Mary's", 'team2': 'Vanderbilt', 'winner': 'Vanderbilt'}, 'match_20': {'team1': 'Arizona', 'team2': 'Akron', 'winner': 'Arizona'}, 'match_21': {'team1': 'BYU', 'team2': 'VCU', 'winner': 'BYU'}, 'match_26': {'team1': 'Gonzaga', 'team2': 'Georgia', 'winner': 'Gonzaga'}, 'match_27': {'team1': 'Clemson', 'team2': 'McNeese', 'winner': 'Clemson'}, 'match_24': {'team1': 'Alabama', 'team2': 'Robert Morris', 'winner': 'Alabama'}, 'match_25': {'team1': 'Houston', 'team2': 'SIUE', 'winner': 'Houston'}, 'match_19': {'team1': 'Oregon', 'team2': 'Liberty', 'winner': 'Oregon'}, 'match_17': {'team1': 'Duke', 'team2': 'AMER/MTSM', 'winner': 'Duke'}, 'match_18': {'team1': 'Miss St.', 'team2': 'Baylor', 'winner': 'Miss St.'}, 'match_8': {'team1': 'Michigan St.', 'team2': 'Bryant', 'winner': 'Michigan St.'}, 'match_9': {'team1': 'Florida', 'team2': 'Norfolk St.', 'winner': 'Florida'}, 'match_6': {'team1': 'Iowa St.', 'team2': 'Lipscomb', 'winner': 'Iowa St.'}, 'match_7': {'team1': 'Marquette', 'team2': 'New Mexico', 'winner': 'Marquette'}, 'match_4': {'team1': 'Texas A&M', 'team2': 'Yale', 'winner': 'Texas A&M'}, 'match_5': {'team1': 'Ole Miss', 'team2': 'SDSU/UNC', 'winner': 'Ole Miss'}, 'match_30': {'team1': 'Kentucky', 'team2': 'Troy', 'winner': 'Kentucky'}, 'match_2': {'team1': 'Louisville', 'team2': 'Creighton', 'winner': 'Louisville'}, 'match_3': {'team1': 'Michigan', 'team2': 'UC San Diego', 'winner': 'Michigan'}, 'match_11': {'team1': 'Memphis', 'team2': 'Colorado St.', 'winner': 'Memphis'}, 'match_1': {'team1': 'Auburn', 'team2': 'ALST/SFU', 'winner': 'Auburn'}, 'match_12': {'team1': 'Maryland', 'team2': 'Grand Canyon', 'winner': 'Grand Canyon'}, 'match_31': {'team1': 'UCLA', 'team2': 'Utah St.', 'winner': 'UCLA'}, 'match_10': {'team1': 'UConn', 'team2': 'Oklahoma', 'winner': 'UConn'}, 'match_32': {'team1': 'Tennessee', 'team2': 'Wofford', 'winner': 'Tennessee'}, 'match_15': {'team1': 'Kansas', 'team2': 'Arkansas', 'winner': 'Arkansas'}, 'match_16': {'team1': "St. John's", 'team2': 'Omaha', 'winner': 'Omaha'}, 'match_13': {'team1': 'Missouri', 'team2': 'Drake', 'winner': 'Missouri'}, 'match_14': {'team1': 'Texas Tech', 'team2': 'UNCW', 'winner': 'Texas Tech'}, 'match_28': {'team1': 'Purdue', 'team2': 'High Point', 'winner': 'High Point'}, 'match_29': {'team1': 'Illinois', 'team2': 'TEX/XAV', 'winner': 'Illinois'}}, 'elite_8': {'match_1': {'team1': 'Auburn', 'team2': 'Ole Miss', 'winner': 'Auburn'}, 'match_4': {'team1': 'Gonzaga', 'team2': 'Tennessee', 'winner': 'Tennessee'}, 'match_2': {'team1': 'UConn', 'team2': 'Texas Tech', 'winner': 'Texas Tech'}, 'match_3': {'team1': 'Duke', 'team2': 'Alabama', 'winner': 'Duke'}}, 'round_32': {'match_8': {'team1': 'Arkansas', 'team2': 'Omaha', 'winner': 'Arkansas'}, 'match_9': {'team1': 'Duke', 'team2': 'Miss St.', 'winner': 'Duke'}, 'match_6': {'team1': 'Memphis', 'team2': 'Grand Canyon', 'winner': 'Memphis'}, 'match_7': {'team1': 'Missouri', 'team2': 'Texas Tech', 'winner': 'Texas Tech'}, 'match_4': {'team1': 'Marquette', 'team2': 'Michigan St.', 'winner': 'Michigan St.'}, 'match_5': {'team1': 'Florida', 'team2': 'UConn', 'winner': 'UConn'}, 'match_2': {'team1': 'Michigan', 'team2': 'Texas A&M', 'winner': 'Texas A&M'}, 'match_3': {'team1': 'Ole Miss', 'team2': 'Iowa St.', 'winner': 'Ole Miss'}, 'match_11': {'team1': 'BYU', 'team2': 'Wisconsin', 'winner': 'BYU'}, 'match_1': {'team1': 'Auburn', 'team2': 'Louisville', 'winner': 'Auburn'}, 'match_12': {'team1': 'Vanderbilt', 'team2': 'Alabama', 'winner': 'Alabama'}, 'match_10': {'team1': 'Oregon', 'team2': 'Arizona', 'winner': 'Arizona'}, 'match_15': {'team1': 'Illinois', 'team2': 'Kentucky', 'winner': 'Kentucky'}, 'match_16': {'team1': 'UCLA', 'team2': 'Tennessee', 'winner': 'Tennessee'}, 'match_13': {'team1': 'Houston', 'team2': 'Gonzaga', 'winner': 'Gonzaga'}, 'match_14': {'team1': 'Clemson', 'team2': 'High Point', 'winner': 'Clemson'}}, 'sweet_16': {'match_8': {'team1': 'Kentucky', 'team2': 'Tennessee', 'winner': 'Tennessee'}, 'match_6': {'team1': 'BYU', 'team2': 'Alabama', 'winner': 'Alabama'}, 'match_7': {'team1': 'Gonzaga', 'team2': 'Clemson', 'winner': 'Gonzaga'}, 'match_4': {'team1': 'Texas Tech', 'team2': 'Arkansas', 'winner': 'Texas Tech'}, 'match_5': {'team1': 'Duke', 'team2': 'Arizona', 'winner': 'Duke'}, 'match_2': {'team1': 'Ole Miss', 'team2': 'Michigan St.', 'winner': 'Ole Miss'}, 'match_3': {'team1': 'UConn', 'team2': 'Memphis', 'winner': 'UConn'}, 'match_1': {'team1': 'Auburn', 'team2': 'Texas A&M', 'winner': 'Auburn'}}, 'final_4': {'match_1': {'team1': 'Auburn', 'team2': 'Texas Tech', 'winner': 'Auburn'}, 'match_2': {'team1': 'Duke', 'team2': 'Tennessee', 'winner': 'Duke'}}, 'championship': {'match_1': {'team1': 'Auburn', 'team2': 'Duke', 'winner': 'Auburn'}}}}]
for bracket in brackets:
    try:
        predicted_team_counts = defaultdict(int)

        all_teams = set(actual_team_counts.keys())
    
        temp = bracket.get('rounds')
        for rounds in temp.values():
            for match in rounds.values():
                predicted_team_counts[match['winner']] += 1

        # Calculate bracket score
        bracket_score = 0
        for team in all_teams:
            predicted = predicted_team_counts.get(team, 0)
            actual = actual_team_counts.get(team, 0)
            bracket_score += points[min(predicted, actual)]

        # print(bracket_score)

        # Fetch user data
        user_request = f"{user_url}{bracket['user_id']}"
        # print(user_request)
        
        r2 = requests.get(user_request)
        # print(r2)
        r2.raise_for_status()
        user_data = r2.json()
        
        curr_score = user_data.get('maxScore', 0)
        if curr_score <= bracket_score:
            data = {
                'maxScore': bracket_score,
                'bestBracket': bracket['id'],
                'apiKey' : API_KEY,
            }
            try:
                # print(data)
                update_url = f"{user_update_url}{bracket['user_id']}" 
                post_response = requests.patch(update_url, json=data)
                post_response.raise_for_status()
                # print(f"Updated user {user_data['name']}'s score successfully!")
            except requests.exceptions.RequestException as e:
                print(f"Failed to update user data: {e}")
                exit()
    except Exception as e:
        print(f"Error processing bracket {bracket.get('id', 'unknown')}: {e}")
