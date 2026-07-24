import { Box, Typography, Button, Paper, IconButton, Chip } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartItems({ items, totalItems, updateQuantity, removeFromCart, clearCart }) {
  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight={700}>{totalItems} Items</Typography>
        <Button size="small" color="error" onClick={clearCart} id="clear-cart-btn">Clear All</Button>
      </Box>
      <AnimatePresence>
        {items.map((item, i) => (
          <motion.div
            key={item.cartItemId || item.id}
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
                <Chip label={item.category} size="small" variant="outlined" sx={{ mb: 1 }} />
                {item.selectedSize && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                    Size: {item.selectedSize}
                  </Typography>
                )}
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
                      <IconButton size="small" onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)} id={`decrease-${item.cartItemId || item.id}`}>
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 1.5, fontWeight: 700, minWidth: 32, textAlign: 'center' }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)} id={`increase-${item.cartItemId || item.id}`}>
                        <Add fontSize="small" />
                      </IconButton>
                    </Paper>
                    <IconButton
                      color="error"
                      onClick={() => removeFromCart(item.cartItemId || item.id)}
                      id={`remove-${item.cartItemId || item.id}`}
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
  );
}
