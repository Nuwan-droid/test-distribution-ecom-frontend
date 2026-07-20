import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fashionCollections = [
  {
    id: 8,
    name: 'Classic Leather Wallets',
    link: '/products/8',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 9,
    name: 'Polarized Sunglasses',
    link: '/products/9',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 10,
    name: 'Canvas Backpacks',
    link: '/products/10',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&q=80',
  },
];

export default function FashionRow() {
  return (
    <Box sx={{ py: { xs: 2.5, sm: 3.5, md: 4 }, bgcolor: '#ffffff' }}>
      <Container maxWidth="xl">
        {/* Header section with Title and Get Inspired button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2.5,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: '#111111',
              fontSize: { xs: '1.15rem', sm: '1.35rem', md: '1.5rem' },
              lineHeight: 1.2,
            }}
          >
            Trending fashion finds
          </Typography>
          <Button
            component={Link}
            to="/products?category=Fashion"
            variant="outlined"
            color="secondary"
            endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
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
            Shop
          </Button>
        </Box>

        {/* Responsive flex row layout: side-by-side with scroll on mobile, centered grid on desktop */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: { xs: 2, sm: 3 },
            pb: 1,
            justifyContent: { xs: 'flex-start', sm: 'center' },
            '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbars
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {fashionCollections.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                // Responsive item widths:
                // - Mobile (xs): takes up 80% width with partial peaking of other items
                // - Tablet/Desktop (sm and up): takes up exactly 1/3 of container minus gaps
                flex: {
                  xs: '0 0 80%',
                  sm: '1 1 0px',
                },
                maxWidth: {
                  xs: '280px',
                  sm: 'none',
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <Box
                  component={Link}
                  to={item.link}
                  sx={{
                    display: 'block',
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    // Reduced, compact heights:
                    height: { xs: '150px', sm: '180px', md: '210px' },
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    '&:hover img': {
                      transform: 'scale(1.04)',
                    },
                  }}
                >
                  {/* Background Image */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />

                  {/* Dark Gradient Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 100%)',
                      zIndex: 1,
                    }}
                  />

                  {/* Text Label on top of image */}
                  <Typography
                    variant="subtitle1"
                    fontWeight={800}
                    sx={{
                      position: 'absolute',
                      bottom: { xs: 12, md: 16 },
                      left: { xs: 12, md: 16 },
                      color: '#ffffff',
                      zIndex: 2,
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
                      letterSpacing: -0.15,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
