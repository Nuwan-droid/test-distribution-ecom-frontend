// src/components/Banner.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import products from '../data/products';

/**
 * Full‑width banner component.
 * Renders each promotional item (image + overlay text) as a hero section.
 * The overlay is positioned on top of the image and centered vertically.
 * Adjust heights or paddings via the `height` prop if needed.
 */
const Banner = ({ height = 400 }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {products.map((item) => (
        <Box
          key={item.id}
          sx={{
            position: 'relative',
            width: '100%',
            height,
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb: 4,
          }}
        >
          {/* Dark overlay for readability */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}
          />
          {/* Content overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              px: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={800} gutterBottom>
              {item.title}
            </Typography>
            {item.subtitle && (
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {item.subtitle}
              </Typography>
            )}
            <Button
              component={Link}
              to={item.link || '/'}
              variant="contained"
              sx={{ bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              {item.cta}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Banner;
