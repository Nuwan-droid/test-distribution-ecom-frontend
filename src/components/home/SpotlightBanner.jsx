import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import SpotlightCard from '../common/SpotlightCard';

const colorfulBanners = [
  {
    id: 1,
    title: 'Bags & Luggage',
    subTitle: 'Stylish & Durable',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=90', // premium suitcase
    link: '/bags-luggage-store',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#7a5ac2', // purple from image
    bgColor: '#efe8fa', // light purple from image
  },
  {
    id: 2,
    title: 'Home Supplies',
    subTitle: 'Everything You Need',
    image: 'https://images.unsplash.com/photo-1584164104033-91db405625fb?w=1200&q=90', // modern kitchen setup
    link: '/products?category=Home%20%26%20Kitchen',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#1fa453', // green from image
    bgColor: '#e2f2e5', // light green from image
  },
  {
    id: 3,
    title: 'Pet Supplies',
    subTitle: 'Care & Comfort',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&q=90', // cute dog looking up
    link: '/pet-supplies-store',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#f1791f', // orange from image
    bgColor: '#fce8d5', // light orange from image
  },
  {
    id: 4,
    title: 'Women\'s Collections',
    subTitle: 'Professional & Chic',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=90', // beautiful dress on hanger/model
    link: '/womens-workwear',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#d63384', // pink
    bgColor: '#fceef4',
  },
  {
    id: 5,
    title: 'Footwear Store',
    subTitle: 'Step in Style',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90', // iconic red sneaker
    link: '/footwear-store',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#0d6efd', // blue
    bgColor: '#eff5fb',
  },
  {
    id: 6,
    title: 'Birthday Gifts',
    subTitle: 'Make Them Smile',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90', // luxurious gift boxes
    link: '/birthday-gifts',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#ffc107', // yellow
    bgColor: '#fff8e1',
  },
  {
    id: 7,
    title: 'School Supplies',
    subTitle: 'Back to School',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&q=90', // aesthetic stationery
    link: '/school-supplies-store',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#198754', // dark green
    bgColor: '#e9f5ec',
  },
];

export default function SpotlightBanner({ banners }) {
  const activeBanners = banners || colorfulBanners;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const heightStyle = { 
    height: '100%', 
    width: '100%', 
    minHeight: { xs: 200, sm: 220, md: 240, lg: 260 } 
  };

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        pt: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        pb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        position: 'relative',
      }}
    >
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          position: 'absolute',
          left: { xs: 10, md: 20 },
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
          flexDirection: 'row',
          gap: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          py: 1, // slight padding so box-shadows aren't clipped
        }}
      >
        {activeBanners.map((banner) => (
          <Box
            key={banner.id}
            sx={{
              flex: '0 0 auto',
              width: { xs: '85%', sm: '45%', md: '33.33%', lg: '33.33%', xl: '33.33%' },
              scrollSnapAlign: 'start',
              display: 'flex',
            }}
          >
            <SpotlightCard banner={banner} heightStyle={heightStyle} isLarge={false} />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          right: { xs: 10, md: 20 },
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
  );
}
