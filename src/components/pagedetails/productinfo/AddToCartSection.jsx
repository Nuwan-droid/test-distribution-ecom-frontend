import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function AddToCartSection({ quantity, setQuantity, currentStock, onAddToCart, onBuyNow }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1.25, sm: 1.5, md: 1.5, lg: 2 },
        mb: { xs: 2.5, sm: 3, md: 3 },
        alignItems: { xs: 'stretch', sm: 'center' },
        flexWrap: 'wrap',
        maxWidth: { xs: '100%', sm: '100%', md: 480, lg: 500, xl: 520 },
      }}
    >
      {/* Quantity Control */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1px solid', borderColor: '#e0e0e0', px: 1, py: 0.5,
          height: 48,
          width: { xs: '100%', sm: 'auto' },
          bgcolor: '#fff'
        }}
      >
        <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          <Remove fontSize="small" />
        </IconButton>
        <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>
          {quantity}
        </Typography>
        <IconButton size="small" onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}>
          <Add fontSize="small" />
        </IconButton>
      </Box>

      {/* Add To Cart Button */}
      <Button
        variant="contained"
        onClick={onAddToCart}
        sx={{
          bgcolor: 'secondary.main',
          color: '#fff',
          height: 48,
          borderRadius: 0,
          fontWeight: 700,
          letterSpacing: 1,
          px: { xs: 3, sm: 4 },
          flexGrow: { xs: 1, sm: 0 },
          '&:hover': { bgcolor: '#9B785D' }
        }}
      >
        ADD TO CART
      </Button>

      {/* Buy Now / Proceed to Checkout Button */}
      <Button
        variant="contained"
        onClick={onBuyNow}
        sx={{
          bgcolor: '#111',
          color: '#fff',
          height: 48,
          borderRadius: 0,
          fontWeight: 700,
          letterSpacing: 1,
          px: { xs: 3, sm: 4 },
          flexGrow: { xs: 1, sm: 0 },
          '&:hover': { bgcolor: '#333' }
        }}
      >
        PROCEED TO CHECKOUT
      </Button>
    </Box>
  );
}
