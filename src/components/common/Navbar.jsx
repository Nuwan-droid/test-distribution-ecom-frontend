import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Badge, InputBase,
  Drawer, List, ListItem, ListItemText, ListItemButton, Divider,
  Avatar, Menu, MenuItem, Tooltip, Button, useMediaQuery, useTheme,
  Container, Popover,
} from '@mui/material';
import {
  Search, FavoriteBorder, Person, Menu as MenuIcon, Close,
  KeyboardArrowDown, NotificationsNone, ShoppingCartOutlined,
  AccountCircle, ListAlt, LocationOn, Logout, PhoneIphone,
  ChevronRight, ChevronLeft,
} from '@mui/icons-material';

import { useCart }     from '../../context/CartContext';
import { useAuth }     from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  useNavbar,
  ALL_DEPARTMENTS,
  DEPT_SELECT_OPTIONS,
  NAVIGATION_CATEGORIES,
  NAV_COLORS as C,
} from '../../context/NavbarContext';
import logoImg from '../../assets/logo.png';

/* ═══════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /* External contexts */
  const { totalItems }              = useCart();
  const { wishlist }                = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();

  /* Navbar-specific state & handlers */
  const {
    drawerOpen,     setDrawerOpen,
    searchQuery,    setSearchQuery,
    selectedDept,   setSelectedDept,
    deptMenuAnchor, setDeptMenuAnchor,
    allDeptsAnchor, setAllDeptsAnchor,
    accountAnchor,  setAccountAnchor,
    scrolled,
    authModalOpen,  setAuthModalOpen,
    authModalTab,   setAuthModalTab,
    handleSearch,
    handleSearchClick,
    handleDeptNavigate,
  } = useNavbar();

  const navigate = useNavigate();
  const location = useLocation();
  const [activeCat, setActiveCat] = useState('Electronics');

  // Auto-sync category state with URL when navigating to a specific shop
  useEffect(() => {
    const shopCategoryMap = {
      '/womens-workwear': 'Women fashion',
      '/bags-luggage-store': 'Bags & Luggage',
      '/footwear-store': 'Footwear',
      '/birthday-gifts': 'Birthday Gifts',
      '/pet-supplies-store': 'Pet Supplies',
      '/school-supplies-store': 'School Supplies',
    };

    let cat = null;
    if (shopCategoryMap[location.pathname]) {
      cat = shopCategoryMap[location.pathname];
    } else if (location.pathname === '/products') {
      const params = new URLSearchParams(location.search);
      cat = params.get('category');
    }
    
    if (cat && NAVIGATION_CATEGORIES[cat]) {
      setActiveCat(cat);
      setSelectedDept(cat);
    } else if (location.pathname === '/' || location.pathname === '') {
      setSelectedDept('All');
    }
  }, [location.pathname, location.search, setSelectedDept]);

  const handleLogout = () => {
    logout();
    setAccountAnchor(null);
  };

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

  const navTextColor  = '#ffffff';
  const navTextSecond = 'rgba(255,255,255,0.85)';
  // Icon colour: secondary.main over the hero slider, white once scrolled
  const iconColor = isSolidNavbar ? navTextSecond : 'secondary.main';

  /* ── render ── */
  return (
    <>
      {/* ══════════════ APPBAR ══════════════ */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isSolidNavbar ? 'secondary.main' : 'transparent',
          backdropFilter: isSolidNavbar ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isSolidNavbar ? 'blur(16px)' : 'none',
          color: navTextColor,
          zIndex: 1100,
          borderBottom: isSolidNavbar ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── TOP ROW ── */}
        <Container maxWidth={false} sx={{ maxWidth: 2400, mx: 'auto', px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 } }}>
          <Toolbar
            sx={{
              py: { xs: 1.5, sm: 0.5 },
              gap: 1.5,
              minHeight: { xs: 70, sm: 90 },
              justifyContent: 'space-between',
              position: 'relative',
              flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Allow wrapping only on mobile (xs)
            }}
          >

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: navTextColor, mr: -0.5, order: 1 }}>
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}

            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, mr: { sm: 2 }, order: 2 }}>
              <Box component="img" src={logoImg} alt="OneRoutes Logo" sx={{ height: { xs: 26, sm: 34 }, width: 'auto', objectFit: 'contain', mr: 1 }} />
              <Typography sx={{ color: navTextColor, fontWeight: 800, fontSize: { xs: '1.3rem', sm: '1.6rem' }, letterSpacing: '-0.5px' }}>
                OneRoutes
              </Typography>
            </Box>

            {/* ── UNIFIED SEARCH BAR (Middle aligned) ── */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  mx: { sm: 2, md: 4, lg: 6 },
                  bgcolor: '#ffffff',
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  order: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {/* 1. All Categories Button */}
                <Button
                  id="all-departments-btn"
                  onClick={(e) => setAllDeptsAnchor(e.currentTarget)}
                  disableRipple
                  startIcon={<MenuIcon sx={{ fontSize: 20, color: '#555' }} />}
                  endIcon={
                    <KeyboardArrowDown
                      sx={{
                        fontSize: 20,
                        color: '#555',
                        transition: 'transform 0.2s',
                        transform: Boolean(allDeptsAnchor) ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  }
                  sx={{
                    color: '#333',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    px: { sm: 1.5, md: 2.5 },
                    py: 1.2,
                    height: '100%',
                    bgcolor: '#f5f5f5',
                    borderRadius: 0,
                    whiteSpace: 'nowrap',
                    borderRight: '1px solid #e0e0e0',
                    '&:hover': { bgcolor: '#ebebeb' },
                    '& .MuiButton-startIcon': { marginRight: '6px' },
                    '& .MuiButton-endIcon': { marginLeft: '4px' }
                  }}
                >
                  All Categories
                </Button>

                <Popover
                  anchorEl={allDeptsAnchor}
                  open={Boolean(allDeptsAnchor)}
                  onClose={() => setAllDeptsAnchor(null)}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      width: 480,
                      height: 350,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      border: `1px solid rgba(255, 255, 255, 0.3)`,
                      overflow: 'hidden',
                    },
                  }}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflow: 'hidden' }}>
                    {/* Left Column: Categories List */}
                    <Box sx={{ width: '200px', borderRight: `1px solid rgba(0,0,0,0.06)`, overflowY: 'auto', bgcolor: 'rgba(0,0,0,0.02)', py: 1, flexShrink: 0 }}>
                      {Object.keys(NAVIGATION_CATEGORIES).map((cat) => (
                        <Box
                          key={cat}
                          onMouseEnter={() => setActiveCat(cat)}
                          component={Link}
                          to={`/products?category=${encodeURIComponent(cat)}`}
                          onClick={() => setAllDeptsAnchor(null)}
                          sx={{
                            px: 2,
                            py: 1.25,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none',
                            color: activeCat === cat ? C.accent : C.textPrimary,
                            bgcolor: activeCat === cat ? C.accentHover : 'transparent',
                            fontWeight: activeCat === cat ? 700 : 500,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            '&:hover': {
                              bgcolor: C.accentHover,
                              color: 'secondary.main',
                            }
                          }}
                        >
                          <span>{cat}</span>
                          <ChevronRight sx={{ fontSize: 16, opacity: 0.7 }} />
                        </Box>
                      ))}
                    </Box>

                    {/* Right Column: Subcategories List */}
                    <Box sx={{ flex: 1, overflowY: 'auto', py: 1.5, px: 2, bgcolor: 'transparent' }}>
                      {NAVIGATION_CATEGORIES[activeCat]?.map((sub) => (
                        <Box
                          key={sub}
                          component={Link}
                          to={`/products?category=${encodeURIComponent(activeCat)}&subcategory=${encodeURIComponent(sub)}`}
                          onClick={() => setAllDeptsAnchor(null)}
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1.5,
                            display: 'block',
                            textDecoration: 'none',
                            color: C.textPrimary,
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'background-color 0.15s, color 0.15s',
                            '&:hover': {
                              bgcolor: 'rgba(0,0,0,0.04)',
                              color: 'secondary.main',
                            }
                          }}
                        >
                          {sub}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Popover>

                {/* 2. Search Input and Button */}
                <InputBase
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  sx={{
                    flex: 1,
                    px: 2,
                    color: '#333',
                    fontSize: '0.95rem',
                    '& input::placeholder': { color: '#888', opacity: 1 },
                  }}
                  inputProps={{ id: 'navbar-search-input' }}
                />

                <Button
                  onClick={handleSearchClick}
                  variant="contained"
                  sx={{
                    minWidth: 'unset',
                    px: 3,
                    py: 1.3,
                    borderRadius: 0,
                    bgcolor: 'secondary.main',
                    color:   '#fff',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: scrolled ? 'rgba(0,0,0,0.04)' : 'secondary.dark', boxShadow: 'none' },
                  }}
                >
                  <Search sx={{ fontSize: 24 }} />
                </Button>
              </Box>
            )}

            {/* Mobile Search Bar */}
            {isMobile && (
              <Box
                sx={{
                  width: '100%',
                  flex: '1 1 100%',
                  mx: 0,
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  order: 4,
                  bgcolor: '#ffffff',
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <InputBase
                  placeholder=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  sx={{ flex: 1, px: 2, py: 0.7, fontSize: '0.9rem', color: '#333', '& input::placeholder': { color: '#888', opacity: 1 } }}
                  inputProps={{ id: 'navbar-search-input-mobile' }}
                />
                <Button
                  onClick={handleSearchClick}
                  variant="contained"
                  sx={{
                    minWidth: 'unset',
                    px: 2,
                    py: 1,
                    borderRadius: 0,
                    bgcolor: scrolled ? 'transparent' : 'secondary.main',
                    color: scrolled ? 'secondary.main' : '#fff',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: scrolled ? 'rgba(0,0,0,0.04)' : 'secondary.dark', boxShadow: 'none' },
                  }}
                >
                  <Search sx={{ fontSize: 20 }} />
                </Button>
              </Box>
            )}

            {/* ── ACTION ICONS (far right) ── */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3.5 }, flexShrink: 0, ml: 'auto', order: 5 }}>

              {/* Log in / Account */}
              {isLoggedIn ? (
                <>
                  <Box
                    id="account-btn"
                    onClick={(e) => setAccountAnchor(e.currentTarget)}
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                      color: navTextColor, transition: 'all 0.2s', '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    <Person sx={{ fontSize: { xs: 24, sm: 28 } }} />
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, mt: 0.5, display: { xs: 'none', sm: 'block' } }}>Account</Typography>
                  </Box>
                  <Menu
                    anchorEl={accountAnchor}
                    open={Boolean(accountAnchor)}
                    onClose={() => setAccountAnchor(null)}
                    PaperProps={{
                      sx: { mt: 1, minWidth: 210, borderRadius: 2, boxShadow: '0 4px 24px rgba(0,0,0,0.11)', border: `1px solid ${C.border}` },
                    }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem component={Link} to="/account" onClick={() => setAccountAnchor(null)} sx={{ fontSize: '0.875rem' }}>
                      <AccountCircle sx={{ mr: 1.5, fontSize: 19, color: C.textSecond }} /> My Account
                    </MenuItem>
                    <MenuItem component={Link} to="/account?tab=orders" onClick={() => setAccountAnchor(null)} sx={{ fontSize: '0.875rem' }}>
                      <ListAlt sx={{ mr: 1.5, fontSize: 19, color: C.textSecond }} /> My Orders
                    </MenuItem>
                    <MenuItem component={Link} to="/track" onClick={() => setAccountAnchor(null)} sx={{ fontSize: '0.875rem' }}>
                      <LocationOn sx={{ mr: 1.5, fontSize: 19, color: C.textSecond }} /> Track Order
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem', color: 'error.main' }}>
                      <Logout sx={{ mr: 1.5, fontSize: 19 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box
                  id="login-btn"
                  onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); }}
                  sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                    color: iconColor, transition: 'all 0.2s', '&:hover': { color: navTextColor, transform: 'scale(1.05)' }
                  }}
                >
                  <Person sx={{ fontSize: { xs: 24, sm: 28 } }} />
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, mt: 0.5, display: { xs: 'none', sm: 'block' } }}>Account</Typography>
                </Box>
              )}

              {/* Wishlist */}
              <Box
                component={Link}
                to="/wishlist"
                id="wishlist-btn"
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none',
                  color: iconColor, transition: 'all 0.2s', '&:hover': { color: navTextColor, transform: 'scale(1.05)' }
                }}
              >
                <Badge badgeContent={wishlist.length} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16, bgcolor: '#e74c3c' } }}>
                  <FavoriteBorder sx={{ fontSize: { xs: 24, sm: 28 } }} />
                </Badge>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, mt: 0.5, display: { xs: 'none', sm: 'block' } }}>Wishlist</Typography>
              </Box>

              {/* Cart */}
              <Box
                component={Link}
                to="/cart"
                id="cart-btn"
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none',
                  color: iconColor, transition: 'all 0.2s', '&:hover': { color: navTextColor, transform: 'scale(1.05)' }
                }}
              >
                <Badge badgeContent={totalItems} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', minWidth: 16, height: 16, bgcolor: '#e74c3c' } }}>
                  <ShoppingCartOutlined sx={{ fontSize: { xs: 24, sm: 28 } }} />
                </Badge>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, mt: 0.5, display: { xs: 'none', sm: 'block' } }}>Cart</Typography>
              </Box>

            </Box>
          </Toolbar>
        </Container>


      </AppBar>

      {/* ══════════════ MOBILE DRAWER ══════════════ */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: C.white } }}
      >
        {/* Drawer header */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box component="img" src={logoImg} alt="OneRoutes" sx={{ height: 38, objectFit: 'contain' }} />
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: C.textSecond }}>
            <Close />
          </IconButton>
        </Box>
        <Divider />

        {/* User info strip */}
        {isLoggedIn && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: C.bg }}>
            <Avatar src={user?.avatar} sx={{ width: 34, height: 34 }} />
            <Box>
              <Typography fontWeight={700} sx={{ fontSize: '0.88rem', color: C.textPrimary }}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>
        )}

        {/* Departments list */}
        <List dense>
          <ListItem sx={{ pt: 1.5, pb: 0.5 }}>
            <Typography variant="overline" sx={{ color: C.textSecond, fontWeight: 700, fontSize: '0.7rem', letterSpacing: 1 }}>
              All Categories
            </Typography>
          </ListItem>
          {ALL_DEPARTMENTS.map((dept, idx) => (
            <ListItem key={dept} disablePadding>
              <ListItemButton
                component={Link}
                to={idx === 0 ? '/products' : `/products?category=${encodeURIComponent(dept)}`}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 0.7, '&:hover': { bgcolor: C.accentHover, color: C.accent } }}
              >
                <ListItemText
                  primary={dept}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: idx === 0 ? 600 : 400,
                    color: idx === 0 ? C.textPrimary : C.textSecond,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider sx={{ my: 1 }} />

          {/* Auth links */}
          {isLoggedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/account" onClick={() => setDrawerOpen(false)} sx={{ '&:hover': { color: C.accent } }}>
                  <ListItemText primary="My Account" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/wishlist" onClick={() => setDrawerOpen(false)} sx={{ '&:hover': { color: C.accent } }}>
                  <ListItemText primary="Wishlist" primaryTypographyProps={{ fontSize: '0.875rem' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.875rem', color: 'error.main' }} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={() => { setDrawerOpen(false); setAuthModalTab('login'); setAuthModalOpen(true); }} sx={{ '&:hover': { color: C.accent } }}>
                <ListItemText primary="Login / Register" primaryTypographyProps={{ fontSize: '0.875rem' }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}