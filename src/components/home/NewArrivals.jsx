import React, { useRef } from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import { NewReleases, ArrowForward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import { motion } from 'framer-motion';

export default function NewArrivals({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#ffffff', py: { xs: 1, md: 2 }, my: 0 }}>
      <Container maxWidth={false}>
        {/* Header section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 3, md: 5 }, flexWrap: 'wrap', gap: 2 }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <NewReleases sx={{ color: '#f57c00', fontSize: 32 }} />
            <Typography variant="h5" fontWeight={900} sx={{ color: '#000000', textTransform: 'uppercase', letterSpacing: '0.5px', WebkitTextStroke: '1px black' }}>
              New Arrivals
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products?filter=new"
            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: 'none',
              color: '#f57c00',
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
            {products.map((product, index) => (
              <Box 
                key={product.id} 
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                sx={{ flex: '0 0 auto', width: { xs: 'calc(50% - 8px)', sm: 'calc(33.333% - 10.66px)', md: 'calc(25% - 12px)', lg: 'calc(20% - 12.8px)', xl: 'calc(16.666% - 13.33px)' }, scrollSnapAlign: 'start' }}
              >
                <ProductCard product={product} hideOriginalPrice={true} />
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
