import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const FlashSaleTimerBlock = ({ time }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderRadius: '12px',
        p: { xs: 0.5, sm: 1 },
        minWidth: { xs: '40px', sm: '46px', lg: '50px' },
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={800}
        sx={{
          color: '#ef4444',
          lineHeight: 1,
          fontSize: { xs: '1rem', sm: '1.1rem', lg: '1.25rem' }
        }}
      >
        {time.value}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: '#9ca3af',
          fontSize: { xs: '0.45rem', sm: '0.5rem', lg: '0.55rem' },
          fontWeight: 700,
          display: 'block',
          mt: 0.5,
        }}
      >
        {time.label}
      </Typography>
    </Paper>
  );
};

export default FlashSaleTimerBlock;
