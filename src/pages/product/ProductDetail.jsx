import { useParams, Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, Divider } from '@mui/material';
import ProductGrid from '../../components/Products/ProductGrid';
import products from '../../data/products';
import ProductImageGallery from '../../components/pagedetails/ProductImageGallery';
import ProductInfo from '../../components/pagedetails/ProductInfo';
import ProductTabs from '../../components/pagedetails/ProductTabs';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Product Not Found</Typography>
        <Button variant="contained" component={Link} to="/products">Browse Products</Button>
      </Container>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  
  // Ensure we have multiple images for the gallery to demonstrate the thumbnail selection
  const images = product.images?.length > 1 
    ? product.images 
    : [
        product.image, 
        product.image, // duplicating to show gallery if they don't have multiple
        product.image
      ];

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '100vh', pt: 0 }}>
      <Container maxWidth="lg" sx={{ pt: 0, pb: { xs: 2, md: 4 } }}>

        <Grid container spacing={{ xs: 2, sm: 4, md: 5 }} alignItems="flex-start">
          {/* Left Column: Image Gallery */}
          <Grid item xs={12} sm={6}>
            <ProductImageGallery images={images} productName={product.name} />
          </Grid>

          {/* Right Column: Product Info */}
          <Grid item xs={12} sm={6}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <ProductTabs />

        <Divider sx={{ my: 4 }} />

        {/* Related Products */}
        {related.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3, letterSpacing: 1 }}>RELATED PRODUCTS</Typography>
            <ProductGrid products={related} loading={false} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
