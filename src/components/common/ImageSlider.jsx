import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos, ArrowForward, LocalMall } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomeImageSlider({ customBanners }) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = customBanners || [];

  const goNext = () => {
    if (banners.length <= 1) return;
    setCurrentBanner(p => (p + 1) % banners.length);
  };

  const goPrev = () => {
    if (banners.length <= 1) return;
    setCurrentBanner(p => (p - 1 + banners.length) % banners.length);
  };

  /* Autoplay — restarts cleanly on every manual change */
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(goNext, 10000);
    return () => clearInterval(timer);
  }, [currentBanner, banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: { xs: '40vh', sm: '50vh', md: '55vh', lg: '60vh', xl: '65vh' },
        minHeight: { xs: 300, md: 400 }, // Ensure it never gets too small on tiny screens
        pt: 0, // Padding to cover the smaller nav bar area
        bgcolor: '#f5f5f5', // Grey background to emphasize the navbar's glass effect
        boxSizing: 'content-box',
      }}
    >
      {/* ── Fade Track ── */}
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        {banners.map((banner, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: i === currentBanner ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: i === currentBanner ? 1 : 0,
              pointerEvents: i === currentBanner ? 'auto' : 'none',
              overflow: 'hidden',
            }}
          >
            {/* Background image */}
            <Box
              component="img"
              src={banner.image}
              alt={banner.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',

                transform: i === currentBanner ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 4.5s ease-out',
              }}
            />

            {/* Gradient scrim */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.02) 100%)',
              }}
            />

            {/* Slide content — centered inside Container to match page layout */}
            <Container
              maxWidth="xl"
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                pb: { xs: 6, sm: 8, md: 10 },
              }}
            >
              {i === currentBanner && (
                <motion.div
                  key={currentBanner}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Box sx={{ maxWidth: { xs: '100%', md: 560 }, pl: { xs: 5, sm: 7, md: 8 } }}>
                    <Typography
                      variant="h2"
                      fontWeight={800}
                      sx={{
                        fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem', lg: '4rem', xl: '4.5rem' },
                        color: 'white',
                        lineHeight: 1.15,
                        mb: 1.5,
                        textShadow: '0 2px 12px rgba(0,0,0,0.45)',
                      }}
                    >
                      {banner.title}
                    </Typography>
                    
                    {banner.cta && (
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          component={Link}
                          to={banner.link || "/products"}
                          id={`hero-cta-${i}`}
                          startIcon={<LocalMall sx={{ fontSize: '1.2rem !important', mb: '2px' }} />}
                          endIcon={<ArrowForward sx={{ fontSize: '1.2rem !important' }} />}
                          sx={{
                            borderRadius: '12px',
                            bgcolor: 'secondary.main',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', md: '1.05rem' },
                            px: { xs: 2.5, md: 3.5 },
                            py: { xs: 1.2, md: 1.5 },
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            '&:hover': { bgcolor: 'secondary.dark', boxShadow: '0 10px 25px rgba(0,0,0,0.25)' },
                          }}
                        >
                          {banner.cta}
                        </Button>
                        <Button
                          variant="outlined"
                          component={Link}
                          to="/products"
                          endIcon={<ArrowForward sx={{ fontSize: '1.2rem !important' }} />}
                          sx={{
                            borderRadius: '12px',
                            color: '#fff',
                            borderColor: 'rgba(255,255,255,0.4)',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', md: '1.05rem' },
                            px: { xs: 2.5, md: 3.5 },
                            py: { xs: 1.2, md: 1.5 },
                            bgcolor: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': { borderColor: 'rgba(255,255,255,0.8)', bgcolor: 'rgba(255,255,255,0.1)' },
                          }}
                        >
                          Explore Deals
                        </Button>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              )}
            </Container>
          </Box>
        ))}
      </Box>

      {/* ── Dot Indicators ── */}
      {banners.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.75,
            zIndex: 10,
            bgcolor: 'rgba(0,0,0,0.28)',
            backdropFilter: 'blur(6px)',
            borderRadius: 10,
            px: 1.5,
            py: 0.75,
          }}
        >
          {banners.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentBanner(i)}
              sx={{
                width: i === currentBanner ? 26 : 7,
                height: 7,
                borderRadius: 4,
                bgcolor: i === currentBanner ? 'secondary.main' : 'secondary.contrastText',
                cursor: 'pointer',
                transition: 'width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), background-color 0.3s ease',
                '&:hover': {
                  bgcolor: i === currentBanner ? 'secondary.contrastText' : 'secondary.contrastText',
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* ── Prev Arrow ── */}
      {banners.length > 1 && (
        <IconButton
          onClick={goPrev}
          sx={{
            position: 'absolute',
            left: { xs: 6, md: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: { xs: 34, md: 42 },
            height: { xs: 34, md: 42 },
            bgcolor: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.28)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'background-color 0.2s ease, transform 0.2s ease',
          }}
        >
          <ArrowBackIos sx={{ fontSize: { xs: 14, md: 16 }, ml: '3px' }} />
        </IconButton>
      )}

      {/* ── Next Arrow ── */}
      {banners.length > 1 && (
        <IconButton
          onClick={goNext}
          sx={{
            position: 'absolute',
            right: { xs: 6, md: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: { xs: 34, md: 42 },
            height: { xs: 34, md: 42 },
            bgcolor: 'rgba(255,255,255,0.14)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.28)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'background-color 0.2s ease, transform 0.2s ease',
          }}
        >
          <ArrowForwardIos sx={{ fontSize: { xs: 14, md: 16 } }} />
        </IconButton>
      )}
    </Box>
  );
}
