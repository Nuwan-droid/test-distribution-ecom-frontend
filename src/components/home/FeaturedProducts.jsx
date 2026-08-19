import { Box, Typography, Button, Container } from '@mui/material';
import { Star, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';

export default function FeaturedProducts({ products }) {
  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 1, md: 2 }, my: 0 }}>
      <Container maxWidth="xl">
        {/* Header section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 3, md: 5 }, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Star sx={{ color: '#1a1a4b', fontSize: 32 }} />
            <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a4b', letterSpacing: '-0.5px' }}>
              Featured Products
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products?filter=featured"
            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              color: '#1a1a4b',
              fontWeight: 700,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            View all deals
          </Button>
        </Box>

        {/* Scroll Container */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            pb: 2,
          }}
        >
          {products.map(product => (
            <Box key={product.id} sx={{ flex: '0 0 auto', width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 10.66px)', lg: 'calc(25% - 12px)', xl: 'calc(25% - 12px)' }, scrollSnapAlign: 'start' }}>
              <ProductCard product={product} hideOriginalPrice={true} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
