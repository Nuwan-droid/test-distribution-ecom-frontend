import { Box, Typography, Button } from '@mui/material';
import { ArrowForward, CardGiftcard } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import birthdayGiftsImg from '../../assets/birthday_gifts.jpg';

export default function SpotlightBanner() {
  return (
    <Box sx={{ bgcolor: '#F8FAFC' }}>
      <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Pure flex row — full width, zero margins */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              overflow: 'hidden',
              bgcolor: '#F3EFEA',
              minHeight: { xs: 'auto', md: 300 },
            }}
          >
            {/* Left: Text & CTA */}
            <Box
              sx={{
                flex: '0 0 50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 3.5, sm: 5, md: 6, lg: 7 },
                color: '#1E293B',
              }}
            >

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.6rem', sm: '2rem', md: '2.3rem' },
                  lineHeight: 1.2,
                  color: '#0F172A',
                  mb: 3,
                }}
              >
                Make birthdays extra special
              </Typography>

              <Button
                component={Link}
                to="/birthday-gifts"
                variant="contained"
          
                id="birthday-gifts-cta"
                sx={{
                  bgcolor: 'secondary.main',
                  color: '#FFFFFF',
                  px: { xs: 3, md: 4 },
                  py: 1.25,
                  borderRadius: 50,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  width: 'fit-content',
                  boxShadow: '0 4px 14px rgba(30,41,59,0.18)',
                  '&:hover': {
                    bgcolor: '#0F172A',
                    boxShadow: '0 6px 18px rgba(15,23,42,0.28)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Shop 
              </Button>
            </Box>

            {/* Right: Image — fills exact 50%, zero padding, flush to edges */}
            <Box
              sx={{
                flex: '0 0 50%',
                minHeight: { xs: 240, md: 'auto' },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={birthdayGiftsImg}
                alt="Birthday Gifts Collection"
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: { xs: 240, md: 300 },
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  mixBlendMode: 'multiply',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                  '&:hover': { transform: 'scale(1.04)' },
                }}
              />
            </Box>
          </Box>
        </motion.div>
    </Box>
  );
}
