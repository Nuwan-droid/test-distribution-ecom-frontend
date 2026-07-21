import { Box } from '@mui/material';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

export default function ProductGrid({ products, loading, skeletonCount = 8 }) {
  const gridLayout = {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(4, 1fr)',
      xl: 'repeat(5, 1fr)',
    },
    gap: 2,
  };

  if (loading) {
    return (
      <Box sx={gridLayout}>
        {[...Array(skeletonCount)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={gridLayout}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
