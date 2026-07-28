import React, { useRef } from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORY_STRIP, NAVIGATION_CATEGORIES, NAV_COLORS as C, useNavbar } from '../../context/NavbarContext';

export default function CategoryStrip({ items, parentCategory, navbarMode = false }) {
  const categoryScrollRef = useRef(null);
  const location = useLocation();
  const { scrolled } = useNavbar();
  
  const HERO_ROUTES = [
    '/',
    '/womens-workwear',
    '/bags-luggage-store',
    '/footwear-store',
    '/birthday-gifts',
    '/pet-supplies-store',
    '/school-supplies-store',
  ];
  const hasImageSlider = HERO_ROUTES.includes(location.pathname);
  const isSolidNavbar = !hasImageSlider || scrolled;
  
  const navTextColor = (navbarMode && isSolidNavbar) ? '#ffffff' : C.textPrimary;

  let displayItems = items || CATEGORY_STRIP;
  let currentParentCategory = parentCategory;
  
  const searchParams = new URLSearchParams(location.search);
  const urlCategory = searchParams.get('category');
  
  const shopCategoryMap = {
    '/womens-workwear': 'Women fashion',
    '/bags-luggage-store': 'Bags & Luggage',
    '/footwear-store': 'Footwear',
    '/birthday-gifts': 'Birthday Gifts',
    '/pet-supplies-store': 'Pet Supplies',
    '/school-supplies-store': 'School Supplies',
  };

  if (!items) {
    if (shopCategoryMap[location.pathname]) {
      const shopCat = shopCategoryMap[location.pathname];
      displayItems = NAVIGATION_CATEGORIES[shopCat] || [];
      currentParentCategory = shopCat;
    } else if (location.pathname === '/products' && urlCategory && NAVIGATION_CATEGORIES[urlCategory]) {
      displayItems = NAVIGATION_CATEGORIES[urlCategory];
      currentParentCategory = urlCategory;
    }
  }
  
  const formattedItems = displayItems.map(item => {
    if (typeof item === 'string') {
      const path = currentParentCategory 
        ? `/products?category=${encodeURIComponent(currentParentCategory)}&subcategory=${encodeURIComponent(item)}`
        : `/products?category=${encodeURIComponent(item)}`;
      return { label: item, path };
    }
    return item;
  });

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <IconButton
        onClick={() => scrollCategories('left')}
        sx={{
          position: 'absolute', left: 0, zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          width: 28, height: 28, color: (navbarMode && isSolidNavbar) ? 'white' : 'inherit',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
        }}
      >
        <ChevronLeft sx={{ fontSize: 18, color: (navbarMode && isSolidNavbar) ? 'secondary.main' : 'inherit' }} />
      </IconButton>

      <Box
        ref={categoryScrollRef}
        sx={{
          display: 'flex', alignItems: 'center', overflowX: 'auto', flex: 1,
          scrollBehavior: 'smooth', px: 3,
          '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none',
        }}
      >
        {formattedItems.map((cat, index) => (
          <Button
            key={cat.label || index}
            component={Link}
            to={cat.path}
            sx={{
              position: 'relative',
              color: navTextColor, fontWeight: 700, fontSize: '0.85rem', textTransform: 'none',
              whiteSpace: 'nowrap', py: 0.5, px: 1.5, minWidth: 'unset', flexShrink: 0,
              borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 0.5,
              '&:hover': { bgcolor: 'transparent' },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '2px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: '2px',
                bgcolor: 'currentColor',
                transition: 'width 0.3s ease',
                borderRadius: '2px',
              },
              '&:hover::after': { width: '60%' },
            }}
          >
            {cat.icon && <cat.icon sx={{ fontSize: 15, opacity: 0.8 }} />}
            {cat.label}
          </Button>
        ))}
      </Box>

      <IconButton
        onClick={() => scrollCategories('right')}
        sx={{
          position: 'absolute', right: 0, zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(8px)',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.05)',
          width: 28, height: 28, color: (navbarMode && isSolidNavbar) ? 'white' : 'inherit',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.7)' }
        }}
      >
        <ChevronRight sx={{ fontSize: 18, color: (navbarMode && isSolidNavbar) ? 'secondary.main' : 'inherit' }} />
      </IconButton>
    </Box>
  );
}
