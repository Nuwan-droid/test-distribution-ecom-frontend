import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Breadcrumbs, Divider, Snackbar, Alert } from '@mui/material';
import { FavoriteBorder, Favorite, Share, Add, Remove, Straighten } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '', error: false });

  const inWishlist = isInWishlist(product.id);
  const sizes = product.sizes || []; 
  const hasSizes = sizes.length > 0;
  const currentStock = hasSizes ? (selectedSize?.stock || 0) : (product.stock || 10);

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      setSnackbar({ open: true, msg: 'Please select a size first.', error: true });
      return;
    }
    const cartProduct = hasSizes ? { ...product, selectedSize: selectedSize.size } : product;
    for (let i = 0; i < quantity; i++) addToCart(cartProduct);
    setSnackbar({ open: true, msg: `${quantity}x ${product.name} added to cart!`, error: false });
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs separator=">" sx={{ mb: { xs: 1, md: 1.5 } }}>
        <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: '#666', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>Home</Typography>
        <Typography component={Link} to="/products" sx={{ textDecoration: 'none', color: '#666', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>{product.category}</Typography>
        <Typography sx={{ color: '#111', fontSize: { xs: '0.75rem', sm: '0.8rem' }, fontWeight: 600 }}>{product.name}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={400} sx={{ mt: 0.5, mb: 1, letterSpacing: 0, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: { xs: 1, md: 1.5 } }}>
        <Typography variant="h5" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Rs {product.price.toLocaleString()}.00
        </Typography>
        {product.originalPrice > product.price && (
          <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#888', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Rs {product.originalPrice.toLocaleString()}.00
          </Typography>
        )}
      </Box>

      {/* Size Selector */}
      {hasSizes && (
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Size: <Box component="span" sx={{ fontWeight: 400, ml: 1 }}>{selectedSize?.size}</Box>
            {selectedSize && (
              <Box component="span" sx={{ ml: 2, color: selectedSize.stock > 0 ? 'success.main' : 'error.main', fontWeight: 400 }}>
                {selectedSize.stock > 0 ? `${selectedSize.stock} left` : 'Out of stock'}
              </Box>
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {sizes.map(s => (
              <Button
                key={s.size}
                variant="outlined"
                disabled={s.stock === 0}
                onClick={() => { setSelectedSize(s); setQuantity(1); }}
                sx={{
                  borderColor: selectedSize?.size === s.size ? '#333' : '#e0e0e0',
                  color: selectedSize?.size === s.size ? '#333' : '#666',
                  bgcolor: selectedSize?.size === s.size ? '#f5f5f5' : 'transparent',
                  minWidth: { xs: 50, sm: 60 },
                  py: 0.5,
                  borderRadius: 0,
                  '&:hover': { borderColor: '#333', bgcolor: '#f9f9f9' }
                }}
              >
                {s.size}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {/* Add to Cart & Quantity */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mb: 2.5, alignItems: { sm: 'center' } }}>
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid', borderColor: '#e0e0e0', px: 1, py: 0.5,
            height: 48,
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Remove fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center' }}>
            {quantity}
          </Typography>
          <IconButton size="small" onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}>
            <Add fontSize="small" />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            bgcolor: 'secondary.main', 
            color: '#fff',
            height: 48,
            borderRadius: 0,
            fontWeight: 600,
            letterSpacing: 1,
            px: { xs: 2, sm: 5 },
            width: { xs: '100%', sm: 'auto' },
            '&:hover': { bgcolor: '#9B785D' }
          }}
        >
          ADD TO CART
        </Button>
      </Box>

      {/* Action Links */}
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, mb: { xs: 2, md: 2.5 }, flexWrap: 'wrap' }}>
        <Typography
          variant="body2"
          onClick={() => toggleWishlist(product)}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: inWishlist ? 'error.main' : 'inherit', '&:hover': { color: 'error.main' } }}
        >
          {inWishlist ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />} Add to wishlist
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
          <Straighten fontSize="small" /> Size Guide
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Product Meta */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>SKU:</Box> N/A
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>Categories:</Box> {product.category}, {product.subcategory}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="body2" sx={{ color: '#111', fontWeight: 600, mr: 1 }}>Share:</Typography>
          <Share fontSize="small" sx={{ color: '#666', cursor: 'pointer' }} />
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.error ? "error" : "success"} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ borderRadius: 0 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
