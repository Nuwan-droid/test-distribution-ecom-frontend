import { Box, Typography, Button, Divider } from '@mui/material';
import FilterCategory from './FilterCategory';

export default function FilterSection({ filters = [] }) {
  // Default mock filters if none provided
  const defaultFilters = [
    { title: 'Category', options: ['Dresses', 'Tops', 'Pants', 'Skirts', 'Activewear'] },
    { title: 'Brand', options: ['Zara', 'H&M', 'Mango', 'ASOS', 'Nike'] },
    { title: 'Price', options: ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'] },
    { title: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] }
  ];

  const displayFilters = filters.length > 0 ? filters : defaultFilters;

  return (
    <Box sx={{ width: '100%', pr: { xs: 0, md: 2 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <Button size="small" color="inherit" sx={{ textTransform: 'none', textDecoration: 'underline' }}>
          Clear All
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      
      {displayFilters.map((filter, index) => (
        <FilterCategory key={index} title={filter.title} options={filter.options} />
      ))}
    </Box>
  );
}
