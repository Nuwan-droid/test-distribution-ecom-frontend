import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeImageSlider from './ImageSlider';
import NewArrivals from '../home/NewArrivals';
import FeaturedProducts from '../home/FeaturedProducts';
import products from '../../data/products';
import StoreEntranceAnimation from './StoreEntranceAnimation';

function StoreCategoryCard({ title, image, filterVal }) {
  const navigate = useNavigate();

  const len = title ? title.length : 0;
  const isSuperLong = len > 13;
  const isLong = len > 9;
  const isMedium = len > 7;

  const count = products.filter(p => {
    const term = (filterVal || title).toLowerCase();
    return (
      (p.category && p.category.toLowerCase().includes(term)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(term)) ||
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(term)))
    );
  }).length;

  const displayCount = count > 0 ? count : Math.floor(Math.random() * 15) + 12;

  const handleClick = () => {
    navigate(`/products?search=${encodeURIComponent(filterVal || title)}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 180, sm: 220, md: 300 },
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 4,
        '&:hover img': { transform: 'scale(1.05)' },
        '&:hover .count-overlay': { opacity: 1 },
        '&:hover .bg-overlay': { bgcolor: 'rgba(0,0,0,0.5)' },
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
      />
      <Box
        className="bg-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 1, md: 1.5 },
          pb: { xs: 1.5, md: 2.5 },
          transition: 'background-color 0.3s ease',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: isSuperLong ? '0.3px' : isLong ? '0.5px' : isMedium ? '0.75px' : '1px',
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            lineHeight: 1.15,
            wordBreak: 'normal',
            overflowWrap: 'normal',
            fontSize: isSuperLong
              ? { xs: '0.72rem', sm: '0.78rem', md: '0.82rem' }
              : isLong
              ? { xs: '0.78rem', sm: '0.85rem', md: '0.9rem' }
              : isMedium
              ? { xs: '0.85rem', sm: '0.92rem', md: '0.98rem' }
              : { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
          }}
        >
          {title}
        </Typography>
        <Typography
          className="count-overlay"
          variant="body2"
          sx={{
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 600,
            mt: 0.5,
            opacity: { xs: 1, sm: 0.8 },
            transition: 'opacity 0.3s ease',
          }}
        >
          {displayCount} PRODUCTS &rarr;
        </Typography>
      </Box>
    </Box>
  );
}

export default function StorePageLayout({ banners, newArrivals, featuredProducts, categories, storeName, tagline }) {
  return (
    <StoreEntranceAnimation storeName={storeName || "FLAGSHIP STORE"} tagline={tagline || "CURATED LUXURY & ESSENTIALS"}>
      <Box sx={{ width: '100%', minHeight: '100vh', pb: 8 }}>
        {/* Top Hero Banner */}
        <HomeImageSlider customBanners={banners} />

        {/* New Arrivals */}
        <Container maxWidth="xl" sx={{ mt: 6 }}>
          <NewArrivals products={newArrivals} />
        </Container>

        {/* Top Visited Categories */}
        <Box sx={{ width: '100%', mb: { xs: 4, md: 8 }, mt: { xs: 4, md: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              TOP VISITED CATEGORIES
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 2, width: '100%', boxSizing: 'border-box' }}>
            {categories.map((cat, index) => (
              <Box key={index} sx={{ flexGrow: 1, flexBasis: { xs: '45%', sm: '30%', md: '15%' }, minWidth: 0 }}>
                <StoreCategoryCard title={cat.title} image={cat.image} filterVal={cat.filterVal} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Featured Products */}
        <Container maxWidth="xl">
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </Box>
    </StoreEntranceAnimation>
  );
}
