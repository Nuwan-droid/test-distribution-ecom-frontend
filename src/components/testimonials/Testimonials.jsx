import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SingleTestimonial from './SingleTestimonial';

const testimonials = [
  {
    name: 'david perera',
    avatar: 'https://i.pravatar.cc/60?img=1',
    rating: 5,
    text: 'Amazing products and super fast delivery! I ordered electronics worth 500$ and received them the very next day. Will definitely order again!',
  },
  {
    name: 'tom curse',
    avatar: 'https://i.pravatar.cc/60?img=3',
    rating: 5,
    text: 'The product quality is outstanding. I got a yoga mat and it is exactly as described. Customer support was incredibly helpful too.',
  },
  {
    name: 'dihan narmada',
    avatar: 'https://i.pravatar.cc/60?img=4',
    rating: 5,
    text: 'Best online shopping experience ever! Great deals, authentic products, and the packaging was excellent. Highly recommend OneRoutes!',
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        py: { xs: 2.5, sm: 3.5 },
        bgcolor: '#F8FAFC',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 3.5 } }}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              color: '#111111',
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              letterSpacing: -0.2,
            }}
          >
            Customer Reviews
          </Typography>
        </Box>

        {/* Testimonials grid with stretch alignment for equal heights */}
        <Grid container spacing={3} alignItems="stretch">
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={i} sx={{ display: 'flex' }}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <SingleTestimonial testimonial={t} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
