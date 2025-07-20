# CSV Data Integration

This project now supports dynamic loading of player data from CSV files with automatic updates.

## Features

- **Dynamic Data Loading**: Loads player data from CSV files instead of static data
- **Automatic Updates**: Checks for CSV updates every 5 minutes
- **Manual Refresh**: Users can manually refresh data using the refresh button
- **Fallback Support**: Falls back to static data if CSV loading fails
- **Real-time Sync**: CSV file changes are automatically detected and loaded

## CSV File Format

The CSV file should have the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| No. | Player number | 1 |
| Player | Player name | Jagjit Singh |
| Team | Team name | CG |
| Wickets | Wickets taken | 18 |
| Mat | Matches played | 7 |
| Inns | Innings | 7 |
| Avg | Batting average | 12.72 |
| SR | Strike rate | 9 |
| ER | Economy rate | 8.48 |
| Runs | Runs scored | 0 |
| Role | Player role | Batting All-Rounder |

## Setup

1. **Place your CSV file** at: `C:\Users\VASUDEV UTTHARAHALLI\OneDrive\Desktop\Domestic_Cricketers_Stats_With_Roles_Final1.csv`

2. **Start the sync service** (optional):
   ```bash
   npm run sync-csv
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

## How It Works

1. **Data Service**: The `PlayerDataService` manages data loading and updates
2. **CSV Parser**: Converts CSV data to the application's format
3. **Category Mapping**: Automatically categorizes players based on their role
4. **Real-time Updates**: The app subscribes to data changes and updates automatically

## Player Categories

The system automatically categorizes players based on their role:

- **Wicketkeeper**: Players with "wicketkeeper" or "keeper" in their role
- **Batsman**: Players with "batsman" or "bat" in their role
- **All-rounder**: Players with "all-rounder" or "allrounder" in their role
  - Spinner All-rounder: If role includes "spin", "orthodox", "leg", or "offbreak"
  - Fast Bowling All-rounder: Otherwise
- **Bowler**: Players with "bowler" or "bowling" in their role
  - Spinner: If role includes spin-related terms
  - Fast Bowler: Otherwise

## Automatic Updates

- **Every 5 minutes**: The app automatically checks for CSV updates
- **Manual refresh**: Users can click the refresh button to force an update
- **Last update time**: Shows when the data was last updated

## Error Handling

- If CSV loading fails, the app falls back to static data
- Error messages are displayed to users
- Loading states are shown during data refresh

## File Locations

- **Source CSV**: `C:\Users\VASUDEV UTTHARAHALLI\OneDrive\Desktop\Domestic_Cricketers_Stats_With_Roles_Final1.csv`
- **App CSV**: `public/players.csv`
- **Sync Script**: `scripts/sync-csv.js`

## Troubleshooting

1. **CSV not loading**: Check if the source file exists and is accessible
2. **Wrong categories**: Verify the "Role" column contains appropriate role descriptions
3. **No updates**: Ensure the sync service is running or manually refresh
4. **Performance issues**: The app automatically limits updates to prevent excessive API calls 