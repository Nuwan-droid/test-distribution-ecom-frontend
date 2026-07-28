import React from 'react';
import { Box } from '@mui/material';
import SpotlightCard from '../common/SpotlightCard';

const defaultTopBanners = [
  {
    id: 1,
    title: 'Make birthdays\nextra special',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    link: '/birthday-gifts',
    btnLabel: 'Shop Now',
    textColor: '#111111',
  },
  {
    id: 2,
    title: "Trendy Women's\nFashion",
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    link: '/womens-workwear',
    btnLabel: 'Explore Collection',
    textColor: '#111111',
  },
  {
    id: 3,
    title: 'Trending Footwear &\nSneakers',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    link: '/footwear-store',
    btnLabel: 'Shop Footwear',
    textColor: '#111111',
  },
];

const defaultBottomBanners = [
  {
    id: 1,
    title: 'Bags & Luggage\nShop',
    image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=80',
    link: '/bags-luggage-store',
    btnLabel: 'Explore Bags',
    textColor: '#111111',
  },
  {
    id: 2,
    title: 'Pet Supplies &\nAccessories',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80',
    link: '/pet-supplies-store',
    btnLabel: 'Shop Pet Care',
    textColor: '#111111',
  },
  {
    id: 3,
    title: 'School Supplies\nEssentials',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    link: '/school-supplies-store',
    btnLabel: 'Shop Now',
    textColor: '#111111',
  },
];

export default function SpotlightBanner({ banners, layout = 'left-large' }) {
  const isRightLarge = layout === 'right-large';

  // Choose appropriate default banner set based on layout if not provided
  const activeBanners = banners || (isRightLarge ? defaultBottomBanners : defaultTopBanners);
  const [firstBanner, secondBanner, thirdBanner] = activeBanners;

  // Reduced height settings for sleek modern widescreen design across all MUI breakpoints
  const largeCardStyle = { width: '100%', minHeight: { xs: 240, sm: 280, md: 380, lg: 400, xl: 420 } };
  const smallTopCardStyle = { flex: '1 1 50%', minHeight: { xs: 180, sm: 190, md: 180, lg: 190, xl: 200 } };
  const smallBottomCardStyle = { flex: '1 1 50%', minHeight: { xs: 180, sm: 190, md: 180, lg: 190, xl: 200 } };

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        pt: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        pb: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
      }}
    >
      {isRightLarge ? (
        <>
          {/* LEFT COLUMN — 2 Stacked Cards */}
          <Box sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
            <SpotlightCard banner={firstBanner} heightStyle={smallTopCardStyle} />
            <SpotlightCard banner={secondBanner} heightStyle={smallBottomCardStyle} />
          </Box>

          {/* RIGHT COLUMN — 1 Large Tall Card */}
          <Box sx={{ flex: '1 1 50%', display: 'flex' }}>
            <SpotlightCard banner={thirdBanner} heightStyle={largeCardStyle} isLarge={true} />
          </Box>
        </>
      ) : (
        <>
          {/* LEFT COLUMN — 1 Large Tall Card */}
          <Box sx={{ flex: '1 1 50%', display: 'flex' }}>
            <SpotlightCard banner={firstBanner} heightStyle={largeCardStyle} isLarge={true} />
          </Box>

          {/* RIGHT COLUMN — 2 Stacked Cards */}
          <Box sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
            <SpotlightCard banner={secondBanner} heightStyle={smallTopCardStyle} />
            <SpotlightCard banner={thirdBanner} heightStyle={smallBottomCardStyle} />
          </Box>
        </>
      )}
    </Box>
  );
}
