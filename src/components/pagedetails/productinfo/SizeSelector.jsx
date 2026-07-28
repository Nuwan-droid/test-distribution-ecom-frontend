import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const STANDARD_FOUR_SIZES = [
  { size: 'XS', stock: 15 },
  { size: 'SM', stock: 25 },
  { size: 'LG', stock: 20 },
  { size: 'XL', stock: 12 }
];

export default function SizeSelector({ product, selectedSize, onSelectSize }) {
  const isApparelOrHasSizes = product.category === 'Women fashion' ||
                              product.category === 'Women' ||
                              product.category === 'Fashion' ||
                              product.category === 'Men' ||
                              (product.sizes && product.sizes.length > 0);

  if (!isApparelOrHasSizes) return null;

  return (
    <Box sx={{ mb: { xs: 2.5, md: 3 }, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body1" sx={{ fontWeight: 700, color: '#111' }}>
        Size :
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {STANDARD_FOUR_SIZES.map(s => {
          const isSelected = selectedSize?.size === s.size;
          return (
            <Button
              key={s.size}
              variant="outlined"
              disabled={s.stock === 0}
              onClick={() => onSelectSize(s)}
              sx={{
                borderColor: isSelected ? '#111' : '#ccc',
                color: isSelected ? '#fff' : '#111',
                bgcolor: isSelected ? '#111' : 'transparent',
                minWidth: 52,
                height: 40,
                px: 2,
                borderRadius: 1,
                fontWeight: 700,
                fontSize: '0.875rem',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#111',
                  bgcolor: isSelected ? '#111' : '#f5f5f5',
                }
              }}
            >
              {s.size}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
