import { Box, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
import products from '../../../data/products';

const CATEGORIES = [
  { title: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop" },
  { title: "Jeans", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop" },
  { title: "Tops", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=400&fit=crop" },
  { title: "Pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop" },
  { title: "Skirts", image: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?w=300&h=400&fit=crop" },
  { title: "Activewear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&h=400&fit=crop" }
];

export default function TopVisited() {
  return (
    <Box sx={{ width: '100%', mb: { xs: 4, md: 8 }, mt: { xs: 4, md: 8 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          TOP VISITED CATEGORIES
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 2, width: '100%', boxSizing: 'border-box' }}>
        {CATEGORIES.map((cat, index) => {
          const count = products.filter(p => p.category === 'Women fashion' && p.subcategory.toLowerCase() === cat.title.toLowerCase()).length;
          
          return (
            <Box key={index} sx={{ flexGrow: 1, flexBasis: { xs: '45%', sm: '30%', md: '15%' }, minWidth: 0 }}>
              <CategoryCard title={cat.title} image={cat.image} count={count} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
