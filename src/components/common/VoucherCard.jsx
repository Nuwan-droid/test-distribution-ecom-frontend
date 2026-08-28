import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const VoucherCard = ({ percent }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        p: { xs: 1, sm: 1.5 },
        textAlign: 'center',
        position: 'relative',
        border: '1px solid #ede9fe',
        boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Floating % Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
          backgroundColor: '#8b5cf6',
          color: 'white',
          borderRadius: '50%',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          boxShadow: '0 2px 8px rgba(139, 92, 246, 0.5)'
        }}
      >
        %
      </Box>

      <Typography variant="h5" fontWeight={800} sx={{ color: '#6d28d9', lineHeight: 1, mt: 1 }}>
        {percent}<span style={{ fontSize: '1rem' }}>%</span>
      </Typography>
      <Typography variant="caption" sx={{ color: '#8b5cf6', fontWeight: 800, display: 'block', mb: 0.5, fontSize: '0.7rem' }}>
        OFF
      </Typography>

      <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', fontSize: '0.6rem' }}>
        Min. spend $50
      </Typography>
      <Typography variant="caption" sx={{ color: '#8b5cf6', display: 'block', mb: 1, fontSize: '0.65rem', fontWeight: 700 }}>
        Code: SAVE{percent}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#8b5cf6',
          borderRadius: '10px',
          textTransform: 'none',
          fontSize: '0.75rem',
          fontWeight: 700,
          py: 0.3,
          boxShadow: 'none',
          mt: 'auto',
          '&:hover': { backgroundColor: '#7c3aed', boxShadow: 'none' }
        }}
      >
        Claim
      </Button>
      <Typography variant="caption" sx={{ color: '#d1d5db', display: 'block', mt: 0.5, fontSize: '0.5rem' }}>
        Valid till 31 May 2025
      </Typography>
    </Paper>
  );
};

export default VoucherCard;
