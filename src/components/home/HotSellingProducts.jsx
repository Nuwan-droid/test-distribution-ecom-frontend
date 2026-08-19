import React, { useRef } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import { Bolt, ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';

export default function HotSellingProducts({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 1, md: 2 }, my: 0 }}>
      <Container maxWidth="xl">
        {/* Header section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 3, md: 5 }, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bolt sx={{ color: '#1a1a4b', fontSize: 32 }} />
            <Typography variant="h5" fontWeight={800} sx={{ color: '#1a1a4b', letterSpacing: '-0.5px' }}>
              Hot Selling Products
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products?filter=bestseller"
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

        {/* Scroll Container Wrapper */}
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: { md: -20, lg: -24 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: '#f8f8f8' }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box
            ref={scrollRef}
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
                <ProductCard product={product} isTrending={true} hideOriginalPrice={true} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: { md: -20, lg: -24 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: '#f8f8f8' }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
