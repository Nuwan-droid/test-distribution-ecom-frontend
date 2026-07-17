import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Chip, Rating, Divider,
  IconButton, Breadcrumbs, Paper, Tabs, Tab, Avatar, Alert, Snackbar,
  TextField, Tooltip, Stack,
} from '@mui/material';
import {
  FavoriteBorder, Favorite, ShoppingCart, FlashOn, Share,
  LocalShipping, VerifiedUser, Replay, Star, Add, Remove,
  ArrowBack, CheckCircle,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import products from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '' });

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Product Not Found</Typography>
        <Button variant="contained" component={Link} to="/products">Browse Products</Button>
      </Container>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.images?.length > 0 ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setSnackbar({ open: true, msg: `${quantity}x ${product.name} added to cart!` });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const mockReviews = [
    { name: 'Rahul K.', rating: 5, date: 'Jan 15, 2024', text: 'Excellent product! Exactly as described, fast delivery and great packaging.', avatar: 'https://i.pravatar.cc/40?img=11' },
    { name: 'Sneha M.', rating: 4, date: 'Jan 10, 2024', text: 'Good quality for the price. Happy with the purchase overall.', avatar: 'https://i.pravatar.cc/40?img=12' },
    { name: 'Arjun P.', rating: 5, date: 'Dec 28, 2023', text: 'Superb! Premium build quality and works perfectly. Highly recommend.', avatar: 'https://i.pravatar.cc/40?img=13' },
  ];

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Home</Typography>
          <Typography component={Link} to="/products" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Products</Typography>
          <Typography component={Link} to={`/products?category=${encodeURIComponent(product.category)}`} sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>{product.category}</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, borderRadius: 3, position: 'sticky', top: 90 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Box
                    component="img"
                    src={images[selectedImage]}
                    alt={product.name}
                    sx={{ width: '100%', height: { xs: 280, md: 400 }, objectFit: 'cover', borderRadius: 2 }}
                  />
                </motion.div>
              </AnimatePresence>
              {images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                  {images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt={`${i + 1}`}
                      onClick={() => setSelectedImage(i)}
                      sx={{
                        width: 64, height: 64, objectFit: 'cover', borderRadius: 1.5,
                        border: '2px solid', cursor: 'pointer',
                        borderColor: i === selectedImage ? 'primary.main' : 'transparent',
                        transition: 'all 0.2s',
                        opacity: i === selectedImage ? 1 : 0.6,
                        '&:hover': { opacity: 1 },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={7}>
            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                <Chip label={product.category} size="small" variant="outlined" />
                {product.isNew && <Chip label="New" size="small" color="success" />}
                {product.isBestSeller && <Chip label="🔥 Best Seller" size="small" sx={{ bgcolor: '#F59E0B', color: '#fff' }} />}
                {product.discount > 0 && <Chip label={`${product.discount}% OFF`} size="small" color="error" />}
              </Box>

              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {product.brand}
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5, mb: 1.5, lineHeight: 1.3 }}>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="primary.main" fontWeight={700}>{product.rating}</Typography>
                <Typography variant="body2" color="text.secondary">({product.reviews.toLocaleString()} reviews)</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
                <Typography variant="h4" fontWeight={900} color="text.primary">
                  {product.price.toLocaleString()}$
                </Typography>
                {product.originalPrice > product.price && (
                  <>
                    <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary', fontWeight: 400 }}>
                      {product.originalPrice.toLocaleString()}$
                    </Typography>
                    <Chip label={`Save ${(product.originalPrice - product.price).toLocaleString()}$`} size="small" color="success" />
                  </>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Features */}
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Key Features</Typography>
              <Stack spacing={0.7} sx={{ mb: 2.5 }}>
                {product.features?.map((feature, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Quantity + Actions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>Quantity</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Paper
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1,
                      border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 1, py: 0.5,
                    }}
                  >
                    <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} id="decrease-qty-btn">
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" fontWeight={700} sx={{ minWidth: 32, textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton size="small" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} id="increase-qty-btn">
                      <Add fontSize="small" />
                    </IconButton>
                  </Paper>
                  <Typography variant="caption" color={product.stock <= 5 ? 'error.main' : 'success.main'} fontWeight={600}>
                    {product.stock <= 5 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ flex: 1, minWidth: 160, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
                  id="add-to-cart-btn"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FlashOn />}
                  onClick={handleBuyNow}
                  sx={{ flex: 1, minWidth: 160 }}
                  id="buy-now-btn"
                >
                  Buy Now
                </Button>
                <Tooltip title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                  <IconButton
                    onClick={() => toggleWishlist(product)}
                    size="large"
                    id="wishlist-btn"
                    sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
                  >
                    {inWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Delivery Info */}
              <Paper sx={{ p: 2, bgcolor: '#F0FDF4', borderRadius: 2, border: '1px solid #BBF7D0' }}>
                <Grid container spacing={2}>
                  {[
                    { icon: <LocalShipping sx={{ color: 'success.main' }} />, text: 'Free delivery on orders above 199$' },
                    { icon: <Replay sx={{ color: 'success.main' }} />, text: '30-day easy returns' },
                    { icon: <VerifiedUser sx={{ color: 'success.main' }} />, text: '100% Authentic product' },
                  ].map((item, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {item.icon}
                        <Typography variant="caption" fontWeight={500}>{item.text}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Description / Reviews Tabs */}
        <Paper sx={{ mt: 4, borderRadius: 3, overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 2 }}>
            <Tab label="Description" id="tab-description" />
            <Tab label={`Reviews (${product.reviews.toLocaleString()})`} id="tab-reviews" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            {tab === 0 && (
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {product.description}
              </Typography>
            )}
            {tab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, p: 2, bgcolor: '#F8FAFC', borderRadius: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" fontWeight={900} color="primary.main">{product.rating}</Typography>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="caption" color="text.secondary">{product.reviews.toLocaleString()} reviews</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map(star => (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="caption">{star}★</Typography>
                        <Box sx={{ flex: 1, bgcolor: '#E5E7EB', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                          <Box sx={{ bgcolor: '#F59E0B', height: '100%', width: `${star === 5 ? 65 : star === 4 ? 20 : star === 3 ? 10 : star === 2 ? 3 : 2}%`, borderRadius: 4 }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary">{star === 5 ? '65%' : star === 4 ? '20%' : star === 3 ? '10%' : '5%'}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                {mockReviews.map((review, i) => (
                  <Box key={i} sx={{ mb: 2.5, pb: 2.5, borderBottom: i < mockReviews.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar src={review.avatar} sx={{ width: 36, height: 36 }} />
                        <Box>
                          <Typography variant="body2" fontWeight={700}>{review.name}</Typography>
                          <Rating value={review.rating} size="small" readOnly />
                        </Box>
                      </Box>
                      <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{review.text}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Related Products</Typography>
            <Grid container spacing={3}>
              {related.map(p => (
                <Grid item xs={6} sm={4} md={3} key={p.id}>
                  <ProductCard product={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ borderRadius: 2 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
