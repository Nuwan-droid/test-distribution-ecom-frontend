import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Divider } from '@mui/material';
import { CheckCircle, Home, ListAlt, LocalShipping } from '@mui/icons-material';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const orderId = `ORD-${Date.now().toString().slice(-6)}`;

export default function OrderSuccess() {
  useEffect(() => {
    const fire = (ratio, opts) =>
      confetti({ ...opts, particleCount: Math.floor(200 * ratio) });

    fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.5, y: 0.8 } });
    fire(0.2, { spread: 60, origin: { x: 0.5, y: 0.8 } });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.5, y: 0.8 } });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '80vh',
        bgcolor: '#F8F9FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Paper sx={{ borderRadius: 4, p: 4, textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <Box
                sx={{
                  width: 96, height: 96, borderRadius: '50%',
                  bgcolor: '#F0FDF4', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', mx: 'auto', mb: 3,
                }}
              >
                <CheckCircle sx={{ fontSize: 56, color: 'success.main' }} />
              </Box>
            </motion.div>

            <Typography variant="h4" fontWeight={800} gutterBottom>
              <ThumbUpTwoToneIcon sx={{ color: "success.main" }} /> Order Placed..!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              Thank you for shopping with UBuy! Your order has been confirmed and will be dispatched soon.
            </Typography>

            <Paper
              sx={{
                p: 2, bgcolor: '#F8F9FA', borderRadius: 2, mb: 3,
                border: '1px dashed', borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.secondary">Order ID</Typography>
              <Typography variant="h6" fontWeight={800} color="primary.main">{orderId}</Typography>
            </Paper>

            <Divider sx={{ mb: 2.5 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2, bgcolor: '#EFF6FF', borderRadius: 2, mb: 3 }}>
              <LocalShipping sx={{ color: 'primary.main' }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" fontWeight={700}>Estimated Delivery</Typography>
                <Typography variant="caption" color="text.secondary">2–4 business days</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Home />}
                component={Link}
                to="/"
                id="go-home-btn"
                sx={{ borderRadius: 2 }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ListAlt />}
                component={Link}
                to="/account?tab=orders"
                id="view-orders-btn"
                sx={{ borderRadius: 2 }}
              >
                My Orders
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
