import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Breadcrumbs } from '@mui/material';
import { FavoriteBorder, Favorite, Straighten, AttachMoney } from '@mui/icons-material';

export default function ProductHeaderSection({ product, inWishlist, toggleWishlist }) {
  return (
    <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5 }, maxWidth: { xs: '100%', sm: '100%', md: 460, lg: 480, xl: 520 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator=">" sx={{ mb: { xs: 1, sm: 1.25, md: 1.5 } }}>
        <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: '#666', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' } }}>Home</Typography>
        <Typography component={Link} to="/products" sx={{ textDecoration: 'none', color: '#666', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' } }}>{product.category}</Typography>
        <Typography sx={{ color: '#111', fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, fontWeight: 600 }}>{product.name}</Typography>
      </Breadcrumbs>

      {/* Product Title */}
      <Typography variant="h4" fontWeight={400} sx={{ mt: 0.5, mb: 1, letterSpacing: 0, fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem', lg: '2.125rem', xl: '2.25rem' } }}>
        {product.name}
      </Typography>

      {/* Product Price with Dollar Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 1, md: 1.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
          <AttachMoney sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' }, mr: -0.4 }} />
          <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {product.price.toLocaleString()}.00
          </Typography>
        </Box>
        {product.originalPrice && product.originalPrice > product.price && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#888' }}>
            <AttachMoney sx={{ fontSize: '1.1rem', mr: -0.4, textDecoration: 'line-through' }} />
            <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#888', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {product.originalPrice.toLocaleString()}.00
            </Typography>
          </Box>
        )}
      </Box>

      {/* Product Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
        {product.description}
      </Typography>

      {/* Action Links */}
      <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, mb: 2, flexWrap: 'wrap' }}>
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
    </Box>
  );
}
