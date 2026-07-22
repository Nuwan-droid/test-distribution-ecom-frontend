import { Box, Typography, Container, Grid, Button } from '@mui/material';
import HomeImageSlider from '../../components/common/ImageSlider';
import NewArrivals from '../../components/home/NewArrivals';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import products from '../../data/products'; 

const HERO_IMG = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop";
const MIDDLE_BANNER_IMG = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&h=400&fit=crop";

const CATEGORIES = [
  { title: "WORK DRESSES", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop" },
  { title: "TROUSERS", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop" },
  { title: "TOPS", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=400&fit=crop" },
  { title: "PANTS", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop" },
  { title: "SKIRTS", image: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=300&h=400&fit=crop" }
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
        <NewArrivals products={fashionProducts} />

        

        {/* Top Visited Categories */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            TOP VISITED CATEGORIES
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1, sm: 2 }} columns={{ xs: 2, sm: 3, md: 5 }} sx={{ mb: { xs: 4, md: 8 } }}>
          {CATEGORIES.map((cat, index) => (
            <Grid item xs={1} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 240, sm: 300, md: 400 },
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
        <FeaturedProducts products={featuredProducts} />

      </Container>
    </Box>
  );
}
