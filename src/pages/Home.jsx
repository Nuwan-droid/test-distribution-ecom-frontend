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
import ProductCard from '../components/ProductCard';
import products, { banners } from '../data/products';

const trustBadges = [
  { icon: <LocalShipping sx={{ fontSize: 32, color: 'secondary.main' }} />, title: 'Free Delivery', subtitle: 'On orders above 150$+' },
  { icon: <Replay sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '30-Day Returns', subtitle: 'Easy return policy' },
  { icon: <VerifiedUser sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '100% Authentic', subtitle: 'Genuine products only' },
  { icon: <Headset sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '24/7 Support', subtitle: 'Always here for you' },
];

const testimonials = [
  { name: 'david perera', avatar: 'https://i.pravatar.cc/60?img=1', rating: 5, text: 'Amazing products and super fast delivery! I ordered electronics worth 500$ and received them the very next day. Will definitely order again!' },
  { name: 'tom curse', avatar: 'https://i.pravatar.cc/60?img=3', rating: 5, text: 'The product quality is outstanding. I got a yoga mat and it is exactly as described. Customer support was incredibly helpful too.' },
  { name: 'dihan narmada', avatar: 'https://i.pravatar.cc/60?img=4', rating: 5, text: 'Best online shopping experience ever! Great deals, authentic products, and the packaging was excellent. Highly recommend OneRoutes!' },
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

              {/* Slide content — fade-in only for the active slide */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  px: { xs: 3, md: 8 },
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
                    <Box sx={{ maxWidth: { xs: '100%', md: 560 } }}>
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
              </Box>
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

      {/* ===== Trust Badges ===== */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="md">
          <Grid container justifyContent="center" alignItems="center" spacing={0}>
            {trustBadges.map((badge, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    py: 1,
                    px: 1,
                    borderRight: i < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  {badge.icon}
                  <Box>
                    <Typography variant="body2" fontWeight={700}>{badge.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{badge.subtitle}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* ===== Featured Products ===== */}
     <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight={800}>Featured Products</Typography>
            </Box>
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForward />}
              id="view-all-featured-btn"
            >
              See All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {featuredProducts.map(product => (
              <Grid item xs={6} sm={4} md={3} key={product.id} sx={{ display: 'flex' }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* ===== Best Sellers ===== */}
      <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" fontWeight={800}>Best Sellers</Typography>          
              </Box>
            
            <Button component={Link} to="/products?sort=popularity" endIcon={<ArrowForward />} id="view-best-sellers-btn">See All</Button>
          </Box>
          <Grid container spacing={3}>
            {bestSellers.slice(0, 4).map(product => (
              <Grid item xs={6} sm={4} md={3} key={product.id} sx={{ display: 'flex' }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== New Arrivals ===== */}
      <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 },bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight={800}>New Arrivals </Typography>
            </Box>
            <Button component={Link} to="/products?filter=new" endIcon={<ArrowForward />} id="view-new-arrivals-btn">View All</Button>
          </Box>
          <Grid container spacing={3}>
            {newArrivals.map(product => (
              <Grid item xs={6} sm={4} md={3} key={product.id} sx={{ display: 'flex' }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== Shop By Category ===== used IIFE */} 
      {(() => {
        const topCategories = [
          {
            id: 1, name: 'Appliances', slug: 'Electronics',
            image: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png',
          },
          {
            id: 2, name: 'Fashion', slug: 'Fashion',
            image: 'https://cdn-icons-png.flaticon.com/512/2331/2331717.png',
          },
          {
            id: 3, name: 'Home & Kitchen', slug: 'Home & Kitchen',
            image: 'https://cdn-icons-png.flaticon.com/512/1830/1830839.png',
          },
          {
            id: 4, name: 'Beauty & Care', slug: 'Beauty & Care',
            image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop&q=80',
          },
          {
            id: 5, name: 'Sports & Fitness', slug: 'Sports & Fitness',
            image: 'https://cdn-icons-png.flaticon.com/512/857/857418.png',
          },
          {
            id: 6, name: 'Toys & Kids', slug: 'Toys & Kids',
            image: 'https://cdn-icons-png.flaticon.com/512/3163/3163478.png',
          },
        ];
        return (
          <Box sx={{ bgcolor: '#ffffff', py: { xs: 2, sm: 2.5, md: 3, lg: 3 },
    my: { xs: 1, sm: 1.5, md: 2, lg: 2 },borderTop: '1px solid #ebebeb',borderBottom: '1px solid #ebebeb',}}>
            <Box sx={{ px: { xs: 2, md: 6 }, mb: { xs: 2.5, md: 3 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: '#111111', lineHeight: 1.2, fontSize: { xs: '1.1rem', md: '1.35rem' } }}
              >
                Shop by category
              </Typography>
              <Button
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                id="view-all-categories-btn"
              >
                See All
              </Button>
            </Box>

            {/* 6 horizontal circular category tiles */}
            <Box
              sx={{
                px: { xs: 2, md: 6 },
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)' },
                gap: { xs: 1.5, md: 2 },
              }}
            >
              {topCategories.map((cat) => (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <Box
                    component={Link}
                    to={`/products?category=${encodeURIComponent(cat.slug)}`}
                    id={`category-circle-${cat.id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1.2,
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Circular image container */}
                    <Box
                      sx={{
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        borderRadius: '50%',
                        bgcolor: '#EEF0F3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                        '&:hover': {
                          boxShadow: '0 4px 18px rgba(0,0,0,0.13)',
                          borderColor: '#c0c0c0',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        sx={{
                          width: cat.id === 4 ? '100%' : '70%',
                          height: cat.id === 4 ? '100%' : '70%',
                          objectFit: cat.id === 4 ? 'cover' : 'contain',
                          objectPosition: 'center',
                        }}
                      />
                    </Box>
                    {/* Category label */}
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        color: '#111111',
                        textAlign: 'center',
                        fontSize: { xs: '0.7rem', sm: '0.78rem', md: '0.85rem' },
                        lineHeight: 1.25,
                      }}
                    >
                      {cat.name}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        );
      })()}


      {/* ===== Testimonials ===== */}
      <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3 }, my: { xs: 1, sm: 1.5, md: 2, lg: 2 }, bgcolor: '#F8FAFC' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" fontWeight={800}>What Our Customers Say</Typography>
          </Box>
          <Grid container spacing={3}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Paper sx={{ p: 3.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', mb: 1.5 }}>
                      {[...Array(t.rating)].map((_, s) => (
                        <Star key={s} sx={{ color: '#F59E0B', fontSize: 18 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontStyle: 'italic', lineHeight: 1.7 }}>
                      "{t.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={t.avatar} sx={{ width: 44, height: 44 }} />
                      <Box>
                        <Typography variant="body2" fontWeight={700}>{t.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Verified Buyer</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
