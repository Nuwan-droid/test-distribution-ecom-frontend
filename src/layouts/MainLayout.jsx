import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AuthModal from '../components/auth/AuthModal';
import { NavbarProvider, useNavbar } from '../context/NavbarContext';

/* Inner wrapper so useNavbar() can access the provider above it */
function LayoutContent() {
  const location = useLocation();
  const { setAuthModalOpen, setAuthModalTab } = useNavbar();

  // Determine if the current page has a hero banner that should consume the navbar space
  const isHeroPage = location.pathname === '/' || location.pathname === '/womens-workwear';

  /* Auto-open modal when redirected from /login or /register */
  useEffect(() => {
    if (location.state?.openAuth) {
      setAuthModalTab(location.state.openAuth);
      setAuthModalOpen(true);
      // Clear state so back-navigation doesn't re-open
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/* If it's a hero page, start at the very top (0). Otherwise, push content down so it's not hidden behind the fixed Navbar. */}
      <Box component="main" sx={{ flex: 1, pt: isHeroPage ? 0 : { xs: 9, md: 12 } }}>
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
      <AuthModal />
    </Box>
  );
}

export default function MainLayout() {
  return (
    <NavbarProvider>
      <LayoutContent />
    </NavbarProvider>
  );
}
