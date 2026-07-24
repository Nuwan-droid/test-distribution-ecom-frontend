import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, TextField, Button, Divider,
  IconButton, List, ListItem, InputAdornment,
} from '@mui/material';
import {
  Facebook, Twitter, Instagram, YouTube, LinkedIn,
  Email, Phone, LocationOn, Send, ArrowForward, CardGiftcard,
} from '@mui/icons-material';

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
    <Box component="footer" sx={{ bgcolor: 'secondary.main', color: 'white', mt: 'auto' }}>

      {/* Main Footer */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Brand + Contact */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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

          {/* Company + Support grouped together, pushed to the right */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              ml: { md: 'auto' },
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: { xs: 4, sm: 6, md: 8, lg: 12 },
            }}
          >
            <Box sx={{ minWidth: 120 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ mb: 2, color: 'white', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}
              >
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
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ mb: 2, color: 'white', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem' }}
              >
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
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
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