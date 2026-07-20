import { Link } from 'react-router-dom';
import { Box, Typography, Button, Tooltip, Skeleton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, hideOriginalPrice = false }) {
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

  // Check if product is on sale
  const isOnSale = product.discount > 0 || (product.originalPrice && product.originalPrice > product.price);

  // Format price into dollar and cents for superscript display
  const priceParts = (product.price || 0).toFixed(2).split('.');
  const dollars = priceParts[0];
  const cents = priceParts[1];

  // Helper to generate a realistic unit price tag just like the reference image
  const getUnitPriceTag = () => {
    if (product.category === 'Beauty' || product.category === 'Beauty & Care') {
      const perOz = (product.price / 8.5).toFixed(2);
      return `$${perOz}/fl oz`;
    }
    const perOz = (product.price / 16).toFixed(2);
    return `$${perOz}/oz`;
  };

  return (
    <Box
      component={Link}
      to={`/products/${product.id}`}
      id={`product-card-${product.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: '#ffffff',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        position: 'relative',
        width: '100%',
        height: '410px', // Fixed height to keep tiles perfectly aligned
        p: 1.5,
        boxSizing: 'border-box',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      {/* ===== Wishlist Icon (Top Right) ===== */}
      <Tooltip title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} placement="left">
        <Box
          onClick={handleToggleWishlist}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 3,
            cursor: 'pointer',
            color: inWishlist ? 'secondary.main' : '#000000',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            bgcolor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: '#f5f5f5',
              transform: 'scale(1.08)'
            }
          }}
        >
          {inWishlist ? (
            <Favorite sx={{ fontSize: 18, color: 'secondary.main' }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 18, color: '#000000' }} />
          )}
        </Box>
      </Tooltip>

      {/* ===== Image Section ===== */}
      <Box
        sx={{
          width: '100%',
          height: '220px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#ffffff',
          borderRadius: '4px',
          overflow: 'hidden',
          mb: 1.5,
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply' // support blending transparent pngs nicely
          }}
        />
      </Box>

      {/* ===== Button Section (Directly under image) ===== */}
      <Box sx={{ mb: 1 }}>
        <Button
          onClick={handleAddToCart}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            borderColor: '#222222',
            color: '#222222',
            fontWeight: 700,
            fontSize: '0.85rem',
            py: '3px',
            px: '14px',
            height: '30px',
            width: 'fit-content',
            '&:hover': {
              borderColor: '#000000',
              bgcolor: '#f5f5f5',
            }
          }}
        >
          + Add
        </Button>
      </Box>

      {/* ===== Content Section ===== */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Sponsored / Brand Label */}
        <Typography
          variant="caption"
          sx={{
            color: '#757575',
            fontSize: '0.75rem',
            mb: 0.25,
            height: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.brand ? product.brand : 'Sponsored'}
        </Typography>

        {/* Pricing Layout */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 0.5, height: '40px', justifyContent: 'center' }}>
          {isOnSale ? (
            <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 0.5 }}>
              <Typography
                component="span"
                sx={{
                  color: '#2e7d32',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  lineHeight: 1
                }}
              >
                ${dollars}
                <Box component="sup" sx={{ fontSize: '0.75rem', fontWeight: 700, verticalAlign: 'super', ml: '1px' }}>
                  {cents}
                </Box>
              </Typography>
              {!hideOriginalPrice && product.originalPrice && (
                <Typography
                  component="span"
                  sx={{
                    color: '#757575',
                    textDecoration: 'line-through',
                    fontSize: '0.85rem',
                    ml: 1
                  }}
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography
              sx={{
                color: '#000000',
                fontWeight: 800,
                fontSize: '1.25rem',
                lineHeight: 1
              }}
            >
              ${dollars}
              <Box component="sup" sx={{ fontSize: '0.75rem', fontWeight: 700, verticalAlign: 'super', ml: '1px' }}>
                {cents}
              </Box>
            </Typography>
          )}
        </Box>


        {/* Product Title (At the very bottom) */}
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.35,
            color: '#222222',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            height: '38px',
            mt: 0.5,
            mb: 0.5
          }}
        >
          {product.name}
        </Typography>

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
        p: 1.5,
        width: '100%',
        height: '410px',
        boxSizing: 'border-box',
        bgcolor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ebebeb'
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="220px" sx={{ borderRadius: '4px', mb: 1.5 }} />
      <Skeleton variant="rounded" width="80px" height="30px" sx={{ borderRadius: '20px', mb: 1.5 }} />
      <Skeleton variant="text" width="40%" height="16px" sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="60%" height="24px" sx={{ mb: 0.75 }} />
      <Skeleton variant="text" width="100%" height="38px" sx={{ mt: 0.5, mb: 0.5 }} />
    </Box>
  );
}
