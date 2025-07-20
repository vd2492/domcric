import { Player } from '../types';
import { loadCSVData } from '../utils/csvParser';
import { players as staticPlayers } from '../data/players';

class PlayerDataService {
  private players: Player[] = [];
  private lastUpdateTime: number = 0;
  private updateInterval: number = 5 * 60 * 1000; // 5 minutes
  private listeners: ((players: Player[]) => void)[] = [];

  constructor() {
    this.loadData();
    // Set up periodic updates
    setInterval(() => {
      this.loadData();
    }, this.updateInterval);
  }

  private async loadData() {
    try {
      // Try to load CSV data first
      const csvPlayers = await loadCSVData();
      if (csvPlayers.length > 0) {
        this.players = csvPlayers;
        console.log(`Loaded ${csvPlayers.length} players from CSV`);
      } else {
        // Fallback to static data
        this.players = staticPlayers;
        console.log(`Loaded ${staticPlayers.length} players from static data`);
      }
      this.lastUpdateTime = Date.now();
      this.notifyListeners();
    } catch (error) {
      console.error('Error loading player data:', error);
      // Fallback to static data
      this.players = staticPlayers;
      this.notifyListeners();
    }
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getPlayersByCategory(category: string): Player[] {
    return this.players.filter(player => player.category === category);
  }

  public getLastUpdateTime(): number {
    return this.lastUpdateTime;
  }

  public forceRefresh(): Promise<void> {
    return this.loadData();
  }

  public subscribe(listener: (players: Player[]) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.players));
  }
}

// Create singleton instance
export const playerDataService = new PlayerDataService(); 