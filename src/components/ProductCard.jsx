import { Link } from 'react-router-dom';
import {
  Card, CardMedia, CardContent, CardActions, Box, Typography,
  IconButton, Button, Chip, Rating, Tooltip, Skeleton,
} from '@mui/material';
import { FavoriteBorder, Favorite, ShoppingCart, FlashOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, compact = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Card
        component={Link}
        to={`/products/${product.id}`}
        sx={{
          textDecoration: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
          '&:hover .card-actions': { opacity: 1, transform: 'translateY(0)' },
          cursor: 'pointer',
        }}
        id={`product-card-${product.id}`}
      >
        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {product.discount > 0 && (
            <Chip label={`-${product.discount}%`} size="small" color="error" sx={{ fontWeight: 700, height: 22 }} />
          )}
          {product.isNew && (
            <Chip label="NEW" size="small" color="success" sx={{ fontWeight: 700, height: 22 }} />
          )}
          {product.isBestSeller && (
            <Chip label=" Best Seller" size="small" sx={{ bgcolor: '#F59E0B', color: '#fff', fontWeight: 700, height: 22 }} />
          )}
        </Box>

        {/* Wishlist Button */}
        <Tooltip title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'} placement="left">
          <IconButton
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleToggleWishlist}
            id={`wishlist-toggle-${product.id}`}
            sx={{
              position: 'absolute', top: 8, right: 8, zIndex: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              width: 34, height: 34,
              '&:hover': { bgcolor: 'error.light', color: 'white' },
              transition: 'all 0.2s',
            }}
          >
            {inWishlist
              ? <Favorite sx={{ fontSize: 18, color: 'error.main' }} />
              : <FavoriteBorder sx={{ fontSize: 18 }} />
            }
          </IconButton>
        </Tooltip>

        {/* Image — fixed height + fixed width container, so image source size never affects layout */}
        <Box
          sx={{
            width: '100%',
            height: compact ? 160 : 220,
            flexShrink: 0,
            overflow: 'hidden',
            bgcolor: '#F8FAFC',
            borderRadius: '16px 16px 0 0',
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.06)' },
            }}
          />
        </Box>

        {/* Content — flex column so the bottom block always aligns across cards */}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pb: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
            {product.brand}
          </Typography>

          {/* Fixed-height name block — reserves 2 lines worth of space even for short names */}
          <Typography
            variant={compact ? 'body2' : 'body1'}
            fontWeight={600}
            sx={{
              mt: 0.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: 1.4,
              minHeight: compact ? '2.5em' : '2.8em',
              color: 'text.primary',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">({product.reviews.toLocaleString()})</Typography>
          </Box>

          {/* Bottom block pinned via mt: 'auto' — price/stock always lands in the same place */}
          <Box sx={{ mt: 'auto', pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, minHeight: '1.6em' }}>
              <Typography variant={compact ? 'body1' : 'h6'} fontWeight={800} color="text.primary">
                {product.price.toLocaleString()}$
              </Typography>
              {product.originalPrice > product.price && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  {product.originalPrice.toLocaleString()}$
                </Typography>
              )}
            </Box>

            {/* Reserved-height stock line so its presence/absence doesn't shift card height */}
            <Typography
              variant="caption"
              color="error.main"
              fontWeight={600}
              sx={{ mt: 0.5, display: 'block', minHeight: '1.2em', visibility: (product.stock <= 5 && product.stock > 0) ? 'visible' : 'hidden' }}
            >
              {(product.stock <= 5 && product.stock > 0) ? `Only ${product.stock} left!` : 'placeholder'}
            </Typography>
          </Box>
        </CardContent>

        {/* Actions */}
        <CardActions
          className="card-actions"
          sx={{
            p: 1.5,
            pt: 0.5,
            gap: 1,
            opacity: { xs: 1, md: 0 },
            transform: { xs: 'none', md: 'translateY(6px)' },
            transition: 'all 0.2s ease',
          }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            id={`add-to-cart-${product.id}`}
            size="small"
            sx={{ borderRadius: 8, bgcolor: 'secondary.main' }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={220} />
      <CardContent>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="30%" />
      </CardContent>
    </Card>
  );
}