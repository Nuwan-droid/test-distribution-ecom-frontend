import { Box, Typography, Button, Paper, TextField, Divider } from '@mui/material';
import { ArrowForward, LocalShipping } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderSummary({ totalPrice, shipping, discount, finalTotal }) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', position: { md: 'sticky' }, top: 90 }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={700}>Order Summary</Typography>
      </Box>
      <Box sx={{ p: 2.5 }}>
        {/* Coupon */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
          <TextField
            size="small"
            placeholder="Enter coupon code"
            fullWidth
            inputProps={{ id: 'coupon-input' }}
          />
          <Button variant="outlined" size="small" sx={{ whiteSpace: 'nowrap', color: 'secondary.main' }} id="apply-coupon-btn">Apply</Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {[
          { label: 'Subtotal', value: `${totalPrice.toLocaleString()}$` },
          { label: `Discount (5%)`, value: `-${discount.toLocaleString()}$`, color: 'success.main' },
          { label: 'Shipping', value: shipping === 0 ? 'FREE' : `${shipping}$`, color: shipping === 0 ? 'success.main' : undefined },
        ].map((row, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
            <Typography variant="body2" color="text.secondary">{row.label}</Typography>
            <Typography variant="body2" fontWeight={600} color={row.color || 'text.primary'}>{row.value}</Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
          <Typography variant="h6" fontWeight={700}>Total</Typography>
          <Typography variant="h6" fontWeight={800} color="primary.main">{finalTotal.toLocaleString()}$</Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 1.5 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            endIcon={<ArrowForward />}
            onClick={() => navigate('/checkout')}
            id="checkout-btn"
            sx={{ borderRadius: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
          >
            Proceed to Checkout
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            to="/products"
            id="continue-shopping-btn"
            sx={{ borderRadius: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
          >
            Continue Shopping
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2 }}>
          <LocalShipping sx={{ color: 'success.main', fontSize: 18 }} />
          <Typography variant="caption" color="success.main" fontWeight={600}>
            {shipping === 0 ? 'You get FREE delivery!' : `Add ${(999 - totalPrice).toLocaleString()}$ more for FREE delivery`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
