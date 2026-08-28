import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import FlashSaleTimerBlock from './FlashSaleTimerBlock';

const FlashSaleBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#ffe5e5',
        borderRadius: '24px',
        height: '100%',
        width: '100%',
        minWidth: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'hidden',
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}
    >
      {/* Left — Text Content */}
      <Box
        sx={{
          flex: { xs: '1 1 auto', sm: '0 0 50%' },
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 2, sm: 3, lg: 4 },
          boxSizing: 'border-box',
          zIndex: 2,
        }}
      >
        {/* FLASH SALE heading */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Bolt
            sx={{
              color: '#f97316',
              mr: 0.5,
              fontSize: { xs: 20, sm: 24, lg: 28 },
            }}
          />

          <Typography
            variant="h4"
            fontWeight={800}
            fontStyle="italic"
            sx={{
              color: '#1f2937',
              letterSpacing: '-1px',
              fontSize: { xs: '1.5rem', sm: '1.75rem', lg: '2.125rem' }
            }}
          >
            FLASH
          </Typography>
        </Box>

        <Typography
          variant="h3"
          fontWeight={800}
          fontStyle="italic"
          sx={{
            color: '#ef4444',
            mb: 1.5,
            letterSpacing: '-1px',
            lineHeight: 1,
            fontSize: { xs: '2rem', sm: '2.25rem', lg: '3rem' }
          }}
        >
          SALE
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight={800}
          sx={{ color: '#1f2937', fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          Limited time offer
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#6b7280',
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '0.75rem', sm: '0.85rem' }
          }}
        >
          Grab before it's gone!
        </Typography>

        {/* Timer */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mb: { xs: 3, sm: 4 },
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '02', label: 'DAYS' },
            { value: '18', label: 'HRS' },
            { value: '34', label: 'MINS' },
            { value: '56', label: 'SECS' },
          ].map((time, idx) => (
            <FlashSaleTimerBlock key={idx} time={time} />
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ef4444',
            borderRadius: '24px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            alignSelf: 'flex-start',
            boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.4)',
            '&:hover': {
              backgroundColor: '#dc2626',
            },
          }}
        >
          Shop All Deals →
        </Button>
      </Box>

      {/* Right — Image */}
      <Box
        sx={{
          flex: { xs: '0 0 250px', sm: '1 1 50%' },
          minWidth: 0,
          position: 'relative',
          overflow: 'hidden',
          mt: { xs: -2, sm: 0 }
        }}
      >
        <Box
          component="img"
          // Clean white background image from unsplash
          src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
          alt="Flash Sale Products"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: { xs: 'center', sm: 'right center' },
            // mixBlendMode multiply makes the white background disappear
            mixBlendMode: 'multiply',
            p: 2
          }}
        />
      </Box>
    </Paper>
  );
};

export default FlashSaleBanner;