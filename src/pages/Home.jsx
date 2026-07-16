import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper, Chip,
  useTheme, useMediaQuery, IconButton, Avatar,
} from '@mui/material';
import {
  ArrowForwardIos, ArrowBackIos, LocalShipping, VerifiedUser,
  Replay, Headset, FlashOn, ArrowForward, Star, TrendingUp,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import products, { categories, banners } from '../data/products';

const trustBadges = [
  { icon: <LocalShipping sx={{ fontSize: 32, color: 'primary.main' }} />, title: 'Free Delivery', subtitle: 'On orders above 150$+' },
  { icon: <Replay sx={{ fontSize: 32, color: 'primary.main' }} />, title: '30-Day Returns', subtitle: 'Easy return policy' },
  { icon: <VerifiedUser sx={{ fontSize: 32, color: 'primary.main' }} />, title: '100% Authentic', subtitle: 'Genuine products only' },
  { icon: <Headset sx={{ fontSize: 32, color: 'primary.main' }} />, title: '24/7 Support', subtitle: 'Always here for you' },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <Box>
      {/* ===== Hero Banner Slider ===== */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 150, sm: 200, md: 300 } }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Full-width background image */}
              <Box
                component="img"
                src={banners[currentBanner].image}
                alt={banners[currentBanner].title}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Dark gradient scrim for readability */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)',
                }}
              />
              {/* Overlay content */}
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
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <Box sx={{ maxWidth: { xs: '100%', md: 560 } }}>
                    <Typography
                      variant={isMobile ? 'h4' : 'h2'}
                      fontWeight={800}
                      sx={{ color: 'white', lineHeight: 1.15, mb: 2, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                    >
                      {banners[currentBanner].title}
                    </Typography>
                    {banners[currentBanner].subtitle && (
                      <Typography
                        variant={isMobile ? 'body2' : 'h6'}
                        sx={{ color: 'rgba(255,255,255,0.85)', mb: 3, fontWeight: 400 }}
                      >
                        {banners[currentBanner].subtitle}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size={isMobile ? 'medium' : 'large'}
                        component={Link}
                        to="/products"
                        endIcon={<ArrowForward />}
                        id={`hero-cta-${currentBanner}`}
                        sx={{ borderRadius: 2 }}
                      >
                        {banners[currentBanner].cta}
                      </Button>
                      <Button
                        variant="outlined"
                        size={isMobile ? 'medium' : 'large'}
                        component={Link}
                        to="/products?sort=discount"
                        sx={{ borderRadius: 2, borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        View Deals
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1, zIndex: 5 }}>
          {banners.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentBanner(i)}
              sx={{
                width: i === currentBanner ? 32 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === currentBanner ? 'secondary.main' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => setCurrentBanner(p => (p - 1 + banners.length) % banners.length)}
          sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => setCurrentBanner(p => (p + 1) % banners.length)}
          sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' } }}
        >
          <ArrowForwardIos fontSize="small" />
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

      {/* ===== Shop By Category ===== */}
      <Box sx={{ bgcolor: '#F8FAFC', py: 6 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="overline" color="primary.main" fontWeight={700}>Explore</Typography>
              <Typography variant="h4" fontWeight={800}>Shop by Category</Typography>
            </Box>
            <Button
              component={Link}
              to="/products"
              endIcon={<ArrowForward />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              id="view-all-categories-btn"
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {categories.map((cat, i) => (
              <Grid item xs={4} sm={3} md={2} key={cat.id}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Paper
                    component={Link}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    sx={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      p: 2, textDecoration: 'none', borderRadius: 3,
                      border: '2px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(255,107,53,0.15)' },
                      cursor: 'pointer',
                    }}
                    id={`category-${cat.id}`}
                  >
                    <Box
                      sx={{
                        width: 56, height: 56, borderRadius: 3,
                        bgcolor: `${cat.color}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.75rem', mb: 1,
                      }}
                    >
                      {cat.icon}
                    </Box>
                    <Typography variant="caption" fontWeight={600} textAlign="center" color="text.primary">
                      {cat.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{cat.count} items</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== Featured Products ===== */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="overline" color="primary.main" fontWeight={700}>Handpicked</Typography>
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
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* ===== Best Sellers ===== */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="overline" color="primary.main" fontWeight={700}>Top Picks</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" fontWeight={800}>Best Sellers</Typography>
                <TrendingUp color="primary" />
              </Box>
            </Box>
            <Button component={Link} to="/products?sort=popularity" endIcon={<ArrowForward />} id="view-best-sellers-btn">See All</Button>
          </Box>
          <Grid container spacing={3}>
            {bestSellers.slice(0, 4).map(product => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== New Arrivals ===== */}
      <Box sx={{ py: 6, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="overline" color="primary.main" fontWeight={700}>Just In</Typography>
              <Typography variant="h4" fontWeight={800}>New Arrivals </Typography>
            </Box>
            <Button component={Link} to="/products?filter=new" endIcon={<ArrowForward />} id="view-new-arrivals-btn">View All</Button>
          </Box>
          <Grid container spacing={3}>
            {newArrivals.map(product => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== Testimonials ===== */}
      <Box sx={{ py: 6, bgcolor: '#F8FAFC' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="overline" color="secondary.main" fontWeight={700}>Reviews</Typography>
            <Typography variant="h4" fontWeight={800}>What Our Customers Say</Typography>
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
