import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import VoucherCard from './VoucherCard';

const ClaimYourVoucherBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#f5eaff',
        borderRadius: '24px',
        p: { xs: 2, sm: 3, lg: 4 },
        height: '100%',
        width: '100%',
        minWidth: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'visible', 
        boxSizing: 'border-box'
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, justifyContent: 'space-between', mb: { xs: 2, sm: 3 }, position: 'relative' }}>
        <Box sx={{ maxWidth: { xs: '100%', sm: '55%' }, zIndex: 2 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#6d28d9', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem', lg: '2.125rem' } }}>
            Claim Your Voucher
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
            Unlock exclusive savings on your favorite products!
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #9333ea 0%, #c084fc 100%)',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              px: { xs: 2, sm: 3 },
              py: { xs: 0.5, sm: 1 },
              boxShadow: '0 4px 14px 0 rgba(147, 51, 234, 0.4)',
            }}
          >
            Claim All Vouchers &gt;
          </Button>
        </Box>
        
        {/* Gift Box image */}
        <Box sx={{ 
          position: { xs: 'relative', sm: 'absolute' }, 
          top: { xs: 0, sm: -10, lg: -20 }, 
          right: { xs: 0, sm: -10, lg: -20 }, 
          width: { xs: '100%', sm: '45%' }, 
          height: { xs: '150px', sm: '160px', lg: '200px' },
          backgroundImage: 'url("https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
          zIndex: 1,
          mb: { xs: 2, sm: 0 }
        }} />
      </Box>

      {/* Bottom Section - Cards */}
      <Grid container spacing={1.5} sx={{ zIndex: 2, position: 'relative' }}>
        {[10, 15, 20, 25].map((percent, idx) => (
          <Grid item xs={6} sm={3} key={idx}>
            <VoucherCard percent={percent} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ClaimYourVoucherBanner;
