import React from 'react';
import { Box, Typography } from '@mui/material';

export default function SubcategoryBanner({ title, subtitle, image }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 300, md: 400 },
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        mb: 2
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.6)'
        }}
      />
      <Box sx={{ position: 'relative', textAlign: 'center', color: '#fff', zIndex: 1, px: 2 }}>
        <Typography variant="h2" fontWeight={800} sx={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: { xs: '2rem', md: '3.5rem' }, mb: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" sx={{ letterSpacing: 3, fontWeight: 500, textTransform: 'uppercase' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
