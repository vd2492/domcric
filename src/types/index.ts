export interface Player {
  id: string;
  name: string;
  team: string;
  performance: {
    matches: number;
    runs?: number;
    wickets?: number;
    catches?: number;
    stumpings?: number;
    battingAverage?: number;
    bowlingAverage?: number;
    economy?: number;
    strikeRate?: number;
  };
  category: PlayerCategory;
  subCategory?: PlayerSubCategory;
}

export enum PlayerCategory {
  KEEPER = 'KEEPER',
  OPENING_BATTER = 'OPENING_BATTER',
  ALLROUNDER = 'ALLROUNDER',
  BOWLER = 'BOWLER'
}

export enum PlayerSubCategory {
  SPINNER_ALLROUNDER = 'SPINNER_ALLROUNDER',
  FAST_BOWLING_ALLROUNDER = 'FAST_BOWLING_ALLROUNDER',
  SPINNER = 'SPINNER',
  FAST_BOWLER = 'FAST_BOWLER'
}

export interface CategorySection {
  title: string;
  players: Player[];
  subCategories?: {
    title: string;
    players: Player[];
  }[];
} 