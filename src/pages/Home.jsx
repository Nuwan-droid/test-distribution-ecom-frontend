import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper,
  useTheme, useMediaQuery, IconButton, Avatar,
} from '@mui/material';
import {
  ArrowForwardIos, ArrowBackIos, LocalShipping, VerifiedUser,
  Replay, Headset, FlashOn, ArrowForward, Star, TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SpotlightBanner from '../components/home/SpotlightBanner';
import FashionRow from '../components/home/FashionRow';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import Testimonials from '../components/testimonials/Testimonials';
import products, { banners } from '../data/products';


const trustBadges = [
  { icon: <LocalShipping sx={{ fontSize: 32, color: 'secondary.main' }} />, title: 'Free Delivery', subtitle: 'On orders above 150$+' },
  { icon: <Replay sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '30-Day Returns', subtitle: 'Easy return policy' },
  { icon: <VerifiedUser sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '100% Authentic', subtitle: 'Genuine products only' },
  { icon: <Headset sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '24/7 Support', subtitle: 'Always here for you' },
];





export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const goNext = () => setCurrentBanner(p => (p + 1) % banners.length);
  const goPrev = () => setCurrentBanner(p => (p - 1 + banners.length) % banners.length);

  /* Autoplay — restarts cleanly on every manual change */
  useEffect(() => {
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBanner]);

  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <Box>
      {/* ═══════════════════════════════════════
           Hero Banner Slider — CSS Track Method
           All slides sit side-by-side in one row.
           We translateX the whole track — pure GPU-
           accelerated CSS, zero framer-motion jank.
      ═══════════════════════════════════════ */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: { xs: 150, sm: 200, md: 300 },
        }}
      >
        {/* ── Sliding Track ── */}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            /* Track is N slides wide; each slide = 100% of the container */
            width: `${banners.length * 100}%`,
            /* Single CSS transition — no JS animation loop */
            transform: `translateX(-${(currentBanner / banners.length) * 100}%)`,
            transition: 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {banners.map((banner, i) => (
            <Box
              key={i}
              sx={{
                /* Each slide = one viewport-width slot inside the track */
                width: `${100 / banners.length}%`,
                flexShrink: 0,
                position: 'relative',
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
                  /* Subtle zoom-in on active slide for premium feel */
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
                    'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.05) 100%)',
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
                  alignItems: 'center',
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
                        variant={isMobile ? 'h4' : 'h2'}
                        fontWeight={800}
                        sx={{
                          color: 'white',
                          lineHeight: 1.15,
                          mb: 1.5,
                          textShadow: '0 2px 12px rgba(0,0,0,0.45)',
                        }}
                      >
                        {banner.title}
                      </Typography>

                      {banner.subtitle && (
                        <Typography
                          variant={isMobile ? 'body2' : 'h6'}
                          sx={{
                            color: 'rgba(255,255,255,0.85)',
                            mb: 2.5,
                            fontWeight: 400,
                          }}
                        >
                          {banner.subtitle}
                        </Typography>
                      )}

                      <Button
                        variant="contained"
                        color="secondary"
                        size={isMobile ? 'medium' : 'large'}
                        component={Link}
                        to="/products"
                        endIcon={<ArrowForward />}
                        id={`hero-cta-${i}`}
                        sx={{ borderRadius: 2 }}
                      >
                        {banner.cta}
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </Container>
            </Box>
          ))}
        </Box>

        {/* ── Dot Indicators ── */}
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

        {/* ── Prev Arrow ── */}
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

        {/* ── Next Arrow ── */}
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
      </Box>

      {/* ===== Trust Badges (100% Flex-Centered) ===== */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3, md: 5, lg: 7 },
            }}
          >
            {trustBadges.map((badge, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 0.5,
                  position: 'relative',
                  '&:not(:last-child)::after': {
                    content: '""',
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    right: { md: -20, lg: -28 },
                    top: '15%',
                    height: '70%',
                    width: '1px',
                    backgroundColor: 'divider',
                  },
                }}
              >
                {badge.icon}
                <Box>
                  <Typography variant="body2" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>{badge.title}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>{badge.subtitle}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      
      {/* ===== Spotlight Feature Banner ===== */}
      <SpotlightBanner />

      {/* ===== Fashion Row ===== */}
      <FashionRow />

      {/* ===== Featured Products ===== */}
      <FeaturedProducts products={featuredProducts} />

      {/* ===== Best Sellers ===== */}
      <BestSellers products={bestSellers} />

      {/* ===== New Arrivals ===== */}
      <NewArrivals products={newArrivals} />

      {/* ===== Shop By Category ===== used IIFE */} 
      {(() => {
        const topCategories = [
          {
            id: 1, name: 'Appliances', slug: 'Electronics',
            image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 2, name: 'Fashion', slug: 'Fashion',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 3, name: 'Home & Kitchen', slug: 'Home & Kitchen',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 4, name: 'Beauty & Care', slug: 'Beauty & Care',
            image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 5, name: 'Sports & Fitness', slug: 'Sports & Fitness',
            image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 6, name: 'Toys & Kids', slug: 'Toys & Kids',
            image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&h=300&fit=crop&q=80',
          },
        ];
        return (
          <Box sx={{ bgcolor: '#ffffff', py: { xs: 2.5, sm: 3, md: 4 },
    my: { xs: 1, sm: 1.5, md: 2, lg: 2 },borderTop: '1px solid #ebebeb',borderBottom: '1px solid #ebebeb',}}>
            <Container maxWidth="xl">
              <Box sx={{ mb: { xs: 2.5, md: 3.5 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: '#111111', lineHeight: 1.2, fontSize: { xs: '1.2rem', md: '1.45rem' } }}
                >
                  Shop by category
                </Typography>
                <Button
                  component={Link}
                  to="/products"
                  variant="outlined"
                  color="secondary"
                  endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
                  id="view-all-categories-btn"
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    border: '1.5px solid',
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    px: { xs: 1.5, sm: 2.5 },
                    py: 0.5,
                    height: '32px',
                    '&:hover': {
                      border: '1.5px solid',
                      borderColor: 'secondary.dark',
                      bgcolor: 'rgba(26, 86, 219, 0.04)',
                    },
                  }}
                >
                  See All
                </Button>
              </Box>

              {/* Flex row horizontal layout with hidden scrollbars */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'auto',
                  gap: { xs: 3, md: 5 },
                  pb: 1,
                  justifyContent: { xs: 'flex-start', md: 'center' },
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
                {topCategories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    style={{ flex: '0 0 auto' }}
                  >
                    <Box
                      component={Link}
                      to={`/products?category=${encodeURIComponent(cat.slug)}`}
                      id={`category-circle-${cat.id}`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        textDecoration: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {/* Increased Circular image container */}
                      <Box
                        sx={{
                          width: { xs: 100, sm: 120, md: 140 },
                          height: { xs: 100, sm: 120, md: 140 },
                          borderRadius: '50%',
                          bgcolor: '#f4f6f8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                          border: '1px solid #ebebeb',
                          '&:hover': {
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />
                      </Box>
                      {/* Category label */}
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        sx={{
                          color: '#222222',
                          textAlign: 'center',
                          fontSize: { xs: '0.78rem', sm: '0.85rem', md: '0.9rem' },
                          lineHeight: 1.25,
                        }}
                      >
                        {cat.name}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Container>
          </Box>
        );
      })()}


      {/* ===== Testimonials ===== */}
      <Testimonials />
    </Box>
  );
}
