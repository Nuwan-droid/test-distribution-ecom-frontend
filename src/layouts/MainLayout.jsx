import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  );
}
