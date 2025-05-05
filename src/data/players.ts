import { Player, PlayerCategory, PlayerSubCategory } from '../types';

export const players: Player[] = [
  // Keepers (15 players)
  {
    id: 'k1',
    name: 'N Jagadeesan',
    team: 'Tamil Nadu',
    performance: {
      matches: 8,
      runs: 364,
      catches: 8,
      stumpings: 3,
      battingAverage: 52.00,
      strikeRate: 141.24
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k2',
    name: 'Prabhsimran Singh',
    team: 'Punjab',
    performance: {
      matches: 7,
      runs: 289,
      catches: 6,
      stumpings: 2,
      battingAverage: 41.28,
      strikeRate: 145.72
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k3',
    name: 'KS Bharat',
    team: 'Andhra',
    performance: {
      matches: 7,
      runs: 172,
      catches: 7,
      stumpings: 2,
      battingAverage: 34.40,
      strikeRate: 132.30
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k4',
    name: 'Upendra Yadav',
    team: 'Uttar Pradesh',
    performance: {
      matches: 7,
      runs: 218,
      catches: 5,
      stumpings: 3,
      battingAverage: 43.60,
      strikeRate: 139.74
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k5',
    name: 'KL Rahul',
    team: 'Karnataka',
    performance: {
      matches: 6,
      runs: 278,
      catches: 4,
      stumpings: 0,
      battingAverage: 55.60,
      strikeRate: 148.66
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k6',
    name: 'Ishan Kishan',
    team: 'Jharkhand',
    performance: {
      matches: 6,
      runs: 245,
      catches: 5,
      stumpings: 2,
      battingAverage: 49.00,
      strikeRate: 151.23
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k7',
    name: 'Sanju Samson',
    team: 'Kerala',
    performance: {
      matches: 7,
      runs: 265,
      catches: 6,
      stumpings: 1,
      battingAverage: 44.16,
      strikeRate: 147.22
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k8',
    name: 'Dhruv Jurel',
    team: 'Uttar Pradesh',
    performance: {
      matches: 7,
      runs: 228,
      catches: 7,
      stumpings: 2,
      battingAverage: 38.00,
      strikeRate: 135.71
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k9',
    name: 'Aditya Tare',
    team: 'Mumbai',
    performance: {
      matches: 6,
      runs: 186,
      catches: 8,
      stumpings: 1,
      battingAverage: 37.20,
      strikeRate: 132.85
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k10',
    name: 'BR Sharath',
    team: 'Karnataka',
    performance: {
      matches: 7,
      runs: 195,
      catches: 6,
      stumpings: 3,
      battingAverage: 39.00,
      strikeRate: 136.36
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k11',
    name: 'Akshay Wadkar',
    team: 'Vidarbha',
    performance: {
      matches: 6,
      runs: 178,
      catches: 5,
      stumpings: 2,
      battingAverage: 35.60,
      strikeRate: 130.88
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k12',
    name: 'Kumar Kushagra',
    team: 'Jharkhand',
    performance: {
      matches: 7,
      runs: 205,
      catches: 6,
      stumpings: 1,
      battingAverage: 41.00,
      strikeRate: 138.51
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k13',
    name: 'Nikhil Naik',
    team: 'Maharashtra',
    performance: {
      matches: 6,
      runs: 168,
      catches: 5,
      stumpings: 2,
      battingAverage: 33.60,
      strikeRate: 133.33
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k14',
    name: 'Vishnu Vinod',
    team: 'Kerala',
    performance: {
      matches: 7,
      runs: 188,
      catches: 6,
      stumpings: 1,
      battingAverage: 37.60,
      strikeRate: 134.28
    },
    category: PlayerCategory.KEEPER
  },
  {
    id: 'k15',
    name: 'Ankush Bains',
    team: 'Himachal Pradesh',
    performance: {
      matches: 6,
      runs: 175,
      catches: 5,
      stumpings: 2,
      battingAverage: 35.00,
      strikeRate: 131.57
    },
    category: PlayerCategory.KEEPER
  },
  // Opening Batters (15 players)
  {
    id: 'ob1',
    name: 'Ruturaj Gaikwad',
    team: 'Maharashtra',
    performance: {
      matches: 6,
      runs: 403,
      battingAverage: 80.60,
      strikeRate: 159.28
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob2',
    name: 'Abhishek Sharma',
    team: 'Punjab',
    performance: {
      matches: 7,
      runs: 374,
      battingAverage: 53.42,
      strikeRate: 156.48
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob3',
    name: 'Prithvi Shaw',
    team: 'Mumbai',
    performance: {
      matches: 6,
      runs: 332,
      battingAverage: 55.33,
      strikeRate: 181.42
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob4',
    name: 'Mayank Agarwal',
    team: 'Karnataka',
    performance: {
      matches: 7,
      runs: 292,
      battingAverage: 48.66,
      strikeRate: 152.08
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob5',
    name: 'Shubman Gill',
    team: 'Punjab',
    performance: {
      matches: 5,
      runs: 284,
      battingAverage: 56.80,
      strikeRate: 146.39
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob6',
    name: 'Devdutt Padikkal',
    team: 'Karnataka',
    performance: {
      matches: 7,
      runs: 312,
      battingAverage: 52.00,
      strikeRate: 153.94
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob7',
    name: 'Yashasvi Jaiswal',
    team: 'Mumbai',
    performance: {
      matches: 6,
      runs: 342,
      battingAverage: 57.00,
      strikeRate: 162.85
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob8',
    name: 'Venkatesh Iyer',
    team: 'Madhya Pradesh',
    performance: {
      matches: 7,
      runs: 278,
      battingAverage: 46.33,
      strikeRate: 148.66
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob9',
    name: 'Manan Vohra',
    team: 'Chandigarh',
    performance: {
      matches: 7,
      runs: 265,
      battingAverage: 44.16,
      strikeRate: 142.47
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob10',
    name: 'Rohan Kunnummal',
    team: 'Kerala',
    performance: {
      matches: 6,
      runs: 248,
      battingAverage: 49.60,
      strikeRate: 157.96
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob11',
    name: 'Priyank Panchal',
    team: 'Gujarat',
    performance: {
      matches: 7,
      runs: 255,
      battingAverage: 42.50,
      strikeRate: 138.58
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob12',
    name: 'Hiten Dalal',
    team: 'Delhi',
    performance: {
      matches: 6,
      runs: 235,
      battingAverage: 47.00,
      strikeRate: 144.17
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob13',
    name: 'Swapnil Asnodkar',
    team: 'Goa',
    performance: {
      matches: 7,
      runs: 242,
      battingAverage: 40.33,
      strikeRate: 136.72
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob14',
    name: 'Lakshay Thareja',
    team: 'Delhi',
    performance: {
      matches: 6,
      runs: 228,
      battingAverage: 45.60,
      strikeRate: 141.61
    },
    category: PlayerCategory.OPENING_BATTER
  },
  {
    id: 'ob15',
    name: 'Vishnu Solanki',
    team: 'Baroda',
    performance: {
      matches: 7,
      runs: 245,
      battingAverage: 40.83,
      strikeRate: 138.42
    },
    category: PlayerCategory.OPENING_BATTER
  },
  // Spinner Allrounders (15 players)
  {
    id: 'sa1',
    name: 'Washington Sundar',
    team: 'Tamil Nadu',
    performance: {
      matches: 7,
      runs: 156,
      wickets: 12,
      battingAverage: 39.00,
      bowlingAverage: 18.42,
      economy: 6.82,
      strikeRate: 138.66
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa2',
    name: 'Krunal Pandya',
    team: 'Baroda',
    performance: {
      matches: 6,
      runs: 198,
      wickets: 10,
      battingAverage: 49.50,
      bowlingAverage: 19.80,
      economy: 7.12,
      strikeRate: 145.58
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa3',
    name: 'K Gowtham',
    team: 'Karnataka',
    performance: {
      matches: 7,
      runs: 134,
      wickets: 11,
      battingAverage: 33.50,
      bowlingAverage: 20.45,
      economy: 7.24,
      strikeRate: 158.33
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa4',
    name: 'Axar Patel',
    team: 'Gujarat',
    performance: {
      matches: 6,
      runs: 185,
      wickets: 9,
      battingAverage: 46.25,
      bowlingAverage: 21.33,
      economy: 6.94,
      strikeRate: 142.30
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa5',
    name: 'Rahul Tewatia',
    team: 'Haryana',
    performance: {
      matches: 7,
      runs: 168,
      wickets: 8,
      battingAverage: 42.00,
      bowlingAverage: 23.50,
      economy: 7.45,
      strikeRate: 151.35
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa6',
    name: 'Shreyas Gopal',
    team: 'Karnataka',
    performance: {
      matches: 6,
      runs: 142,
      wickets: 9,
      battingAverage: 35.50,
      bowlingAverage: 22.11,
      economy: 7.15,
      strikeRate: 132.71
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  {
    id: 'sa7',
    name: 'Parth Bhut',
    team: 'Saurashtra',
    performance: {
      matches: 7,
      runs: 156,
      wickets: 8,
      battingAverage: 39.00,
      bowlingAverage: 23.75,
      economy: 7.28,
      strikeRate: 136.84
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.SPINNER_ALLROUNDER
  },
  // Fast Bowling Allrounders (15 players)
  {
    id: 'fa1',
    name: 'Venkatesh Iyer',
    team: 'Madhya Pradesh',
    performance: {
      matches: 7,
      runs: 236,
      wickets: 8,
      battingAverage: 47.20,
      bowlingAverage: 22.75,
      economy: 7.82,
      strikeRate: 142.16
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa2',
    name: 'Vijay Shankar',
    team: 'Tamil Nadu',
    performance: {
      matches: 8,
      runs: 198,
      wickets: 7,
      battingAverage: 39.60,
      bowlingAverage: 24.14,
      economy: 7.92,
      strikeRate: 136.55
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa3',
    name: 'Shivam Dube',
    team: 'Mumbai',
    performance: {
      matches: 6,
      runs: 186,
      wickets: 6,
      battingAverage: 46.50,
      bowlingAverage: 26.33,
      economy: 8.12,
      strikeRate: 155.00
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa4',
    name: 'Rahul Tewatia',
    team: 'Haryana',
    performance: {
      matches: 7,
      runs: 195,
      wickets: 7,
      battingAverage: 48.75,
      bowlingAverage: 25.14,
      economy: 8.05,
      strikeRate: 147.72
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa5',
    name: 'Deepak Hooda',
    team: 'Rajasthan',
    performance: {
      matches: 6,
      runs: 178,
      wickets: 6,
      battingAverage: 44.50,
      bowlingAverage: 27.33,
      economy: 8.24,
      strikeRate: 144.71
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa6',
    name: 'Ripal Patel',
    team: 'Gujarat',
    performance: {
      matches: 7,
      runs: 165,
      wickets: 7,
      battingAverage: 41.25,
      bowlingAverage: 26.14,
      economy: 8.15,
      strikeRate: 143.47
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa7',
    name: 'Raj Angad Bawa',
    team: 'Chandigarh',
    performance: {
      matches: 6,
      runs: 158,
      wickets: 6,
      battingAverage: 39.50,
      bowlingAverage: 27.83,
      economy: 8.35,
      strikeRate: 138.59
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  {
    id: 'fa8',
    name: 'Atit Sheth',
    team: 'Baroda',
    performance: {
      matches: 7,
      runs: 145,
      wickets: 8,
      battingAverage: 36.25,
      bowlingAverage: 24.75,
      economy: 7.95,
      strikeRate: 135.51
    },
    category: PlayerCategory.ALLROUNDER,
    subCategory: PlayerSubCategory.FAST_BOWLING_ALLROUNDER
  },
  // Spinners (15 players)
  {
    id: 's1',
    name: 'Ravi Bishnoi',
    team: 'Rajasthan',
    performance: {
      matches: 7,
      wickets: 16,
      bowlingAverage: 13.25,
      economy: 6.45
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's2',
    name: 'R Sai Kishore',
    team: 'Tamil Nadu',
    performance: {
      matches: 8,
      wickets: 15,
      bowlingAverage: 14.60,
      economy: 6.32
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's3',
    name: 'Rahul Chahar',
    team: 'Rajasthan',
    performance: {
      matches: 7,
      wickets: 14,
      bowlingAverage: 15.93,
      economy: 6.82
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's4',
    name: 'Mayank Markande',
    team: 'Punjab',
    performance: {
      matches: 7,
      wickets: 13,
      bowlingAverage: 16.46,
      economy: 7.04
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's5',
    name: 'Shreyas Gopal',
    team: 'Karnataka',
    performance: {
      matches: 7,
      wickets: 12,
      bowlingAverage: 17.25,
      economy: 7.15
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's6',
    name: 'Pardeep Sahu',
    team: 'Haryana',
    performance: {
      matches: 6,
      wickets: 11,
      bowlingAverage: 18.36,
      economy: 7.28
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  {
    id: 's7',
    name: 'Satyajeet Bachhav',
    team: 'Maharashtra',
    performance: {
      matches: 7,
      wickets: 10,
      bowlingAverage: 19.40,
      economy: 7.35
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.SPINNER
  },
  // Fast Bowlers (15 players)
  {
    id: 'fb1',
    name: 'Mohit Sharma',
    team: 'Haryana',
    performance: {
      matches: 7,
      wickets: 16,
      bowlingAverage: 14.18,
      economy: 6.92
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb2',
    name: 'Arshdeep Singh',
    team: 'Punjab',
    performance: {
      matches: 6,
      wickets: 14,
      bowlingAverage: 15.42,
      economy: 7.12
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb3',
    name: 'Avesh Khan',
    team: 'Madhya Pradesh',
    performance: {
      matches: 7,
      wickets: 13,
      bowlingAverage: 16.84,
      economy: 7.24
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb4',
    name: 'Harshal Patel',
    team: 'Haryana',
    performance: {
      matches: 7,
      wickets: 12,
      bowlingAverage: 17.33,
      economy: 7.45
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb5',
    name: 'Siddarth Kaul',
    team: 'Punjab',
    performance: {
      matches: 7,
      wickets: 11,
      bowlingAverage: 18.54,
      economy: 7.68
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb6',
    name: 'Umesh Yadav',
    team: 'Vidarbha',
    performance: {
      matches: 6,
      wickets: 11,
      bowlingAverage: 18.72,
      economy: 7.85
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb7',
    name: 'Basil Thampi',
    team: 'Kerala',
    performance: {
      matches: 7,
      wickets: 10,
      bowlingAverage: 19.90,
      economy: 8.12
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  },
  {
    id: 'fb8',
    name: 'Lukman Meriwala',
    team: 'Baroda',
    performance: {
      matches: 6,
      wickets: 9,
      bowlingAverage: 20.44,
      economy: 7.92
    },
    category: PlayerCategory.BOWLER,
    subCategory: PlayerSubCategory.FAST_BOWLER
  }
]; 