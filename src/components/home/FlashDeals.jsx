import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Bolt, ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import products from '../../data/products';
import ProductCard from '../Products/ProductCard';

export default function FlashDeals() {
  // Pick some items for the flash deals and ignore out of stock items
  const flashProducts = products.filter(p => p.discount > 25 && p.stock !== 0).slice(0, 5);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 18,
    minutes: 34,
    seconds: 56
  });

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const TimeBlock = ({ value, label }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{
        bgcolor: '#ff4d4f',
        color: 'white',
        fontWeight: 700,
        fontSize: '1rem',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1
      }}>
        {formatNumber(value)}
      </Box>
      <Typography sx={{ fontSize: '0.6rem', color: '#888', mt: 0.5, fontWeight: 700 }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 1, md: 2 }, my: 0 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 3, md: 5 }, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Bolt sx={{ color: '#ff4d4f', fontSize: 32 }} />
              <Typography variant="h5" fontWeight={800} sx={{ color: '#111', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                Flash Sale
              </Typography>
            </Box>
            
            {/* Timer */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <TimeBlock value={timeLeft.days} label="DAYS" />
              <Typography sx={{ color: '#ff4d4f', fontWeight: 800, mt: 0.5 }}>:</Typography>
              <TimeBlock value={timeLeft.hours} label="HRS" />
              <Typography sx={{ color: '#ff4d4f', fontWeight: 800, mt: 0.5 }}>:</Typography>
              <TimeBlock value={timeLeft.minutes} label="MINS" />
              <Typography sx={{ color: '#ff4d4f', fontWeight: 800, mt: 0.5 }}>:</Typography>
              <TimeBlock value={timeLeft.seconds} label="SECS" />
            </Box>
          </Box>

          <Button
            component={Link}
            to="/products?sale=true"
            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              color: '#ff4d4f',
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
            {flashProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  flex: '0 0 auto',
                  width: { xs: 'calc(50% - 8px)', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 10.66px)', lg: 'calc(25% - 12px)', xl: 'calc(25% - 12px)' },
                  scrollSnapAlign: 'start',
                }}
              >
                <ProductCard product={product} isFlashSale={true} />
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
