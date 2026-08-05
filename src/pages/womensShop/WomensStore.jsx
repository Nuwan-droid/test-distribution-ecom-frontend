import { Box, Typography, Container, Button } from '@mui/material';
import HomeImageSlider from '../../components/common/ImageSlider';
import NewArrivals from '../../components/home/NewArrivals';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import products from '../../data/products'; 
import TopVisited from '../../components/womenStore/TopVisited/TopVisited';
import StoreEntranceAnimation from '../../components/common/StoreEntranceAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=600&fit=crop&q=90";
const MIDDLE_BANNER_IMG = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&h=600&fit=crop&q=90";

export default function WomensStore() {
  const fashionProducts = products.filter(p => p.category === 'Women fashion' && p.isNew).slice(0, 5);
  const featuredProducts = products.filter(p => p.category === 'Women fashion' && p.isFeatured).slice(0, 5);

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
      image: MIDDLE_BANNER_IMG,
      link: '#',
      cta: 'Shop Now'
    }
  ];

  return (
    <StoreEntranceAnimation storeName="WOMEN'S COLLECTIONS" tagline="CURATED BOUTIQUE & LUXURY APPAREL">
      <Box sx={{ width: '100%', minHeight: '100vh', pb: 8 }}>
        {/* Top Hero Banner */}
        <HomeImageSlider customBanners={womensBanners} />

        <Container maxWidth="xl" sx={{ mt: 6 }}>
          {/* New Arrivals */}
          <NewArrivals products={fashionProducts} />
        </Container>
        
        {/* Top Visited Categories - Full Width */}
        <TopVisited />

        <Container maxWidth="xl">
          {/* Featured Products */}
          <FeaturedProducts products={featuredProducts} />
        </Container>
      </Box>
    </StoreEntranceAnimation>
  );
}
