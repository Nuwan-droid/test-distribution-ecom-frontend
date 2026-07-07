import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Badge, InputBase,
  Drawer, List, ListItem, ListItemText, ListItemButton, Divider,
  Avatar, Menu, MenuItem, Tooltip, Button, useMediaQuery, useTheme,
  Container, Chip,
} from '@mui/material';
import {
  ShoppingCart, Search, FavoriteBorder, Person, Menu as MenuIcon,
  Close, LocalShipping, Headset, Star, Logout,
  AccountCircle, ListAlt, LocationOn,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { categories } from '../data/products';



const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Deals', path: '/products?sort=discount' },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleUserMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <Box sx={{ bgcolor: 'secondary.main', py: 0.5, display: { xs: 'none', md: 'block' } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'grey.300', fontSize: '0.75rem' }}>
                <LocalShipping sx={{ fontSize: 14 }} />
                <Typography variant="caption">Free delivery on orders 150$+</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'grey.300', fontSize: '0.75rem' }}>
                <Star sx={{ fontSize: 14, color: '#F59E0B' }} />
                <Typography variant="caption">4.8★ Rated — 50,000+ Happy Customers</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'grey.300' }}>
                <Headset sx={{ fontSize: 14 }} />
                <Typography variant="caption">24/7 Support</Typography>
              </Box>
              <Chip label="New Arrivals 🔥" size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Navbar */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          top: 0,
          zIndex: 1100,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, gap: 2, minHeight: { xs: 60, md: 70 } }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ mr: -1 }}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexShrink: 0 }}
            >
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: 2,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem' }}>U</Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: 'text.primary', display: { xs: 'none', sm: 'block' } }}
              >
                U<Box component="span" sx={{ color: 'primary.main' }}>Buy</Box>
              </Typography>
            </Box>

            {/* Desktop Nav Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                {NAV_LINKS.map(link => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === link.path ? 700 : 500,
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                      px: 1.5,
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Search Bar */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: '100%', md: 480 },
                mx: { xs: 1, md: 2 },
                bgcolor: '#F3F4F6',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0.8,
                border: '2px solid transparent',
                transition: 'all 0.2s',
                '&:focus-within': { border: '2px solid', borderColor: 'primary.main', bgcolor: '#fff' },
              }}
            >
              <Search sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
              <InputBase
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ flex: 1, fontSize: '0.9rem' }}
                inputProps={{ id: 'navbar-search-input' }}
              />
            </Box>

            {/* Action Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Tooltip title="Wishlist">
                <IconButton component={Link} to="/wishlist" size="large" id="wishlist-btn">
                  <Badge badgeContent={wishlist.length} color="primary">
                    <FavoriteBorder />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart">
                <IconButton component={Link} to="/cart" size="large" id="cart-btn">
                  <Badge badgeContent={totalItems} color="primary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>

              {isLoggedIn ? (
                <>
                  <Tooltip title="Account">
                    <IconButton onClick={handleUserMenuOpen} size="large" id="account-btn">
                      <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{user?.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem component={Link} to="/account" onClick={handleUserMenuClose}>
                      <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} /> My Account
                    </MenuItem>
                    <MenuItem component={Link} to="/account?tab=orders" onClick={handleUserMenuClose}>
                      <ListAlt sx={{ mr: 1.5, fontSize: 20 }} /> My Orders
                    </MenuItem>
                    <MenuItem component={Link} to="/track" onClick={handleUserMenuClose}>
                      <LocationOn sx={{ mr: 1.5, fontSize: 20 }} /> Track Order
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      <Logout sx={{ mr: 1.5, fontSize: 20 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  to="/login"
                  startIcon={<Person />}
                  sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
                  id="login-btn"
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Category Strip (Desktop) */}
        {!isMobile && (
          <Box sx={{ bgcolor: '#F8F9FA', borderTop: '1px solid', borderColor: 'divider' }}>
            <Container maxWidth="xl">
              <Box sx={{ display: 'flex', gap: 0.5, py: 0.5, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    component={Link}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    size="small"
                    startIcon={<span style={{ fontSize: '1rem' }}>{cat.icon}</span>}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                      py: 0.5,
                      '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                    }}
                  >
                    {cat.name}
                  </Button>
                ))}
              </Box>
            </Container>
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, bgcolor: 'background.default' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={800}>
            U<Box component="span" sx={{ color: 'primary.main' }}>Buy</Box>
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        {isLoggedIn && (
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Avatar src={user?.avatar} />
            <Box>
              <Typography fontWeight={700} sx={{ fontSize: '0.9rem' }}>{user?.name}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>{user?.email}</Typography>
            </Box>
          </Box>
        )}
        <List>
          {NAV_LINKS.map(link => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton component={Link} to={link.path} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem>
            <Typography variant="overline" color="text.secondary" fontWeight={700}>Categories</Typography>
          </ListItem>
          {categories.map(cat => (
            <ListItem key={cat.id} disablePadding>
              <ListItemButton
                component={Link}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText
                  primary={<Box sx={{ display: 'flex', gap: 1 }}><span>{cat.icon}</span>{cat.name}</Box>}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          {isLoggedIn ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/account" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="My Account" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/wishlist" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Wishlist" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                  <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Login / Register" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}