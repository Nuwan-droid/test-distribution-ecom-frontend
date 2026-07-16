import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { NavbarProvider, useNavbar } from '../context/NavbarContext';

/* Inner wrapper so useNavbar() can access the provider above it */
function LayoutContent() {
  const location = useLocation();
  const { setAuthModalOpen, setAuthModalTab } = useNavbar();

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
      <Box component="main" sx={{ flex: 1 }}>
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
