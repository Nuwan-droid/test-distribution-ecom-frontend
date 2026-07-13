import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Button, Paper, Divider, TextField,
  FormControlLabel, Radio, RadioGroup, Stepper, Step, StepLabel,
  Breadcrumbs, Alert,
} from '@mui/material';
import { ArrowBack, ArrowForward, CreditCard, LocalShipping, Lock } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const steps = ['Shipping Address', 'Payment Method', 'Review Order'];

const paymentMethods = [
  { value: 'card', label: 'Credit / Debit Card', icon: <CreditCard />, desc: 'Visa, MasterCard, RuPay, Amex' },
  { value: 'cod', label: 'Cash on Delivery', icon: <LocalShipping />, desc: 'Pay when your order arrives' },
];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState(paymentMethods[0].value);
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();


  const shipping = totalPrice >= 999 ? 0 : 99;
  const discount = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + shipping - discount;

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      clearCart();
      navigate('/order-success');
    } else {
      setActiveStep(s => s + 1);
    }
  };

  const isAddressValid = address.name && address.phone && address.line1 && address.city && address.state && address.pincode;

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Home</Typography>
          <Typography component={Link} to="/cart" sx={{ textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem' }}>Cart</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Checkout</Typography>
        </Breadcrumbs>

        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Checkout</Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4, bgcolor: 'transparent' }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 3, p: 3 }}>
              {/* Step 1: Address */}
              {activeStep === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Shipping Address</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Full Name" required value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} inputProps={{ id: 'checkout-name' }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone Number" required value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} inputProps={{ id: 'checkout-phone' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Address Line 1" required value={address.line1} onChange={e => setAddress(a => ({ ...a, line1: e.target.value }))} placeholder="Street, Area, Landmark" inputProps={{ id: 'checkout-address' }} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="City" required value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} inputProps={{ id: 'checkout-city' }} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="State" required value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} inputProps={{ id: 'checkout-state' }} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField fullWidth label="Postelcode" required value={address.pincode} onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))} inputProps={{ id: 'checkout-pincode', maxLength: 6 }} />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2: Payment */}
              {activeStep === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Select Payment Method</Typography>
                  <RadioGroup value={payment} onChange={e => setPayment(e.target.value)}>
                    {paymentMethods.map(method => (
                      <Paper
                        key={method.value}
                        onClick={() => setPayment(method.value)}
                        sx={{
                          p: 2, mb: 1.5, borderRadius: 2,
                          border: '2px solid', cursor: 'pointer',
                          borderColor: payment === method.value ? 'primary.main' : 'divider',
                          bgcolor: payment === method.value ? '#FFF5F0' : 'background.paper',
                          transition: 'all 0.2s',
                        }}
                      >
                        <FormControlLabel
                          value={method.value}
                          control={<Radio color="primary" />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{ color: 'primary.main' }}>{method.icon}</Box>
                              <Box>
                                <Typography variant="body1" fontWeight={600}>{method.label}</Typography>
                                <Typography variant="caption" color="text.secondary">{method.desc}</Typography>
                              </Box>
                            </Box>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                      </Paper>
                    ))}
                  </RadioGroup>

                  {payment === 'card' && (
                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Card Number" placeholder="1234 5678 9012 3456" inputProps={{ id: 'card-number', maxLength: 19 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField fullWidth label="Expiry (MM/YY)" placeholder="12/27" inputProps={{ id: 'card-expiry' }} />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField fullWidth label="CVV" placeholder="123" type="password" inputProps={{ id: 'card-cvv', maxLength: 4 }} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Name on Card" inputProps={{ id: 'card-name' }} />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }} icon={<Lock fontSize="small" />}>
                    Your payment is secured
                  </Alert>
                </Box>
              )}

              {/* Step 3: Review */}
              {activeStep === 2 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>Review Your Order</Typography>

                  <Paper sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, mb: 2.5 }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>Delivery Address</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.name} · {address.phone}<br />
                      {address.line1}, {address.city}, {address.state} - {address.pincode}
                    </Typography>
                  </Paper>

                  <Paper sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, mb: 2.5 }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>Payment</Typography>
                    <Typography variant="body2" color="text.secondary">{paymentMethods.find(m => m.value === payment)?.label}</Typography>
                  </Paper>

                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>Order Items ({items.length})</Typography>
                  {items.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Qty: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={700}>{(item.price * item.quantity).toLocaleString()}$</Typography>
                    </Box>
                  ))}

                  <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                    Estimated delivery: <strong>2–4 business days</strong>
                  </Alert>
                </Box>
              )}

              {/* Navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3.5, pt: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => activeStep === 0 ? navigate('/cart') : setActiveStep(s => s - 1)}
                  id="checkout-back-btn"
                >
                  {activeStep === 0 ? 'Back to Cart' : 'Back'}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={activeStep === steps.length - 1 ? undefined : <ArrowForward />}
                  onClick={handleNext}
                  disabled={activeStep === 0 && !isAddressValid}
                  id="checkout-next-btn"
                  sx={{ minWidth: 160 }}
                >
                  {activeStep === steps.length - 1 ? ' Place Order' : 'Continue'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', position: { md: 'sticky' }, top: 90 }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={700}>Order Summary</Typography>
              </Box>
              <Box sx={{ p: 2.5 }}>
                {items.slice(0, 3).map(item => (
                  <Box key={item.id} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                    <Box component="img" src={item.image} sx={{ width: 44, height: 44, borderRadius: 1.5, objectFit: 'cover' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" fontWeight={600} sx={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">×{item.quantity}</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{(item.price * item.quantity).toLocaleString()}$</Typography>
                  </Box>
                ))}
                {items.length > 3 && (
                  <Typography variant="caption" color="text.secondary">+{items.length - 3} more items</Typography>
                )}
                <Divider sx={{ my: 2 }} />
                {[
                  { label: 'Subtotal', value: `${totalPrice.toLocaleString()}$` },
                  { label: 'Discount (5%)', value: `-${discount.toLocaleString()}$`, color: 'success.main' },
                  { label: 'Shipping', value: shipping === 0 ? 'FREE' : `${shipping}$`, color: shipping === 0 ? 'success.main' : undefined },
                ].map((row, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                    <Typography variant="body2" fontWeight={600} color={row.color || 'text.primary'}>{row.value}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight={700}>Total</Typography>
                  <Typography variant="h6" fontWeight={800} color="primary.main">{finalTotal.toLocaleString()}$</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
