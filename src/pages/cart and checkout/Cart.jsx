import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper, Divider, IconButton,
  Breadcrumbs, TextField, Chip, Alert,
} from '@mui/material';
import { Add, Remove, Delete, ShoppingBag, ArrowForward, LocalShipping } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

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
        <Breadcrumbs sx={{ mb: 2 }}>
          <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Home</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Cart</Typography>
        </Breadcrumbs>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Shopping Cart <Chip label={`${totalItems} items`} color="primary" size="small" sx={{ ml: 1, fontWeight: 700 }} />
        </Typography>

        {totalPrice < 999 && (
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Add {(999 - totalPrice).toLocaleString()}$ more for <strong>FREE delivery!</strong>
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={700}>{totalItems} Items</Typography>
                <Button size="small" color="error" onClick={clearCart} id="clear-cart-btn">Clear All</Button>
              </Box>
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ p: 2.5, display: 'flex', gap: 2.5, borderBottom: i < items.length - 1 ? '1px solid' : 'none', borderColor: 'divider', alignItems: 'flex-start' }}>
                      <Box
                        component={Link}
                        to={`/products/${item.id}`}
                        sx={{ width: { xs: 80, sm: 110 }, height: { xs: 80, sm: 110 }, flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}
                      >
                        <Box component="img" src={item.image} alt={item.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{item.brand}</Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          component={Link}
                          to={`/products/${item.id}`}
                          sx={{ textDecoration: 'none', color: 'text.primary', display: 'block', mb: 0.5 }}
                        >
                          {item.name}
                        </Typography>
                        <Chip label={item.category} size="small" variant="outlined" sx={{ mb: 1.5 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                          <Box>
                            <Typography variant="h6" fontWeight={800} color="text.primary">
                              {(item.price * item.quantity).toLocaleString()}$
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.price.toLocaleString()}$ × {item.quantity}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Paper sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)} id={`decrease-${item.id}`}>
                                <Remove fontSize="small" />
                              </IconButton>
                              <Typography sx={{ px: 1.5, fontWeight: 700, minWidth: 32, textAlign: 'center' }}>{item.quantity}</Typography>
                              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)} id={`increase-${item.id}`}>
                                <Add fontSize="small" />
                              </IconButton>
                            </Paper>
                            <IconButton
                              color="error"
                              onClick={() => removeFromCart(item.id)}
                              id={`remove-${item.id}`}
                              sx={{ '&:hover': { bgcolor: 'error.light', color: 'white' } }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
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
                  <Button variant="outlined" size="small" sx={{ whiteSpace: 'nowrap',color:'secondary.main' }} id="apply-coupon-btn">Apply</Button>
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
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/checkout')}
                    id="checkout-btn"
                    sx={{ width: '70%', borderRadius: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/products"
                    id="continue-shopping-btn"
                    sx={{ width: '70%', borderRadius: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
