import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Fab,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import { Player, PlayerCategory, PlayerSubCategory } from './types';
import { playerDataService } from './services/playerDataService';
import PlayerCard from './components/PlayerCard';
import ExportDialog from './components/ExportDialog';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff9f',
    },
    secondary: {
      main: '#ff00ff',
    },
    background: {
      default: '#0a1929',
      paper: '#132f4c',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(19, 47, 76, 0.9)',
        },
      },
    },
  },
});

const getColumnsByCategory = (category: PlayerCategory) => {
  const commonColumns = [
    { id: 'name', label: 'Player Name', minWidth: 170 },
    { id: 'team', label: 'Team', minWidth: 130 },
    { id: 'matches', label: 'Matches', minWidth: 90 },
  ];

  switch (category) {
    case PlayerCategory.KEEPER:
      return [
        ...commonColumns,
        { id: 'runs', label: 'Runs', minWidth: 90 },
        { id: 'battingAverage', label: 'Batting Avg', minWidth: 100 },
        { id: 'strikeRate', label: 'Strike Rate', minWidth: 100 },
      ];
    case PlayerCategory.OPENING_BATTER:
      return [
        ...commonColumns,
        { id: 'runs', label: 'Runs', minWidth: 90 },
        { id: 'battingAverage', label: 'Batting Avg', minWidth: 100 },
        { id: 'strikeRate', label: 'Strike Rate', minWidth: 100 },
      ];
    case PlayerCategory.ALLROUNDER:
      return [
        ...commonColumns,
        { id: 'runs', label: 'Runs', minWidth: 90 },
        { id: 'battingAverage', label: 'Batting Avg', minWidth: 100 },
        { id: 'strikeRate', label: 'Strike Rate', minWidth: 100 },
        { id: 'wickets', label: 'Wickets', minWidth: 90 },
        { id: 'bowlingAverage', label: 'Bowling Avg', minWidth: 100 },
        { id: 'economy', label: 'Economy', minWidth: 90 },
      ];
    case PlayerCategory.BOWLER:
      return [
        ...commonColumns,
        { id: 'wickets', label: 'Wickets', minWidth: 90 },
        { id: 'bowlingAverage', label: 'Bowling Avg', minWidth: 100 },
        { id: 'economy', label: 'Economy', minWidth: 90 },
      ];
    default:
      return commonColumns;
  }
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PlayerCategory>(
    PlayerCategory.KEEPER
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    PlayerSubCategory | undefined
  >(undefined);
  const [selectedPlayers, setSelectedPlayers] = useState<Set<string>>(new Set());
  const [showFinal11, setShowFinal11] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [openPlayer, setOpenPlayer] = useState<Player | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);

  useEffect(() => {
    // Subscribe to data updates
    const unsubscribe = playerDataService.subscribe((updatedPlayers) => {
      setPlayers(updatedPlayers);
      setLastUpdate(playerDataService.getLastUpdateTime());
      setLoading(false);
      setError(null);
    });

    // Initial load
    const initialPlayers = playerDataService.getPlayers();
    if (initialPlayers.length > 0) {
      setPlayers(initialPlayers);
      setLastUpdate(playerDataService.getLastUpdateTime());
      setLoading(false);
    }

    return unsubscribe;
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await playerDataService.forceRefresh();
    } catch (err) {
      setError('Failed to refresh data');
      setLoading(false);
    }
  };

  const filteredPlayers = players
    .filter((player) => player.category === selectedCategory)
    .filter(
      (player) =>
        !selectedSubCategory || player.subCategory === selectedSubCategory
    )
    .sort((a, b) => {
      // Sort based on performance metrics
      if (selectedCategory === PlayerCategory.KEEPER) {
        return (b.performance.runs || 0) - (a.performance.runs || 0);
      } else if (selectedCategory === PlayerCategory.OPENING_BATTER) {
        return (b.performance.runs || 0) - (a.performance.runs || 0);
      } else if (selectedCategory === PlayerCategory.ALLROUNDER) {
        return (
          (b.performance.wickets || 0) + (b.performance.runs || 0) -
          (a.performance.wickets || 0) - (a.performance.runs || 0)
        );
      } else {
        return (b.performance.wickets || 0) - (a.performance.wickets || 0);
      }
    });

  const subCategories: Record<PlayerCategory, PlayerSubCategory[]> = {
    [PlayerCategory.KEEPER]: [],
    [PlayerCategory.OPENING_BATTER]: [],
    [PlayerCategory.ALLROUNDER]: [
      PlayerSubCategory.SPINNER_ALLROUNDER,
      PlayerSubCategory.FAST_BOWLING_ALLROUNDER,
    ],
    [PlayerCategory.BOWLER]: [
      PlayerSubCategory.SPINNER,
      PlayerSubCategory.FAST_BOWLER,
    ],
  };

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: PlayerCategory) => {
    setSelectedCategory(newValue);
    setSelectedSubCategory(undefined);
  };

  const handleSubCategoryChange = (subCategory: PlayerSubCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handlePlayerSelect = (playerId: string) => {
    const newSelected = new Set(selectedPlayers);
    if (newSelected.has(playerId)) {
      newSelected.delete(playerId);
    } else {
      if (newSelected.size < 11) {
        newSelected.add(playerId);
      } else {
        alert('You can only select 11 players!');
      }
    }
    setSelectedPlayers(newSelected);
  };

  const getSelectedPlayersList = () => {
    return players.filter((player) => selectedPlayers.has(player.id));
  };

  const renderPlayerTable = (playersList: Player[]) => {
    const columns = getColumnsByCategory(selectedCategory);

    // Remove 'catches' and 'stumpings' columns for keepers
    const filteredColumns =
      selectedCategory === PlayerCategory.KEEPER
        ? columns.filter(
            (col) => col.id !== 'catches' && col.id !== 'stumpings'
          )
        : columns;

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              {filteredColumns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {playersList.map((player) => (
              <TableRow
                hover
                key={player.id}
                component={motion.tr}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPlayers.has(player.id)}
                    onChange={() => handlePlayerSelect(player.id)}
                  />
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      cursor: 'pointer',
                      color: '#00ff9f',
                      textDecoration: 'underline',
                    }}
                    onClick={() => setOpenPlayer(player)}
                  >
                    {player.name}
                  </span>
                </TableCell>
                <TableCell>{player.team}</TableCell>
                <TableCell>{player.performance.matches}</TableCell>
                {selectedCategory === PlayerCategory.KEEPER && (
                  <>
                    <TableCell>{player.performance.runs}</TableCell>
                    <TableCell>{player.performance.battingAverage}</TableCell>
                    <TableCell>{player.performance.strikeRate}</TableCell>
                  </>
                )}
                {selectedCategory === PlayerCategory.OPENING_BATTER && (
                  <>
                    <TableCell>{player.performance.runs}</TableCell>
                    <TableCell>{player.performance.battingAverage}</TableCell>
                    <TableCell>{player.performance.strikeRate}</TableCell>
                  </>
                )}
                {selectedCategory === PlayerCategory.ALLROUNDER && (
                  <>
                    <TableCell>{player.performance.runs}</TableCell>
                    <TableCell>{player.performance.battingAverage}</TableCell>
                    <TableCell>{player.performance.strikeRate}</TableCell>
                    <TableCell>{player.performance.wickets}</TableCell>
                    <TableCell>{player.performance.bowlingAverage}</TableCell>
                    <TableCell>{player.performance.economy}</TableCell>
                  </>
                )}
                {selectedCategory === PlayerCategory.BOWLER && (
                  <>
                    <TableCell>{player.performance.wickets}</TableCell>
                    <TableCell>{player.performance.bowlingAverage}</TableCell>
                    <TableCell>{player.performance.economy}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderFinal11 = () => {
    const selectedList = getSelectedPlayersList();
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Final 11
        </Typography>
        {renderPlayerTable(selectedList)}
      </Box>
    );
  };

  const handleDeselectAll = () => {
    setSelectedPlayers(new Set());
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress size={60} />
            <Typography variant="h6">Loading player data...</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #00ff9f 30%, #ff00ff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Domestic Best XI
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!showFinal11 ? (
            <>
              <Paper
                sx={{
                  p: 2,
                  mb: 4,
                  background: 'rgba(19, 47, 76, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      Selected Players: {selectedPlayers.size}/11
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {new Date(lastUpdate).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={handleRefresh}
                      disabled={loading}
                    >
                      Refresh
                    </Button>
                    {selectedPlayers.size > 0 && (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<RestartAltIcon />}
                        onClick={handleDeselectAll}
                      >
                        Deselect All
                      </Button>
                    )}
                  </Box>
                </Box>

                <Tabs
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTab-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-selected': {
                        color: '#00ff9f',
                      },
                    },
                  }}
                >
                  <Tab label="Keepers" value={PlayerCategory.KEEPER} />
                  <Tab label="Opening Batters" value={PlayerCategory.OPENING_BATTER} />
                  <Tab label="Allrounders" value={PlayerCategory.ALLROUNDER} />
                  <Tab label="Bowlers" value={PlayerCategory.BOWLER} />
                </Tabs>

                {subCategories[selectedCategory] && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {subCategories[selectedCategory].map((subCategory: PlayerSubCategory) => (
                      <Chip
                        key={subCategory}
                        label={subCategory.replace(/_/g, ' ')}
                        onClick={() => handleSubCategoryChange(subCategory)}
                        color={selectedSubCategory === subCategory ? 'primary' : 'default'}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                )}
              </Paper>

              {renderPlayerTable(filteredPlayers)}

              <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 80, right: 16, zIndex: 1000 }}
                onClick={() => setShowFinal11(true)}
              >
                <SportsCricketIcon />
              </Fab>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Selected Players: {selectedPlayers.size}/11
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {selectedPlayers.size > 0 && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<RestartAltIcon />}
                      onClick={handleDeselectAll}
                    >
                      Deselect All
                    </Button>
                  )}
                  {selectedPlayers.size > 0 && (
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => setShowExportDialog(true)}
                      sx={{
                        background: 'linear-gradient(45deg, #00ff9f 30%, #00cc7f 90%)',
                        color: '#000',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00cc7f 30%, #00ff9f 90%)',
                        },
                      }}
                    >
                      Export Team
                    </Button>
                  )}
                  <Fab
                    color="primary"
                    variant="extended"
                    onClick={() => setShowFinal11(false)}
                  >
                    Back to Selection
                  </Fab>
                </Box>
              </Box>
              {renderFinal11()}
            </>
          )}
        </Box>
        <Dialog open={!!openPlayer} onClose={() => setOpenPlayer(null)} maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 0, background: 'none', boxShadow: 'none' } }}>
            <Box sx={{ position: 'relative', p: 0 }}>
              <IconButton
                aria-label="close"
                onClick={() => setOpenPlayer(null)}
                sx={{ position: 'absolute', right: 8, top: 8, color: '#fff', zIndex: 2 }}
              >
                <CloseIcon />
              </IconButton>
              {openPlayer && <PlayerCard player={openPlayer} />}
            </Box>
          </Dialog>
          
          <ExportDialog
            open={showExportDialog}
            onClose={() => setShowExportDialog(false)}
            players={getSelectedPlayersList()}
            teamName="Domestic Best XI"
          />
      </Container>
    </ThemeProvider>
  );
};

export default App; 