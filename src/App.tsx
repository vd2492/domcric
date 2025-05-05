import React, { useState } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { players } from './data/players';
import { Player, PlayerCategory, PlayerSubCategory } from './types';

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
        { id: 'catches', label: 'Catches', minWidth: 90 },
        { id: 'stumpings', label: 'Stumpings', minWidth: 90 },
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

    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              {columns.map((column) => (
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
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.team}</TableCell>
                <TableCell>{player.performance.matches}</TableCell>
                {selectedCategory === PlayerCategory.KEEPER && (
                  <>
                    <TableCell>{player.performance.runs}</TableCell>
                    <TableCell>{player.performance.battingAverage}</TableCell>
                    <TableCell>{player.performance.strikeRate}</TableCell>
                    <TableCell>{player.performance.catches}</TableCell>
                    <TableCell>{player.performance.stumpings}</TableCell>
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
                  <Typography variant="h6">
                    Selected Players: {selectedPlayers.size}/11
                  </Typography>
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
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
      </Container>
    </ThemeProvider>
  );
};

export default App; 