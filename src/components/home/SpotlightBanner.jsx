import React from 'react';
import { Box, keyframes } from '@mui/material';
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
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=90', // beautiful modern living room
    link: '/products?category=Home%20%26%20Kitchen',
    btnLabel: 'Shop Now',
    textColor: '#111111',
    btnBgColor: '#1fa453', // green
    bgColor: '#e2f2e5', // light green
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

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 1.75rem)); } /* -50% of content plus half the gap to loop seamlessly */
`;

export default function SpotlightBanner({ banners }) {
  const activeBanners = banners || colorfulBanners;

  const heightStyle = { 
    height: '100%', 
    width: '100%', 
    minHeight: { xs: 200, sm: 220, md: 240, lg: 260 } 
  };

  return (
    <Box
      sx={{
        width: '100%',
        pt: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        pb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        overflow: 'hidden', // Hide overflow for the marquee
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
          width: 'max-content',
          animation: `${marqueeAnimation} 40s linear infinite`,
          '&:hover': {
            animationPlayState: 'paused', // Pause animation on hover
          },
          py: 1, 
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }, // Apply padding to the track instead of the wrapper
        }}
      >
        {/* Duplicate the banners array to create an infinite loop effect */}
        {[...activeBanners, ...activeBanners].map((banner, index) => (
          <Box
            key={`${banner.id}-${index}`}
            sx={{
              flex: '0 0 auto',
              width: { xs: '280px', sm: '320px', md: '360px', lg: '400px', xl: '420px' },
              display: 'flex',
            }}
          >
            <SpotlightCard banner={banner} heightStyle={heightStyle} isLarge={false} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
