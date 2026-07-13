import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, TextField, Button, Divider,
  IconButton, List, ListItem, ListItemText, InputAdornment, Chip,
} from '@mui/material';
import {
  Facebook, Twitter, Instagram, YouTube, LinkedIn,
  Email, Phone, LocationOn, Send, ArrowForward,
} from '@mui/icons-material';
import { categories } from '../data/products';

const footerLinks = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Blog', path: '/blog' },
  ],
  support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Returns & Refunds', path: '/returns' },
    { label: 'Track Order', path: '/track' },
  ],
  policies: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Shipping Policy', path: '/shipping' },
  ],
};

const socialLinks = [
  { icon: <Facebook />, label: 'Facebook', href: '#' },
  { icon: <Instagram />, label: 'Instagram', href: '#' },
  { icon: <Twitter />, label: 'Twitter', href: '#' },
  { icon: <YouTube />, label: 'YouTube', href: '#' },
  { icon: <LinkedIn />, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0F172A',color:'white', mt: 'auto' }}>
      {/* Newsletter Strip */}
      <Box sx={{ bgcolor: 'primary.main', py: 5 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Get Exclusive Deals 🎁
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Subscribe to our newsletter and get 10% off your first order + early access to sales.
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email address..."
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'rgba(255,255,255,0.6)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      borderRadius: 2,
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                      '& input::placeholder': { color: 'rgba(255,255,255,0.6)' },
                      '& input': { color: 'white' },
                    },
                  }}
                  id="newsletter-email-input"
                />
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    px: 4,
                    '&:hover': { bgcolor: 'grey.100', boxShadow: 'none' },
                  }}
                  id="newsletter-subscribe-btn"
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Footer */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand + Contact */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 40, height: 40, borderRadius: 2,
                  background: 'linear-gradient(135deg, #0B1F5B 0%, #2563EB 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>O</Typography>
              </Box>
              <Typography variant="h5" fontWeight={800}>
                One<Box component="span" sx={{ color: 'primary.main' }}>Routes</Box>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 3, lineHeight: 1.8 }}>
              Quality products, great prices, and fast delivery.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'grey.400' }}>
                <Phone sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2">+94 71 5366314</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'grey.400' }}>
                <Email sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2">support@oneroutes.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, color: 'grey.400' }}>
                <LocationOn sx={{ fontSize: 18, color: 'primary.main', mt: 0.2 }} />
                <Typography variant="body2">No. 45, Galle Road Colombo 03</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              {socialLinks.map(s => (
                <IconButton
                  key={s.label}
                  href={s.href}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'grey.400',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' },
                    transition: 'all 0.2s',
                  }}
                  aria-label={s.label}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'white', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Company
            </Typography>
            <List dense disablePadding>
              {footerLinks.company.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 0.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: 'grey.400', textDecoration: 'none', fontSize: '0.875rem',
                      display: 'flex', alignItems: 'center', gap: 0.5,
                      '&:hover': { color: 'primary.main' }, transition: 'color 0.2s',
                    }}
                  >
                    <ArrowForward sx={{ fontSize: 12 }} /> {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'white', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Support
            </Typography>
            <List dense disablePadding>
              {footerLinks.support.map(link => (
                <ListItem key={link.label} disablePadding sx={{ mb: 0.5 }}>
                  <Box
                    component={Link}
                    to={link.path}
                    sx={{
                      color: 'grey.400', textDecoration: 'none', fontSize: '0.875rem',
                      display: 'flex', alignItems: 'center', gap: 0.5,
                      '&:hover': { color: 'primary.main' }, transition: 'color 0.2s',
                    }}
                  >
                    <ArrowForward sx={{ fontSize: 12 }} /> {link.label}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Top Categories */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'white', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Top Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map(cat => (
                <Chip
                  key={cat.id}
                  label={`${cat.icon} ${cat.name}`}
                  component={Link}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  clickable
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'grey.400',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' },
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Bottom Bar */}
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 2.5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center' }}>
            © {new Date().getFullYear()} OneRoutes. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {footerLinks.policies.map(link => (
              <Box
                key={link.label}
                component={Link}
                to={link.path}
                sx={{ color: 'grey.500', textDecoration: 'none', fontSize: '0.8rem', '&:hover': { color: 'primary.main' } }}
              >
                {link.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
