import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Badge, InputBase,
  Drawer, List, ListItem, ListItemText, ListItemButton, Divider,
  Avatar, Menu, MenuItem, Tooltip, Button, useMediaQuery, useTheme,
  Container,
} from '@mui/material';
import {
  Search, FavoriteBorder, Person, Menu as MenuIcon, Close,
  KeyboardArrowDown, NotificationsNone, ShoppingCartOutlined,
  AccountCircle, ListAlt, LocationOn, Logout, PhoneIphone,
} from '@mui/icons-material';

import { useCart }     from '../context/CartContext';
import { useAuth }     from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import {
  useNavbar,
  ALL_DEPARTMENTS,
  DEPT_SELECT_OPTIONS,
  CATEGORY_STRIP,
  NAV_COLORS as C,
} from '../context/NavbarContext';
import logoImg from '../assets/logo.png';

/* ═══════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleLogout = () => {
    logout();
    setAccountAnchor(null);
  };

  /* ── render ── */
  return (
    <>
      {/* ══════════════ APPBAR ══════════════ */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: C.white,
          color: C.textPrimary,
          zIndex: 1100,
          borderBottom: `1px solid ${C.border}`,
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.07)' : 'none',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        {/* ── TOP ROW ── */}
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, gap: 1.5, minHeight: { xs: 60, md: 68 }, justifyContent: 'space-between' }}>

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: C.textPrimary, mr: -0.5 }}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <Box component="img" src={logoImg} alt="OneRoutes" sx={{ height: { xs: 38, md: 44 }, width: 'auto', objectFit: 'contain' }} />
            </Box>

            {/* ── SEARCH BAR (centred) ── */}
            <Box
              sx={{
                flex: '0 1 560px',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                bgcolor: C.bg,
                borderRadius: '24px',
                border: '1.5px solid transparent',
                overflow: 'hidden',
                transition: 'all 0.2s',
                '&:focus-within': {
                  border: `1.5px solid ${C.border}`,
                  bgcolor: C.white,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                },
              }}
            >
              {/* Department mini-selector (desktop only) */}
              {!isMobile && (
                <>
                  <Button
                    id="dept-select-btn"
                    onClick={(e) => setDeptMenuAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDown sx={{ fontSize: 14 }} />}
                    sx={{
                      color: C.textSecond,
                      fontWeight: 500,
                      fontSize: '0.78rem',
                      textTransform: 'none',
                      px: 1.5,
                      py: 1.1,
                      borderRadius: 0,
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      borderRight: `1px solid ${C.border}`,
                      '&:hover': { bgcolor: '#EFEFEF', color: C.textPrimary },
                    }}
                  >
                    {selectedDept}
                  </Button>
                  <Menu
                    anchorEl={deptMenuAnchor}
                    open={Boolean(deptMenuAnchor)}
                    onClose={() => setDeptMenuAnchor(null)}
                    PaperProps={{
                      sx: { mt: 0.5, borderRadius: 2, minWidth: 180, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: `1px solid ${C.border}` },
                    }}
                  >
                    {DEPT_SELECT_OPTIONS.map((d) => (
                      <MenuItem
                        key={d}
                        selected={selectedDept === d}
                        onClick={() => { setSelectedDept(d); setDeptMenuAnchor(null); }}
                        sx={{
                          fontSize: '0.85rem',
                          py: 0.9,
                          fontWeight: selectedDept === d ? 600 : 400,
                          color: selectedDept === d ? C.accent : C.textPrimary,
                          '&.Mui-selected': { bgcolor: C.accentHover },
                          '&:hover': { bgcolor: C.accentHover, color: C.accent },
                        }}
                      >
                        {d}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              <InputBase
                placeholder="Search Here ..!"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ flex: 1, px: 2, fontSize: '0.9rem', color: C.textPrimary }}
                inputProps={{ id: 'navbar-search-input' }}
              />

              <IconButton
                onClick={handleSearchClick}
                sx={{ px: 1.5, borderRadius: 0, color: C.textSecond, '&:hover': { color: C.accent, bgcolor: 'transparent' } }}
              >
                <Search sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {/* ── ACTION ICONS (far right) ── */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, md: 0.5 }, flexShrink: 0, ml: 'auto' }}>

              {/* Log in / Account */}
              {isLoggedIn ? (
                <>
                  <Button
                    id="account-btn"
                    onClick={(e) => setAccountAnchor(e.currentTarget)}
                    startIcon={<Avatar src={user?.avatar} sx={{ width: 22, height: 22 }} />}
                    endIcon={<KeyboardArrowDown sx={{ fontSize: 14 }} />}
                    sx={{
                      color: C.textPrimary, fontWeight: 500, fontSize: '0.85rem', textTransform: 'none',
                      display: { xs: 'none', sm: 'flex' }, borderRadius: 2, px: 1.2,
                      '&:hover': { bgcolor: C.bg },
                    }}
                  >
                    {user?.name?.split(' ')[0]}
                  </Button>
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
                <Button
                  id="login-btn"
                  onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); }}
                  startIcon={<Person sx={{ fontSize: 20 }} />}
                  endIcon={<KeyboardArrowDown sx={{ fontSize: 14 }} />}
                  sx={{
                    color: C.textPrimary, fontWeight: 500, fontSize: '0.85rem', textTransform: 'none',
                    display: { xs: 'none', sm: 'flex' }, borderRadius: 2, px: 1.2,
                    '&:hover': { bgcolor: C.bg },
                  }}
                >
                  Log in
                </Button>
              )}

              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton id="notifications-btn" sx={{ color: C.textSecond, '&:hover': { bgcolor: C.bg, color: C.textPrimary } }}>
                  <NotificationsNone sx={{ fontSize: 22 }} />
                </IconButton>
              </Tooltip>

              {/* Wishlist */}
              <Tooltip title="Wishlist">
                <IconButton id="wishlist-btn" component={Link} to="/wishlist" sx={{ color: C.textSecond, '&:hover': { bgcolor: C.bg, color: C.textPrimary } }}>
                  <Badge badgeContent={wishlist.length} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.62rem', minWidth: 15, height: 15 } }}>
                    <FavoriteBorder sx={{ fontSize: 22 }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Cart */}
              <Tooltip title="Cart">
                <IconButton id="cart-btn" component={Link} to="/cart" sx={{ color: C.textSecond, '&:hover': { bgcolor: C.bg, color: C.textPrimary } }}>
                  <Badge badgeContent={totalItems} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.62rem', minWidth: 15, height: 15 } }}>
                    <ShoppingCartOutlined sx={{ fontSize: 22 }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Get App */}
              <Button
                id="get-app-btn"
                href="#"
                startIcon={<PhoneIphone sx={{ fontSize: 17 }} />}
                variant="contained"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  ml: 0.5,
                  bgcolor:'secondary.main',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textTransform: 'none',
                  borderRadius: '20px',
                  px: 2,
                  py: 0.7,
                  whiteSpace: 'nowrap',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#1447C0', boxShadow: 'none' },
                }}
              >
                Get app
              </Button>
            </Box>
          </Toolbar>
        </Container>

        {/* ── CATEGORY STRIP (Desktop) ── */}
        {!isMobile && (
          <Box sx={{ bgcolor: C.white, borderTop: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <Container maxWidth="xl" disableGutters>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: { xs: 2, md: 3 },
                  py: 0.6,
                  overflowX: 'auto',
                  flexWrap: 'nowrap',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                }}
              >
              {/* All Categories pill */}
              <Button
                id="all-departments-btn"
                onClick={(e) => setAllDeptsAnchor(e.currentTarget)}
                endIcon={
                  <KeyboardArrowDown
                    sx={{
                      fontSize: 15,
                      transition: 'transform 0.2s',
                      transform: Boolean(allDeptsAnchor) ? 'rotate(180deg)' : 'none',
                    }}
                  />
                }
                sx={{
                  color: C.textPrimary, fontWeight: 700, fontSize: '0.82rem', textTransform: 'none',
                  border: `1.5px solid ${C.textPrimary}`, borderRadius: '20px',
                  px: 2, py: 0.5, mr: 1.5, flexShrink: 0, whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: C.bg },
                }}
              >
                All Categories
              </Button>

              {/* All Categories dropdown */}
              <Menu
                anchorEl={allDeptsAnchor}
                open={Boolean(allDeptsAnchor)}
                onClose={() => setAllDeptsAnchor(null)}
                PaperProps={{
                  sx: {
                    mt: 0.5, width: 270, maxHeight: 480,
                    borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${C.border}`,
                    overflowY: 'auto',
                  },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              >
                {ALL_DEPARTMENTS.map((dept, idx) => (
                  <MenuItem
                    key={dept}
                    onClick={() => handleDeptNavigate(dept, idx)}
                    sx={{
                      fontSize: '0.875rem', py: 1,
                      fontWeight: idx === 0 ? 600 : 400,
                      borderBottom: idx === 0 ? `1px solid ${C.border}` : 'none',
                      '&:hover': { bgcolor: C.accentHover, color: C.accent },
                    }}
                  >
                    {dept}
                  </MenuItem>
                ))}
              </Menu>

              {/* Divider */}
              <Box sx={{ width: '1px', height: 18, bgcolor: C.border, mr: 1.5, flexShrink: 0 }} />

              {/* Category links */}
              {CATEGORY_STRIP.map((cat) => (
                <Button
                  key={cat.label}
                  component={Link}
                  to={cat.path}
                  sx={{
                    color: C.textSecond, fontWeight: 500, fontSize: '0.82rem', textTransform: 'none',
                    whiteSpace: 'nowrap', py: 0.5, px: 1.5, minWidth: 'unset', flexShrink: 0,
                    borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 0.5,
                    '&:hover': { color: C.accent, bgcolor: C.accentHover },
                  }}
                >
                  {cat.icon && <cat.icon sx={{ fontSize: 15, opacity: 0.8 }} />}
                  {cat.label}
                </Button>
              ))}
            </Box>
            </Container>
          </Box>
        )}
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