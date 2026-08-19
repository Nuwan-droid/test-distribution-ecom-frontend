import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Skeleton, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCartOutlined, Star, StarBorder } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, hideOriginalPrice = false, isFlashSale = false, isTrending = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const isOnSale = product.discount > 0 || (product.originalPrice && product.originalPrice > product.price);
  const discountedPrice = product.price;
  const originalPrice = product.originalPrice || product.price * 1.5;

  return (
    <Box
      component={Link}
      to={`/products/${product.id}`}
      id={`product-card-${product.id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.08)',
        p: 2.5,
        position: 'relative',
        bgcolor: '#fff',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        height: '100%',
        minHeight: { xs: '380px', sm: '410px' },
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
          transform: 'translateY(-4px)'
        }
      }}
    >
      {/* Badges container */}
      <Box sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 2
      }}>
        {isTrending && !isFlashSale && (
          <Box sx={{
            bgcolor: '#1a1a4b', // Dark blue to match image
            color: 'white',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Trending
          </Box>
        )}
        {isFlashSale && isOnSale && (
          <Box sx={{
            bgcolor: '#ff4d4f',
            color: 'white',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            -{Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
          </Box>
        )}
        {product.isNew && !isOnSale && !isTrending && (
          <Box sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            NEW
          </Box>
        )}
        {product.stock === 0 && (
          <Box sx={{
            bgcolor: '#555',
            color: 'white',
            px: 1,
            py: 0.25,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            OUT OF STOCK
          </Box>
        )}
      </Box>

      {/* Image */}
      <Box sx={{
        width: '100%',
        aspectRatio: '1/1',
        mb: 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{ width: '85%', height: '85%', objectFit: 'contain' }}
        />
      </Box>

      {/* Info */}
      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', mb: 1, minHeight: '2.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {product.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Typography sx={{ color: (isFlashSale && isOnSale) ? '#ff4d4f' : '#111', fontWeight: 800, fontSize: '1.1rem' }}>
          ${discountedPrice.toFixed(2)}
        </Typography>
        {(!hideOriginalPrice && isOnSale) && (
          <Typography sx={{ color: '#aaa', textDecoration: 'line-through', fontSize: '0.85rem', fontWeight: 500 }}>
            ${originalPrice.toFixed(2)}
          </Typography>
        )}
      </Box>

      {/* Bottom row: Stars and Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 1 }}>
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, index) => (
            index < Math.floor(product.rating || 4) 
              ? <Star key={index} sx={{ color: '#ffc107', fontSize: 16 }} />
              : <StarBorder key={index} sx={{ color: '#e0e0e0', fontSize: 16 }} />
          ))}
          <Typography sx={{ fontSize: '0.75rem', color: '#888', ml: 0.5, fontWeight: 500 }}>
            ({product.reviews || 25})
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Add to Cart">
            <Box>
              <IconButton
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ border: '1px solid #eaeaea', width: 34, height: 34, transition: 'all 0.2s', '&:hover': { bgcolor: '#f5f5f5', borderColor: '#ccc' } }}
              >
                <ShoppingCartOutlined sx={{ fontSize: 18, color: product.stock === 0 ? '#ccc' : '#555' }} />
              </IconButton>
            </Box>
          </Tooltip>
          <Tooltip title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
            <IconButton
              onClick={handleToggleWishlist}
              sx={{ border: '1px solid #eaeaea', width: 34, height: 34, transition: 'all 0.2s', '&:hover': { bgcolor: '#f5f5f5', borderColor: '#ccc' } }}
            >
              {inWishlist ? <Favorite sx={{ fontSize: 18, color: '#ff4d4f' }} /> : <FavoriteBorder sx={{ fontSize: 18, color: '#555' }} />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

// Matching Skeletons for Loading State
export function ProductCardSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.08)',
        p: 2.5,
        bgcolor: '#ffffff',
        height: '100%',
        minHeight: { xs: '380px', sm: '410px' },
      }}
    >
      <Box sx={{ width: '100%', aspectRatio: '1/1', mb: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Skeleton variant="rectangular" width="85%" height="85%" />
      </Box>
      <Skeleton variant="text" width="80%" height="24px" sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="60%" height="24px" sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="40%" height="28px" sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', pt: 1 }}>
        <Skeleton variant="text" width="40%" height="24px" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="circular" width={34} height={34} />
          <Skeleton variant="circular" width={34} height={34} />
        </Box>
      </Box>
    </Box>
  );
}
