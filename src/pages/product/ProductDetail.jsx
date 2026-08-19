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
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 2, sm: 2.5, md: 3, lg: 4, xl: 5 },
          pb: { xs: 4, sm: 5, md: 6, lg: 7, xl: 8 },
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
          rowSpacing={{ xs: 3, sm: 4, md: 4 }}
          alignItems="flex-start"
        >
          {/* LEFT — Gallery: 100% on mobile/tablet (xs, sm), 50% on desktop/PC (md, lg, xl) */}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <ProductImageGallery
              images={images}
              productName={product.name}
            />
          </Grid>

          {/* RIGHT — Product Info: 100% on mobile/tablet (xs, sm), 50% on desktop/PC (md, lg, xl) */}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <ProductInfo product={product} />
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <ProductTabs />

        <Divider sx={{ my: 2 }} />

        {/* Related Products — 3rd bottom component centered in middle of viewport */}
        {related.length > 0 && (
          <Box
            sx={{
              mt: 4,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 3, letterSpacing: 1, textAlign: 'center' }}
            >
              RELATED PRODUCTS
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ProductGrid products={related} loading={false} />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
