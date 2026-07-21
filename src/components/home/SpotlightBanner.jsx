import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import birthdayGiftsImg from '../../assets/birthday_gifts.jpg';

export default function SpotlightBanner() {
  const banners = [
    {
      id: 1,
      title: 'Make birthdays\nextra special',
      image: birthdayGiftsImg,
      link: '/birthday-gifts',
      btnLabel: 'Shop',
      bgColor: '#F3EFEA',
      gradient: {
        xs: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)',
        md: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 45%, rgba(0, 0, 0, 0) 100%)',
      },
      titleColor: '#FFFFFF',
      btnColor: 'secondary.main',
    },
    {
      id: 2,
      title: "Trendy Women's Fashion",
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      link: '/womens-workwear',
      btnLabel: 'Shop',
      bgColor: '#e6e6e6',
      gradient: {
        xs: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)',
        md: 'linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 45%, rgba(0, 0, 0, 0) 100%)',
      },
      titleColor: '#FFFFFF',
      btnColor: 'secondary.main',
    }
  ];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {banners.map((banner) => (
              <Box
                key={banner.id}
                sx={{
                  flex: '1 1 50%',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: banner.bgColor,
                  minHeight: { xs: 280, sm: 320, md: 380, lg: 450, xl: 500 },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />

                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: banner.gradient,
                    pointerEvents: 'none',
                  }}
                />

                {/* Foreground Overlay Content */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    zIndex: 2,
                    p: { xs: 3, sm: 4, md: 5, lg: 6 },
                    maxWidth: { xs: '85%', sm: '75%', md: '70%' },
                    flexGrow: 1,
                  }}
                >
                  {banner.id === 2 ? (
                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: '#FFFFFF', fontWeight: 600, letterSpacing: 2, mb: -0.5, fontSize: { xs: '0.9rem', md: '1.1rem' } }}
                      >
                        Trendy
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem', lg: '3.4rem', xl: '3.8rem' },
                          lineHeight: 1,
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 1
                        }}
                      >
                        Women's Fashion
                       
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.6rem', sm: '2rem', md: '2.2rem', lg: '2.6rem', xl: '3rem' },
                        lineHeight: 1.15,
                        color: banner.titleColor,
                        mb: 2.5,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {banner.title}
                    </Typography>
                  )}

                  <Button
                    component={Link}
                    to={banner.link}
                    variant="contained"
                    sx={{
                      bgcolor: banner.btnColor,
                      color: '#FFFFFF',
                      px: { xs: 3, md: 4 },
                      py: { xs: 1, md: 1.25 },
                      borderRadius: 1,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      width: 'fit-content',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: '#111111',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {banner.btnLabel}
                  </Button>
                </Box>
              </Box>
          ))}
    </Box>
  );
}
