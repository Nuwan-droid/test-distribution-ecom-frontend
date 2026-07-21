import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Chip, Rating, Divider,
  IconButton, Breadcrumbs, Paper, Tabs, Tab, Avatar, Alert, Snackbar,
  Stack,
} from '@mui/material';
import {
  FavoriteBorder, Favorite, ShoppingCart, Share,
  LocalShipping, VerifiedUser, Replay, Add, Remove,
  NavigateNext, CompareArrows, Straighten
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from '../../components/Products/ProductGrid';
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
  const [selectedSize, setSelectedSize] = useState(null);
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
  const sizes = product.sizes || ['UK 08', 'UK 10', 'UK 12', 'UK 14']; // Mock sizes if not present

  const handleAddToCart = () => {
    if (!selectedSize && product.category === 'Fashion') {
      setSnackbar({ open: true, msg: 'Please select a size first.', error: true });
      return;
    }
    for (let i = 0; i < quantity; i++) addToCart(product);
    setSnackbar({ open: true, msg: `${quantity}x ${product.name} added to cart!` });
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.category === 'Fashion') {
       setSnackbar({ open: true, msg: 'Please select a size first.', error: true });
       return;
    }
    handleAddToCart();
    navigate('/cart');
  };

  const mockReviews = [
    { name: 'Rahul K.', rating: 5, date: 'Jan 15, 2026', text: 'Excellent product! Exactly as described, fast delivery and great packaging.', avatar: 'https://i.pravatar.cc/40?img=11' },
    { name: 'Sneha M.', rating: 4, date: 'Jan 10, 2026', text: 'Good quality for the price. Happy with the purchase overall.', avatar: 'https://i.pravatar.cc/40?img=12' },
    { name: 'Arjun P.', rating: 5, date: 'Feb 05, 2026', text: 'Superb! Premium build quality and works perfectly. Highly recommend.', avatar: 'https://i.pravatar.cc/40?img=13' },
  ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>

        <Grid container spacing={6}>
          {/* Left Column: Image Gallery */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, position: 'sticky', top: 90 }}>
              {/* Vertical Thumbnails */}
              {images.length > 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 80 }}>
                  {images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt={`Thumb ${i + 1}`}
                      onClick={() => setSelectedImage(i)}
                      sx={{
                        width: '100%',
                        height: 100,
                        objectFit: 'cover',
                        bgcolor: '#f5f5f5',
                        cursor: 'pointer',
                        border: i === selectedImage ? '2px solid #333' : '2px solid transparent',
                        transition: 'all 0.2s',
                        opacity: i === selectedImage ? 1 : 0.6,
                        '&:hover': { opacity: 1 },
                      }}
                    />
                  ))}
                </Box>
              )}
              {/* Main Image */}
              <Box sx={{ flex: 1, position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      component="img"
                      src={images[selectedImage]}
                      alt={product.name}
                      sx={{
                        width: '100%',
                        height: { xs: 400, md: 600 },
                        objectFit: 'cover',
                        bgcolor: '#f5f5f5',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Product Info */}
          <Grid item xs={12} md={6}>
            <Box>
               {/* Breadcrumbs */}
              <Breadcrumbs separator=">" sx={{ mb: 2 }}>
                <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: '#666', fontSize: '0.8rem' }}>Home</Typography>
                <Typography component={Link} to="/products" sx={{ textDecoration: 'none', color: '#666', fontSize: '0.8rem' }}>{product.category}</Typography>
                <Typography sx={{ color: '#111', fontSize: '0.8rem', fontWeight: 600 }}>{product.name}</Typography>
              </Breadcrumbs>

              <Typography variant="h4" fontWeight={400} sx={{ mt: 1, mb: 1.5, letterSpacing: 0 }}>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
                <Typography variant="h5" fontWeight={600} color="text.primary">
                  Rs {product.price.toLocaleString()}.00
                </Typography>
                {product.originalPrice > product.price && (
                  <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#888' }}>
                    Rs {product.originalPrice.toLocaleString()}.00
                  </Typography>
                )}
              </Box>

              {/* Installment Options */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  3 X Rs. {(product.price / 3).toFixed(2)} with <Box component="span" sx={{ bgcolor: '#00D1FF', color: '#fff', px: 1, py: 0.2, borderRadius: 10, fontSize: '0.7rem', fontWeight: 700, ml: 0.5 }}>mintpay</Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or 3 X Rs. {(product.price / 3).toFixed(2)} with <Box component="span" sx={{ bgcolor: '#FF3366', color: '#fff', px: 1, py: 0.2, borderRadius: 10, fontSize: '0.7rem', fontWeight: 700, ml: 0.5 }}>koko</Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or up to 4 X Rs. {(product.price / 4).toFixed(2)} with <Box component="span" sx={{ bgcolor: '#00E5FF', color: '#000', px: 1, py: 0.2, borderRadius: 10, fontSize: '0.7rem', fontWeight: 700, ml: 0.5 }}>PayZy</Box>
                </Typography>
              </Box>

              {/* Size Selector */}
              {product.category === 'Fashion' && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Size: <Box component="span" sx={{ fontWeight: 400, ml: 1 }}>{selectedSize}</Box>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {sizes.map(s => (
                      <Button
                        key={s}
                        variant="outlined"
                        onClick={() => setSelectedSize(s)}
                        sx={{
                          borderColor: selectedSize === s ? '#333' : '#e0e0e0',
                          color: selectedSize === s ? '#333' : '#666',
                          bgcolor: selectedSize === s ? '#f5f5f5' : 'transparent',
                          minWidth: 60,
                          py: 0.5,
                          borderRadius: 0,
                          '&:hover': { borderColor: '#333', bgcolor: '#f9f9f9' }
                        }}
                      >
                        {s}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Add to Cart & Quantity */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center',
                    border: '1px solid', borderColor: '#e0e0e0', px: 1, py: 0.5,
                    height: 48
                  }}
                >
                  <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ minWidth: 40, textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}>
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    bgcolor: '#B89073', // Brownish color from design
                    color: '#fff',
                    height: 48,
                    borderRadius: 0,
                    fontWeight: 600,
                    letterSpacing: 1,
                    '&:hover': { bgcolor: '#9B785D' }
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>

              {/* Action Links */}
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  <CompareArrows fontSize="small" /> Compare
                </Typography>
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

              <Divider sx={{ mb: 3 }} />

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

            </Box>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 10, borderTop: '1px solid #e0e0e0', pt: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            centered
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#111' },
              '& .MuiTab-root': { color: '#666', fontWeight: 600, '&.Mui-selected': { color: '#111' } }
            }}
          >
            <Tab label="ADDITIONAL INFORMATION" />
            <Tab label={`REVIEWS (${product.reviews.toLocaleString()})`} />
            <Tab label="SHIPPING & DELIVERY" />
          </Tabs>

          <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', minHeight: 200 }}>
            {tab === 0 && (
              <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                <Typography variant="body2" fontWeight={600}>Size</Typography>
                <Typography variant="body2" color="text.secondary">UK 08, UK 10, UK 12, UK 14</Typography>
              </Box>
            )}
            {tab === 1 && (
              <Box>
                {mockReviews.map((review, i) => (
                  <Box key={i} sx={{ mb: 3, pb: 3, borderBottom: '1px solid #f0f0f0' }}>
                    <Typography variant="subtitle2" fontWeight={700}>{review.name}</Typography>
                    <Rating value={review.rating} size="small" readOnly sx={{ my: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">{review.text}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {tab === 2 && (
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Standard delivery takes 3-5 business days. Express shipping is available at checkout.
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3, letterSpacing: 1 }}>RELATED PRODUCTS</Typography>
            <ProductGrid products={related} loading={false} />
          </Box>
        )}
      </Container>

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
