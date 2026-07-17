import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { useWishlist } from '../../context/WishlistContext';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>My Wishlist</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</Typography>

        {wishlist.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
              <Box sx={{ fontSize: '5rem', mb: 2 }}>💔</Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>Your wishlist is empty</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>Save items you love by clicking the heart icon on any product</Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/products"
                startIcon={<ShoppingBag />}
                id="browse-products-btn"
                sx={{bgcolor:'secondary.main',borderRadius:'5px'}}
              >
                Browse Products
              </Button>
            </motion.div>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {wishlist.map((product, i) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
