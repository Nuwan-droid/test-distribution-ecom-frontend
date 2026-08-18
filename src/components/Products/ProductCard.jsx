import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Tooltip, Skeleton } from '@mui/material';
import { FavoriteBorder, Favorite, AttachMoney, ViewInAr } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import useProcessedImage from '../../hooks/useProcessedImage';
import { lazy, Suspense } from 'react';

// Lazy-load View3DDialog so Three.js is never included in the main bundle
const View3DDialog = lazy(() => import('../3d/View3DDialog'));

export default function ProductCard({ product, hideOriginalPrice = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [open3D, setOpen3D] = useState(false);
  const { processedSrc, isProcessed } = useProcessedImage(product.image);

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

  return (
    <>
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
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: { xs: '380px', sm: '410px' },
        boxSizing: 'border-box',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '&:hover': {
          boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
          transform: 'translateY(-6px)',
          border: '1px solid rgba(0,0,0,0.08)',
        },
        '&:hover .product-img': {
          transform: 'scale(1.06)'
        },
        '&:hover .add-btn': {
          opacity: 1,
          transform: 'translateY(0)',
        }
      }}
    >
      {/* ===== Image Section ===== */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '220px', sm: '260px', md: '280px', lg: '300px' },
        background: 'linear-gradient(135deg, #faf9f7 0%, #f5f3f0 50%, #faf9f7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 14, left: 14, zIndex: 4, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
          {product.isNew && (
            <Box
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 1.5,
                py: 0.5,
                fontSize: '0.65rem',
                fontWeight: 800,
                borderRadius: '20px',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              NEW
            </Box>
          )}
          {product.stock === 0 && (
            <Box
              sx={{
                bgcolor: 'secondary.main',
                color: 'white',
                px: 1.2,
                py: 0.4,
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: '20px',
                boxShadow: '0 2px 10px rgba(255, 77, 79, 0.2)'
              }}
            >
              Out of Stock
            </Box>
          )}
        </Box>

        {/* Wishlist Icon */}
        <Tooltip title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} placement="left">
          <Box
            onClick={handleToggleWishlist}
            sx={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 4,
              cursor: 'pointer',
              color: inWishlist ? '#ff4d4f' : '#333333',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#ffffff',
                transform: 'scale(1.12)'
              }
            }}
          >
            {inWishlist ? (
              <Favorite sx={{ fontSize: 18, color: '#ff4d4f' }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: 18 }} />
            )}
          </Box>
        </Tooltip>

        {/* Product Image — uses AI-processed transparent PNG when available,
            falls back to CSS mix-blend-mode trick for unprocessed images */}
        <Box
          component="img"
          className="product-img"
          src={processedSrc}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            // Only apply the CSS blend trick while the AI hasn't processed the image yet
            ...(!isProcessed && {
              mixBlendMode: 'multiply',
              filter: 'contrast(1.08) brightness(1.05)',
            }),
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease',
            p: 1.5,
          }}
        />


        {/* Floating Add to Cart Button */}
        <Box
          className="add-btn"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: { xs: 1, md: 0 },
            transform: { xs: 'none', md: 'translateY(15px)' },
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 4,
          }}
        >
          <Button
            onClick={handleAddToCart}
            variant="contained"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              color: '#111111',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: '0.8rem',
              py: 0.8,
              px: 3.5,
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#111111',
                color: '#ffffff',
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>

      {/* ===== Content Section ===== */}
      <Box sx={{
        p: 1.5,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff'
      }}>
        <Typography
          variant="caption"
          sx={{
            color: '#888888',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            mb: 0.5,
            height: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.subcategory ? product.subcategory : product.category}
        </Typography>

        <Typography
          sx={{
            fontSize: '0.95rem',
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#111111',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            mb: 1,
            width: '100%',
          }}
        >
          {product.name}
        </Typography>

        {/* Pricing Layout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isOnSale ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                <AttachMoney sx={{ fontSize: '1.25rem', mr: -0.4 }} />
                <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1 }}>
                  {dollars}
                  <Box component="sup" sx={{ fontSize: '0.75rem', fontWeight: 700, verticalAlign: 'super', ml: '1px' }}>
                    {cents}
                  </Box>
                </Typography>
              </Box>
              {!hideOriginalPrice && product.originalPrice && (
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#999999' }}>
                  <AttachMoney sx={{ fontSize: '0.9rem', mr: -0.3 }} />
                  <Typography sx={{ textDecoration: 'line-through', fontSize: '0.85rem', fontWeight: 500 }}>
                    {product.originalPrice.toFixed(2)}
                  </Typography>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#111111' }}>
              <AttachMoney sx={{ fontSize: '1.25rem', mr: -0.4 }} />
              <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1 }}>
                {dollars}
                <Box component="sup" sx={{ fontSize: '0.75rem', fontWeight: 700, verticalAlign: 'super', ml: '1px' }}>
                  {cents}
                </Box>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>

    {/* 3D Viewer Dialog — lazy-loaded; mounted only while open */}
    {open3D && product.modelUrl && (
      <Suspense fallback={null}>
        <View3DDialog
          open={open3D}
          onClose={() => setOpen3D(false)}
          modelUrl={product.modelUrl}
          productName={product.name}
        />
      </Suspense>
    )}
  </>);
}

// Matching Skeletons for Loading State
export function ProductCardSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: { xs: '380px', sm: '410px' },
        boxSizing: 'border-box',
        bgcolor: '#ffffff',
      }}
    >
      <Box sx={{ border: '1px solid', borderColor: 'secondary.main', p: 1.5 }}>
        <Skeleton variant="rectangular" width="100%" height="200px" />
      </Box>
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderTop: 'none', p: 1.5, flexGrow: 1 }}>
        <Skeleton variant="rounded" width="80px" height="30px" sx={{ borderRadius: '20px', mb: 1.5 }} />
        <Skeleton variant="text" width="40%" height="16px" sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="60%" height="24px" sx={{ mb: 0.75 }} />
        <Skeleton variant="text" width="100%" height="38px" sx={{ mt: 0.5, mb: 0.5 }} />
      </Box>
    </Box>
  );
}
