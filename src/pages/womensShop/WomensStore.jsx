import { Box, Typography, Container, Grid, Button } from '@mui/material';
import ProductCard from '../../components/Products/ProductCard';
import HomeImageSlider from '../../components/common/ImageSlider';
import products from '../../data/products'; 

const HERO_IMG = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop";
const MIDDLE_BANNER_IMG = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&h=400&fit=crop";

const CATEGORIES = [
  { title: "WORK DRESSES", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop" },
  { title: "TROUSERS", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop" },
  { title: "TOPS", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=400&fit=crop" },
  { title: "PANTS", image: "https://images.unsplash.com/photo-1509631179647-0c714d2417a8?w=300&h=400&fit=crop" },
  { title: "SKIRTS", image: "https://images.unsplash.com/photo-1583391733958-65e277dd6114?w=300&h=400&fit=crop" }
];

export default function WomensStore() {
  const fashionProducts = products.filter(p => p.category === 'Fashion').slice(0, 5);
  const featuredProducts = products.filter(p => p.category === 'Fashion').reverse().slice(0, 5);

  const womensBanners = [
    {
      id: 1,
      title: 'Womens Collections',
      subtitle: '',
      image: HERO_IMG,
      link: '#',
      cta: 'Explore'
    },
    {
      id: 2,
      title: 'NEW ARRIVALS',
      subtitle: '',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&h=600&fit=crop',
      link: '#',
      cta: 'Shop Now'
    }
  ];

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 8 }}>
      {/* Top Hero Banner */}
      <HomeImageSlider customBanners={womensBanners} />

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        {/* New Arrivals */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, color: '#888', mb: 1 }}>
            CLARA EXCLUSIVE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            NEW ARRIVALS
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {fashionProducts.map(product => (
            <Grid item xs={6} sm={4} md={2.4} key={product.id}>
              {/* Product cards in the mockup are very tall. We can override image height slightly here if needed */}
              <Box sx={{ '.MuiCardMedia-root': { height: 350 } }}>
                <ProductCard product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Middle Banner */}
        <Box
          sx={{
            width: '100%',
            height: { xs: 200, md: 400 },
            mt: 8,
            mb: 8,
            backgroundImage: `url(${MIDDLE_BANNER_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.4)' }} />
          <Box sx={{ zIndex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 2, color: '#6d3c3c' }}>
                CLARA
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -1, color: '#111' }}>
                WORKWEAR
              </Typography>
            </Box>
            <Button variant="contained" sx={{ bgcolor: '#6d3c3c', color: 'white', px: 4, py: 1.5, '&:hover': { bgcolor: '#4a2626' } }}>
              Shop Now
            </Button>
          </Box>
        </Box>

        {/* Top Visited Categories */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, color: '#888', mb: 1 }}>
            CLARA EXCLUSIVE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            TOP VISITED CATEGORIES
          </Typography>
        </Box>

        <Grid container spacing={1} sx={{ mb: 8 }}>
          {CATEGORIES.map((cat, index) => (
            <Grid item xs={6} md={2.4} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 400,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.05)' }
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, letterSpacing: 2 }}>
                    {cat.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Featured Products */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="subtitle2" sx={{ letterSpacing: 2, color: '#888', mb: 1 }}>
            CLARA EXCLUSIVE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            FEATURED PRODUCTS
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {featuredProducts.map(product => (
            <Grid item xs={6} sm={4} md={2.4} key={product.id}>
              <Box sx={{ '.MuiCardMedia-root': { height: 350 } }}>
                <ProductCard product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}
