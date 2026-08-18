import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ShopByCategory() {
  const topCategories = [
    {
      id: 1, name: 'Appliances', slug: 'Electronics',
      image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300&h=300&fit=crop&q=80',
    },
    {
      id: 2, name: 'Fashion', slug: 'Fashion',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&q=80',
    },
    {
      id: 3, name: 'Home & Kitchen', slug: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop&q=80',
    },
    {
      id: 4, name: 'Beauty & Care', slug: 'Beauty & Care',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop&q=80',
    },
    {
      id: 5, name: 'Sports & Fitness', slug: 'Sports & Fitness',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=300&fit=crop&q=80',
    },
    {
      id: 6, name: 'Toys & Kids', slug: 'Toys & Kids',
      image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&h=300&fit=crop&q=80',
    },
  ];

  return (
    <Box sx={{
      bgcolor: '#ffffff',
      py: { xs: 2.5, sm: 3, md: 4 },
      my: { xs: 1, sm: 1.5, md: 2, lg: 2 },
      borderTop: '1px solid #ebebeb',
      borderBottom: '1px solid #ebebeb',
    }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: { xs: 2.5, md: 3.5 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: '#111111', lineHeight: 1.2, fontSize: { xs: '1.2rem', md: '1.45rem' } }}
          >
            Shop by category
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            color="secondary"
            endIcon={<ArrowForward sx={{ fontSize: 14 }} />}
            id="view-all-categories-btn"
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
            See All
          </Button>
        </Box>

        {/* Grid layout – show only 5 categories, rest via "See All" */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',   // mobile: 3 per row
              sm: 'repeat(5, 1fr)',   // tablet+: all 5 in one row
              md: 'repeat(5, 1fr)',   // laptop: all 5 in one row
              lg: 'repeat(5, 1fr)',   // large desktop: all 5 in one row
            },
            gap: { xs: 2, sm: 3, md: 4 },
            pb: 1,
            justifyItems: 'center',
          }}
        >
          {topCategories.slice(0, 5).map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.18 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box
                component={Link}
                to={`/products?category=${encodeURIComponent(cat.slug)}`}
                id={`category-circle-${cat.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Circular image container */}
                <Box
                  sx={{
                    width: '80%',
                    maxWidth: { xs: 120, sm: 140, md: 160, lg: 180 },
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    bgcolor: '#f4f6f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                    border: '1px solid #ebebeb',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
                {/* Category label */}
                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  sx={{
                    color: '#222222',
                    textAlign: 'center',
                    fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                    lineHeight: 1.25,
                    maxWidth: '90%',
                  }}
                >
                  {cat.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
