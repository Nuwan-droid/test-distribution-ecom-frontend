import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

export default function FeaturedProducts({ products }) {
  return (
    <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 }, bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: '#111111', fontSize: { xs: '1.2rem', md: '1.5rem' }, letterSpacing: -0.2 }}>Featured Products</Typography>
          </Box>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            color="secondary"
            endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
            id="view-all-featured-btn"
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              border: '1.5px solid',
              borderColor: 'secondary.main',
              color: 'secondary.main',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              px: { xs: 1.5, sm: 2.5 },
              py: 0.5,
              height: '32px',
              '&:hover': {
                border: '1.5px solid',
                borderColor: 'secondary.dark',
                bgcolor: 'rgba(26, 86, 219, 0.04)',
              },
            }}
          >
            See All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
