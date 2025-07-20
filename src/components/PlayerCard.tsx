import React, { useEffect } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { Player, PlayerCategory } from '../types';
import { motion } from 'framer-motion';

function parseHandAndType(role: string) {
  // Example roles: "Bowler (Left-arm wrist spin)", "All-Rounder (Right-arm medium-fast)", "Batsman (Right-hand bat)"
  let battingHand = '';
  let bowlingHand = '';
  let type = '';
  let raw = role.toLowerCase();
  
  // Extract bowling hand
  if (raw.includes('left-arm')) bowlingHand = 'Left';
  if (raw.includes('right-arm')) bowlingHand = 'Right';
  
  // Extract batting hand
  if (raw.includes('left-hand bat')) battingHand = 'Left';
  if (raw.includes('right-hand bat')) battingHand = 'Right';
  
  // Extract type
  if (raw.includes('bat')) type = 'Batsman';
  if (raw.includes('keeper')) type = 'Keeper';
  if (raw.includes('spin')) type = 'Spinner';
  if (raw.includes('orthodox')) type = 'Spinner (Orthodox)';
  if (raw.includes('leg')) type = 'Spinner (Leg)';
  if (raw.includes('offbreak')) type = 'Spinner (Offbreak)';
  if (raw.includes('fast')) type = 'Fast Bowler';
  if (raw.includes('medium')) type = 'Medium Bowler';
  if (raw.includes('wrist')) type = 'Spinner (Wrist)';
  if (raw.includes('all-rounder')) type = 'All-Rounder';
  
  return { battingHand, bowlingHand, type };
}

interface PlayerCardProps {
  player: Player;
}

const flipVariants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      duration: 0.7,
    },
  },
  exit: { rotateY: 90, opacity: 0, transition: { duration: 0.4 } },
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Play sound effect when card opens
  useEffect(() => {
    const playSwishSound = () => {
      try {
        // Create audio context for swish sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create swish sound effect
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log('Audio not supported or blocked');
      }
    };
    
    playSwishSound();
  }, []);

  // Find the original CSV row for extra stats if available
  const role = (player as any).role || player.subCategory || '';
  const csvStats = (player as any).csvStats || {};
  const { battingHand, bowlingHand, type } = parseHandAndType(role || '');

  // Try to get extra stats from performance or csvStats
  const getStat = (key: string) => {
    if (player.performance && player.performance[key as keyof typeof player.performance] !== undefined) {
      return player.performance[key as keyof typeof player.performance];
    }
    if (csvStats && csvStats[key] !== undefined) {
      return csvStats[key];
    }
    return '-';
  };

  return (
    <motion.div
      variants={flipVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ perspective: 1200 }}
    >
      <Paper
        elevation={8}
        sx={{
          minWidth: 320,
          maxWidth: 340,
          borderRadius: 4,
          p: 3,
          background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1, mb: 1 }}>
            {player.name}
          </Typography>
          <Chip label={player.team} color="primary" sx={{ mb: 1 }} />
          <Typography variant="subtitle1" sx={{ color: '#00ff9f', mb: 1 }}>
            {role}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {player.category === PlayerCategory.BOWLER && (
            <>
              <Typography variant="body1">
                <b>Bowling Hand:</b> {bowlingHand || '-'}
              </Typography>
              <Typography variant="body1">
                <b>Type:</b> {type || '-'}
              </Typography>
              <Typography variant="body1">
                <b>5W+:</b> {getStat('5W+')}
              </Typography>
              <Typography variant="body1">
                <b>3W+:</b> {getStat('3W+')}
              </Typography>
            </>
          )}
          {(player.category === PlayerCategory.OPENING_BATTER || player.category === PlayerCategory.KEEPER) && (
            <>
              {battingHand && (
                <Typography variant="body1">
                  <b>Batting Hand:</b> {battingHand}
                </Typography>
              )}
              <Typography variant="body1">
                <b>100s:</b> {getStat('100')}
              </Typography>
              <Typography variant="body1">
                <b>50s:</b> {getStat('50')}
              </Typography>
              <Typography variant="body1">
                <b>4s:</b> {getStat('4s')}
              </Typography>
              <Typography variant="body1">
                <b>6s:</b> {getStat('6s')}
              </Typography>
            </>
          )}
          {player.category === PlayerCategory.ALLROUNDER && (
            <>
              {battingHand && (
                <Typography variant="body1">
                  <b>Batting Hand:</b> {battingHand}
                </Typography>
              )}
              <Typography variant="body1">
                <b>Type:</b> {type || '-'}
              </Typography>
              <Typography variant="body1">
                <b>100s:</b> {getStat('100')}
              </Typography>
              <Typography variant="body1">
                <b>50s:</b> {getStat('50')}
              </Typography>
              <Typography variant="body1">
                <b>4s:</b> {getStat('4s')}
              </Typography>
              <Typography variant="body1">
                <b>6s:</b> {getStat('6s')}
              </Typography>
              <Typography variant="body1">
                <b>5W+:</b> {getStat('5W+')}
              </Typography>
              <Typography variant="body1">
                <b>3W+:</b> {getStat('3W+')}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default PlayerCard; 