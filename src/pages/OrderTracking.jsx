import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Box, Container, Typography, Paper, Button, TextField, Stepper,
  Step, StepLabel, StepContent, Chip, Grid, Divider, Alert,
} from '@mui/material';
import {
  Search, CheckCircle, LocalShipping, Inventory, ShoppingBag, DoneAll,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const mockOrders = {
  'ORD-2418': {
    id: 'ORD-2418',
    date: '2024-01-22',
    total: 599,
    items: [{ name: 'Car Phone Mount Dashboard', qty: 1, price: 599 }],
    currentStep: 1,
    address: '42, MG Road, Bengaluru, Karnataka 560001',
    estimatedDelivery: '2024-01-26',
  },
  'ORD-2412': {
    id: 'ORD-2412',
    date: '2024-01-20',
    total: 2499,
    items: [{ name: 'Wireless Bluetooth Headphones', qty: 1, price: 2499 }],
    currentStep: 2,
    address: '42, MG Road, Bengaluru, Karnataka 560001',
    estimatedDelivery: '2024-01-24',
  },
};

const trackingSteps = [
  { label: 'Order Placed', icon: <ShoppingBag />, desc: 'Your order has been placed successfully' },
  { label: 'Order Confirmed', icon: <CheckCircle />, desc: 'Your order has been confirmed by the seller' },
  { label: 'Packed & Dispatched', icon: <Inventory />, desc: 'Your order has been packed and dispatched' },
  { label: 'Out for Delivery', icon: <LocalShipping />, desc: 'Your order is out for delivery' },
  { label: 'Delivered', icon: <DoneAll />, desc: 'Your order has been delivered' },
];

export default function OrderTracking() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('order') || '');
  const [searchId, setSearchId] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState(searchParams.get('order') ? mockOrders[searchParams.get('order')] : null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const found = mockOrders[searchId.toUpperCase()];
    if (found) { setOrder(found); setError(''); setOrderId(searchId.toUpperCase()); }
    else setError('Order not found. Try ORD-2418 or ORD-2412');
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>Track Your Order</Typography>
          <Typography color="text.secondary">Enter your order ID to get real-time delivery updates</Typography>
        </Box>

        {/* Search */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter Order ID (e.g. ORD-2418)"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              error={!!error}
              helperText={error}
              inputProps={{ id: 'order-id-input' }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              startIcon={<Search />}
              sx={{ whiteSpace: 'nowrap', borderRadius: 2, px: 3 }}
              id="track-search-btn"
            >
              Track Order
            </Button>
          </Box>
        </Paper>

        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Order Info */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">Placed on {order.date}</Typography>
                </Box>
                <Chip
                  label={order.currentStep >= 4 ? 'Delivered' : order.currentStep >= 3 ? 'Out for Delivery' : 'In Transit'}
                  color={order.currentStep >= 4 ? 'success' : 'warning'}
                  sx={{ fontWeight: 700 }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>DELIVERY ADDRESS</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>{order.address}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>ESTIMATED DELIVERY</Typography>
                  <Typography variant="body2" fontWeight={700} color="primary.main" sx={{ mt: 0.5 }}>{order.estimatedDelivery}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>ORDER ITEMS</Typography>
              {order.items.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <Typography variant="body2">{item.name} × {item.qty}</Typography>
                  <Typography variant="body2" fontWeight={700}>{item.price.toLocaleString()}$</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={800} color="primary.main">{order.total.toLocaleString()}$</Typography>
              </Box>
            </Paper>

            {/* Tracking Timeline */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Delivery Status</Typography>
              <Stepper activeStep={order.currentStep} orientation="vertical">
                {trackingSteps.map((step, i) => (
                  <Step key={step.label} completed={i <= order.currentStep}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          color: i <= order.currentStep ? 'primary.main' : 'text.disabled',
                          '&.Mui-completed': { color: 'success.main' },
                          '&.Mui-active': { color: 'primary.main' },
                        },
                      }}
                    >
                      <Typography fontWeight={i <= order.currentStep ? 700 : 400} color={i <= order.currentStep ? 'text.primary' : 'text.secondary'}>
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="outlined" component={Link} to="/account?tab=orders" id="view-all-orders-btn" sx={{ borderRadius: 2 }}>
                View All Orders
              </Button>
            </Box>
          </motion.div>
        )}

        {!order && !error && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ fontSize: '4rem', mb: 2 }}>📦</Box>
            <Typography color="text.secondary">Enter your order ID above to track delivery</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
