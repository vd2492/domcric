import Papa from 'papaparse';
import { Player, PlayerCategory, PlayerSubCategory } from '../types';

export interface CSVPlayer {
  No: string;
  Player: string;
  Team: string;
  Wickets: string;
  Mat: string;
  Inns: string;
  Avg: string;
  SR: string;
  ER: string;
  '5W+': string;
  '3W+': string;
  Maiden: string;
  Runs: string;
  HS: string;
  '100': string;
  '50': string;
  '4s': string;
  '6s': string;
  Role: string;
}

export const parseCSVData = (csvText: string): Player[] => {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const players: Player[] = [];
  const seenPlayers = new Set<string>(); // Track seen players to avoid duplicates
  let playerId = 1;

  results.data.forEach((row: any) => {
    const csvPlayer = row as CSVPlayer;
    
    // Skip rows with empty player names
    if (!csvPlayer.Player || csvPlayer.Player.trim() === '') {
      return;
    }

    // Create unique key for player to avoid duplicates
    const playerKey = `${csvPlayer.Player.trim()}-${csvPlayer.Team.trim()}`;
    if (seenPlayers.has(playerKey)) {
      return; // Skip duplicate
    }
    seenPlayers.add(playerKey);

    // Determine category and subcategory based on Role
    const { category, subCategory } = getCategoryFromRole(csvPlayer.Role);
    
    // Create player object
    const player: Player = {
      id: `p${playerId++}`,
      name: csvPlayer.Player.trim(),
      team: csvPlayer.Team.trim(),
      performance: {
        matches: parseInt(csvPlayer.Mat) || 0,
        runs: parseInt(csvPlayer.Runs) || 0,
        wickets: parseInt(csvPlayer.Wickets) || 0,
        battingAverage: parseFloat(csvPlayer.Avg) || 0,
        strikeRate: parseFloat(csvPlayer.SR) || 0,
        economy: parseFloat(csvPlayer.ER) || 0,
      },
      category,
      subCategory,
    };

    // Attach extra stats for PlayerCard
    (player as any).role = csvPlayer.Role || '';
    (player as any).csvStats = {
      '5W+': csvPlayer['5W+'],
      '3W+': csvPlayer['3W+'],
      '100': csvPlayer['100'],
      '50': csvPlayer['50'],
      '4s': csvPlayer['4s'],
      '6s': csvPlayer['6s'],
    };

    // Add keeper-specific stats if applicable
    if (category === PlayerCategory.KEEPER) {
      player.performance.catches = 0; // Default value, not in CSV
      player.performance.stumpings = 0; // Default value, not in CSV
    }

    // Add bowling average for bowlers and all-rounders
    if (category === PlayerCategory.BOWLER || category === PlayerCategory.ALLROUNDER) {
      player.performance.bowlingAverage = parseFloat(csvPlayer.Avg) || 0;
    }

    players.push(player);
  });

  return players;
};

const getCategoryFromRole = (role: string): { category: PlayerCategory; subCategory?: PlayerSubCategory } => {
  const roleLower = role.toLowerCase();
  
  // Wicketkeeper
  if (roleLower.includes('wicketkeeper') || roleLower.includes('keeper')) {
    return { category: PlayerCategory.KEEPER };
  }
  
  // Batsman
  if (roleLower.includes('batsman') || roleLower.includes('bat')) {
    return { category: PlayerCategory.OPENING_BATTER };
  }
  
  // All-rounders
  if (roleLower.includes('all-rounder') || roleLower.includes('allrounder')) {
    if (roleLower.includes('spin') || roleLower.includes('orthodox') || roleLower.includes('leg') || roleLower.includes('offbreak')) {
      return { 
        category: PlayerCategory.ALLROUNDER, 
        subCategory: PlayerSubCategory.SPINNER_ALLROUNDER 
      };
    } else {
      return { 
        category: PlayerCategory.ALLROUNDER, 
        subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER 
      };
    }
  }
  
  // Bowlers
  if (roleLower.includes('bowler') || roleLower.includes('bowling')) {
    if (roleLower.includes('spin') || roleLower.includes('orthodox') || roleLower.includes('leg') || roleLower.includes('offbreak') || roleLower.includes('wrist spin')) {
      return { 
        category: PlayerCategory.BOWLER, 
        subCategory: PlayerSubCategory.SPINNER 
      };
    } else {
      return { 
        category: PlayerCategory.BOWLER, 
        subCategory: PlayerSubCategory.FAST_BOWLER 
      };
    }
  }
  
  // Default to batsman if role is unclear
  return { category: PlayerCategory.OPENING_BATTER };
};

export const loadCSVData = async (): Promise<Player[]> => {
  try {
    const response = await fetch('/players.csv');
    const csvText = await response.text();
    return parseCSVData(csvText);
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return [];
  }
}; 