import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Chip, Alert, Breadcrumbs
} from '@mui/material';
import { ShoppingBag, NavigateNext } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import CartItems from '../../components/checkout/CartItems';
import OrderSummary from '../../components/checkout/OrderSummary';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 999 ? 0 : 99;
  const discount = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + shipping - discount;

  if (items.length === 0) {
    return (
      <Box sx={{ bgcolor: '#F8FAFC', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Box sx={{ fontSize: '5rem', mb: 2 }}>🛒</Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>Your cart is empty</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button variant="contained" size="large" component={Link} to="/products" startIcon={<ShoppingBag />} id="start-shopping-btn" sx={{bgcolor:'secondary.main'}}>
            Start Shopping
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
          <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontSize: '0.875rem' }}>Home</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>Cart</Typography>
        </Breadcrumbs>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Shopping Cart <Chip label={`${totalItems} items`} color="primary" size="small" sx={{ ml: 1, fontWeight: 700 }} />
        </Typography>

        {totalPrice < 999 && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Add ${(999 - totalPrice).toLocaleString()} more for <strong>FREE delivery!</strong>
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <CartItems
              items={items}
              totalItems={totalItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <OrderSummary
              totalPrice={totalPrice}
              shipping={shipping}
              discount={discount}
              finalTotal={finalTotal}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
