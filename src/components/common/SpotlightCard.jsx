import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SpotlightCard({ banner, heightStyle, isLarge = false }) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#f5f5f5',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        ...heightStyle,
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.14)',
        },
        '&:hover .spotlight-card-bg': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Full-Bleed Studio Photo Background Image */}
      <Box
        component="img"
        className="spotlight-card-bg"
        src={banner.image}
        alt={banner.title}
        loading="lazy"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 2.5, sm: 3, md: isLarge ? 4 : 3, lg: isLarge ? 5 : 3.5, xl: isLarge ? 6 : 4 },
          maxWidth: { xs: '85%', sm: '75%', md: isLarge ? '70%' : '65%' },
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: isLarge
              ? { xs: '1.45rem', sm: '1.8rem', md: '2.1rem', lg: '2.4rem', xl: '2.7rem' }
              : { xs: '1.2rem', sm: '1.35rem', md: '1.5rem', lg: '1.7rem', xl: '1.9rem' },
            lineHeight: 1.15,
            color: banner.textColor || '#111111',
            mb: { xs: 1.5, sm: 2, md: 2.5 },
            whiteSpace: 'pre-line',
          }}
        >
          {banner.title}
        </Typography>

        <Button
          component={Link}
          to={banner.link || '/products'}
          variant="contained"
          sx={{
            bgcolor: '#111111',
            color: '#FFFFFF',
            px: { xs: 2.5, md: 3.5 },
            py: { xs: 0.8, md: 1 },
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
            width: 'fit-content',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              bgcolor: '#333333',
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.25s ease',
          }}
        >
          {banner.btnLabel || 'Shop Now'}
        </Button>
      </Box>
    </Box>
  );
}
