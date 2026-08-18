import { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import ViewAllButton from '../Products/ViewAllButton';

export default function HotSellingProducts({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Scroll by the full visible container width plus the gap
      const scrollAmount = scrollRef.current.clientWidth + 16; 
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 }, bgcolor: 'white' }}>
      <Box sx={{ position: 'relative', px: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
        
        {/* Header section with Title and View All */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={800} sx={{ color: '#333333', fontSize: { xs: '1.2rem', md: '1.5rem' }, letterSpacing: -0.2 }}>
            Hot selling product
          </Typography>
          <ViewAllButton to="/products?filter=bestseller" label="View all" />
        </Box>

        <Box sx={{ position: 'relative', display: 'flex' }}>
          
          {/* Scroll Left Button */}
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: -20,
              top: 88,
              zIndex: 10,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'secondary.main',
              color: 'text.secondary',
              width: 40,
              height: 40,
              display: { xs: 'none', md: 'flex' }, // Hide on mobile where touch scrolling is natural
              '&:hover': { bgcolor: 'white', transform: 'scale(1.05)' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <ArrowBackIos sx={{ fontSize: 16, ml: '4px' }} />
          </IconButton>

          {/* Scroll Container */}
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              px: 0.5,
              py: 1,
            }}
          >
            {products.map(product => (
              <Box key={product.id} sx={{ flex: '0 0 auto', width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 10.66px)', lg: 'calc(25% - 12px)', xl: 'calc(25% - 12px)' } }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          {/* Scroll Right Button */}
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: -20,
              top: 88,
              zIndex: 10,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'secondary.main',
              color: 'text.secondary',
              width: 40,
              height: 40,
              display: { xs: 'none', md: 'flex' }, // Hide on mobile
              '&:hover': { bgcolor: 'white', transform: 'scale(1.05)' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <ArrowForwardIos sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

      </Box>
    </Box>
  );
}
