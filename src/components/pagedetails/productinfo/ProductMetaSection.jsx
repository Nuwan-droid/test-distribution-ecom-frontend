import React from 'react';
import { Box, Typography } from '@mui/material';
import { Share } from '@mui/icons-material';

export default function ProductMetaSection({ product }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1, borderTop: '1px solid #eee' }}>
      <Typography variant="body2" color="text.secondary">
        <Box component="span" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>SKU:</Box> {product.id || 'N/A'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Box component="span" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>Categories:</Box> {product.category}, {product.subcategory}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
        <Typography variant="body2" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>Share:</Typography>
        <Share fontSize="small" sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#111' } }} />
      </Box>
    </Box>
  );
}
