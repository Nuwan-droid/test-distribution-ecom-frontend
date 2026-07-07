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
  { name: 'david perera', avatar: 'https://i.pravatar.cc/60?img=1', rating: 5, text: 'Amazing products and super fast delivery! I ordered electronics worth ₹5,000 and received them the very next day. Will definitely order again!' },
  { name: 'tom curse', avatar: 'https://i.pravatar.cc/60?img=3', rating: 5, text: 'The product quality is outstanding. I got a yoga mat and it is exactly as described. Customer support was incredibly helpful too.' },
  { name: 'dihan narmada', avatar: 'https://i.pravatar.cc/60?img=4', rating: 5, text: 'Best online shopping experience ever! Great deals, authentic products, and the packaging was excellent. Highly recommend Ubuy!' },
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
      <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 300, md: 480 } }}>
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
                background: banners[currentBanner].bgColor,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background image overlay */}
              <Box
                component="img"
                src={banners[currentBanner].image}
                alt=""
                sx={{
                  position: 'absolute', right: 0, top: 0, height: '100%',
                  width: { xs: '100%', md: '55%' },
                  objectFit: 'cover',
                  opacity: { xs: 0.2, md: 0.5 },
                }}
              />
              <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ maxWidth: { xs: '100%', md: 560 } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    <Chip
                      label="🔥 Limited Time Offer"
                      sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, mb: 2 }}
                    />
                    <Typography
                      variant={isMobile ? 'h4' : 'h2'}
                      fontWeight={800}
                      sx={{ color: 'white', lineHeight: 1.15, mb: 2 }}
                    >
                      {banners[currentBanner].title}
                    </Typography>
                    <Typography
                      variant={isMobile ? 'body2' : 'h6'}
                      sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, fontWeight: 400 }}
                    >
                      {banners[currentBanner].subtitle}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
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
                  </motion.div>
                </Box>
              </Container>
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
                bgcolor: i === currentBanner ? 'primary.main' : 'rgba(255,255,255,0.5)',
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
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Grid container>
            {trustBadges.map((badge, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2, p: 2.5,
                    borderRight: i < 3 ? '1px solid' : 'none', borderColor: 'divider',
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
      <Box sx={{ bgcolor: '#F8F9FA', py: 6 }}>
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

      {/* ===== Promo Banner ===== */}
      <Box sx={{ bgcolor: '#F8F9FA', py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper
                sx={{
                  background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
                  borderRadius: 4, p: 4, display: 'flex', alignItems: 'center',
                  gap: 3, minHeight: 180, position: 'relative', overflow: 'hidden',
                }}
              >
                <Box sx={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,107,53,0.1)' }} />
                <Box sx={{ flex: 1, position: 'relative', zIndex: 2 }}>
                  <Chip label="⚡ Flash Sale" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, mb: 1.5 }} />
                  <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                    Up to 50% Off Electronics
                  </Typography>
                  <Typography color="grey.400" sx={{ mb: 2 }}>
                    Grab the best deals on headphones, smartwatches & more
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/products?category=Electronics"
                    endIcon={<FlashOn />}
                    id="electronics-sale-btn"
                  >
                    Shop Electronics
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper
                sx={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
                  borderRadius: 4, p: 4, minHeight: 180, position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <Box sx={{ position: 'absolute', right: -20, bottom: -20, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h4" fontWeight={800} color="white" gutterBottom>
                    New Arrivals 🆕
                  </Typography>
                  <Typography color="rgba(255,255,255,0.85)" sx={{ mb: 2 }}>
                    Be the first to get the latest products
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/products?filter=new"
                    sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                    id="new-arrivals-btn"
                  >
                    Explore New
                  </Button>
                </Box>
              </Paper>
            </Grid>
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

      {/* ===== Testimonials ===== */}
      <Box sx={{ py: 6, bgcolor: '#F8F9FA' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="overline" color="primary.main" fontWeight={700}>Reviews</Typography>
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
    </Box>
  );
}
