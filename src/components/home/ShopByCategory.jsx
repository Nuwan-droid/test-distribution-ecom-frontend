import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { LocalMall } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ShopByCategory() {
  const topCategories = [
    {
      id: 1, name: 'Electronics', slug: 'Electronics',
      image: '/images/electronics3.png',
      bgColor: '#ffffff'
    },
    {
      id: 2, name: "Women's Collections", slug: 'Fashion',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&q=80',
      bgColor: '#f9effa'
    },
    {
      id: 3, name: 'Home & Kitchen', slug: 'Home & Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop&q=80',
      bgColor: '#f1faee'
    },
    {
      id: 4, name: 'Sports & Fitness', slug: 'Sports & Fitness',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&h=300&fit=crop&q=80',
      bgColor: '#eff5fb'
    },
    {
      id: 5, name: 'Beauty & Care', slug: 'Beauty & Care',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=300&fit=crop&q=80',
      bgColor: '#fceef4'
    },
    {
      id: 6, name: 'Toys & Kids', slug: 'Toys & Kids',
      image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=300&h=300&fit=crop&q=80',
      bgColor: '#fdf6e7'
    },
  ];

  return (
    <Box sx={{ 
      bgcolor: '#ffffff',
      py: { xs: 1, md: 2 }, 
      mt: { xs: 3, md: 4 },
    }}>
      <Container maxWidth={false}>
        <Box sx={{ mb: { xs: 3, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
          >
            <LocalMall sx={{ color: '#111', fontSize: 24 }} />
            <Typography
              variant="h5"
              fontWeight={900}
              sx={{ color: '#000000', textTransform: 'uppercase', lineHeight: 1.2, fontSize: { xs: '1.3rem', md: '1.6rem' }, letterSpacing: '0.5px', WebkitTextStroke: '1px black' }}
            >
              Shop by Category
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products"
            sx={{
              textTransform: 'none',
              color: '#2b1b54',
              fontWeight: 700,
              fontSize: { xs: '0.85rem', sm: '1rem' },
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            View all categories
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',
              sm: 'repeat(4, 1fr)',
              md: 'repeat(6, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
            pb: 1,
            justifyItems: 'center',
          }}
        >
          {topCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
                  gap: 2,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                {/* Circular image container */}
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: { xs: 120, sm: 140, md: 170 },
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    bgcolor: cat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
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
                      mixBlendMode: 'multiply',
                      opacity: 0.95
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{
                    color: '#333333',
                    textAlign: 'center',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
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
