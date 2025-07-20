const fs = require('fs');
const path = require('path');

const sourcePath = 'C:\\Users\\VASUDEV UTTHARAHALLI\\OneDrive\\Desktop\\Domestic_Cricketers_Stats_With_Roles_Final1.csv';
const targetPath = path.join(__dirname, '..', 'public', 'players.csv');

function syncCSV() {
  try {
    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.log('Source CSV file not found. Skipping sync.');
      return;
    }

    // Read source file
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to target location
    fs.writeFileSync(targetPath, sourceContent, 'utf8');
    
    console.log(`CSV file synced successfully at ${new Date().toLocaleString()}`);
    console.log(`Source: ${sourcePath}`);
    console.log(`Target: ${targetPath}`);
  } catch (error) {
    console.error('Error syncing CSV file:', error);
  }
}

// Run sync immediately
syncCSV();

// Set up periodic sync (every 30 seconds)
setInterval(syncCSV, 30000);

console.log('CSV sync service started. Monitoring for changes...'); 