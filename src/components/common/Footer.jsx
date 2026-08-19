import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Divider, IconButton, List, ListItem,
} from '@mui/material';
import {
  Facebook, Twitter, Instagram, YouTube, LocalMall,
} from '@mui/icons-material';

const footerLinks = {
  shop: [
    { label: 'All Categories', path: '/products' },
    { label: 'New Arrivals', path: '/products?filter=new' },
    { label: 'Best Sellers', path: '/products?filter=bestsellers' },
    { label: 'Special Offers', path: '/products?filter=deals' },
    { label: 'Gift Cards', path: '/gift-cards' },
  ],
  service: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Shipping & Delivery', path: '/shipping' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'Track Order', path: '/track' },
  ],
  about: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Press', path: '/press' },
    { label: 'Sustainability', path: '/sustainability' },
  ],
  help: [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Payment Methods', path: '/payment-methods' },
    { label: 'Cookie Policy', path: '/cookies' },
  ],
};

const socialLinks = [
  { icon: <Facebook fontSize="small" />, label: 'Facebook', href: '#' },
  { icon: <Instagram fontSize="small" />, label: 'Instagram', href: '#' },
  { icon: <Twitter fontSize="small" />, label: 'Twitter', href: '#' },
  { icon: <YouTube fontSize="small" />, label: 'YouTube', href: '#' },
];

const paymentMethods = [
  { label: 'VISA', color: '#1a1f71' },
  { label: 'MC', color: '#eb001b' },
  { label: 'PayPal', color: '#003087' },
  { label: 'AMEX', color: '#2e77bc' },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#ffffff', color: '#111111', mt: 'auto', borderTop: '1px solid #eeeeee' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 } }}>
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* Column 1: Brand & Description */}
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LocalMall sx={{ color: '#1a1a4b', fontSize: 28 }} />
              <Typography variant="h6" fontWeight={800} sx={{ color: '#1a1a4b', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
                OneRoutes
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666666', mb: 4, lineHeight: 1.8, fontSize: '0.9rem', maxWidth: 280 }}>
              Your one-stop shop for everything you need. Quality products, best prices and a great shopping experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialLinks.map(s => (
                <IconButton
                  key={s.label}
                  href={s.href}
                  size="small"
                  sx={{
                    border: '1px solid #e0e0e0',
                    color: '#666666',
                    '&:hover': { borderColor: '#1a1a4b', color: '#1a1a4b', bgcolor: 'transparent' },
                    transition: 'all 0.2s',
                  }}
                  aria-label={s.label}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Column 2: Shop */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, color: '#111111' }}>
              Shop
            </Typography>
            <List dense disablePadding>
              {footerLinks.shop.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 1.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: '#666666', textDecoration: 'none', fontSize: '0.9rem',
                      '&:hover': { color: '#1a1a4b', textDecoration: 'underline' }, transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Column 3: Customer Service */}
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, color: '#111111' }}>
              Customer Service
            </Typography>
            <List dense disablePadding>
              {footerLinks.service.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 1.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: '#666666', textDecoration: 'none', fontSize: '0.9rem',
                      '&:hover': { color: '#1a1a4b', textDecoration: 'underline' }, transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Column 4: About Us */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, color: '#111111' }}>
              About Us
            </Typography>
            <List dense disablePadding>
              {footerLinks.about.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 1.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: '#666666', textDecoration: 'none', fontSize: '0.9rem',
                      '&:hover': { color: '#1a1a4b', textDecoration: 'underline' }, transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Column 5: Help & Payments */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3, color: '#111111' }}>
              Help
            </Typography>
            <List dense disablePadding>
              {footerLinks.help.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 1.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: '#666666', textDecoration: 'none', fontSize: '0.9rem',
                      '&:hover': { color: '#1a1a4b', textDecoration: 'underline' }, transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 4, mb: 2, color: '#111111' }}>
              We Accept
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {paymentMethods.map(pm => (
                <Box
                  key={pm.label}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: '#f8f8f8',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    color: pm.color,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {pm.label}
                </Box>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* Bottom Bar & Divider */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 } }}>
        <Divider sx={{ borderColor: '#eeeeee' }} />
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: '#888888', fontWeight: 500 }}>
            © {new Date().getFullYear()} OneRoutes. All Rights Reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box component={Link} to="/terms" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, '&:hover': { color: '#1a1a4b' } }}>
              Terms of Use
            </Box>
            <Box component={Link} to="/privacy" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, '&:hover': { color: '#1a1a4b' } }}>
              Privacy Policy
            </Box>
            <Box component={Link} to="/sitemap" sx={{ color: '#888888', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, '&:hover': { color: '#1a1a4b' } }}>
              Sitemap
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}