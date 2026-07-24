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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3, lg: 4 }, p: { xs: 2, md: 4, lg: 6 } }}>
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
                  flexDirection: 'column',
                  borderRadius: '24px',
                  boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.2)',
                  },
                  '&:hover .spotlight-img': {
                    transform: 'scale(1.08)'
                  }
                }}
              >
                {/* Background Image */}
                <Box
                  component="img"
                  className="spotlight-img"
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
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                          gap: 1,
                          textShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
                        textShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
                      borderRadius: '30px',
                      textTransform: 'none',
                      fontWeight: 800,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      width: 'fit-content',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
                        transform: 'translateY(-3px) scale(1.02)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
