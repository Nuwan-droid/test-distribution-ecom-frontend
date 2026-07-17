import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, Paper, Tabs, Tab, Avatar, Button,
  Chip, Divider, List, ListItem, ListItemText, IconButton, TextField,
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import {
  Person, ListAlt, LocationOn, Favorite, Logout, Edit, ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard';

const statusColor = {
  Delivered: 'success',
  Processing: 'warning',
  Shipped: 'info',
  Cancelled: 'error',
};

export default function Account() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'orders' ? 1 : 0);
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>Please sign in to view your account</Typography>
          <Button variant="contained" component={Link} to="/login" size="large">Sign In</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>My Account</Typography>
        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 3, p: 3, textAlign: 'center', mb: 2 }}>
              <Avatar src={user.avatar} sx={{ width: 80, height: 80, mx: 'auto', mb: 2, border: '3px solid', borderColor: 'primary.main' }} />
              <Typography variant="h6" fontWeight={700}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
              <Button variant="outlined" size="small" startIcon={<Edit />} sx={{ mt: 2, borderRadius: 2 }} id="edit-profile-btn">
                Edit Profile
              </Button>
            </Paper>

            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {[
                { icon: <Person />, label: 'Profile', tabIndex: 0 },
                { icon: <ListAlt />, label: 'My Orders', tabIndex: 1 },
                { icon: <LocationOn />, label: 'Addresses', tabIndex: 2 },
                { icon: <Favorite />, label: `Wishlist (${wishlist.length})`, tabIndex: 3 },
              ].map(item => (
                <Box
                  key={item.tabIndex}
                  onClick={() => setTab(item.tabIndex)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.8,
                    cursor: 'pointer', borderLeft: tab === item.tabIndex ? '3px solid' : '3px solid transparent',
                    borderColor: tab === item.tabIndex ? 'primary.main' : 'transparent',
                    bgcolor: tab === item.tabIndex ? '#FFF5F0' : 'background.paper',
                    color: tab === item.tabIndex ? 'primary.main' : 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#FFF5F0' },
                  }}
                  id={`account-tab-${item.tabIndex}`}
                >
                  {item.icon}
                  <Typography variant="body2" fontWeight={tab === item.tabIndex ? 700 : 400}>{item.label}</Typography>
                </Box>
              ))}
              <Divider />
              <Box
                onClick={() => { logout(); navigate('/'); }}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.8,
                  cursor: 'pointer', color: 'error.main',
                  '&:hover': { bgcolor: '#FFF0F0' },
                }}
                id="logout-btn"
              >
                <Logout fontSize="small" />
                <Typography variant="body2" fontWeight={500}>Logout</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ borderRadius: 3, p: 3, minHeight: 400 }}>
              {/* Profile */}
              {tab === 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Profile Information</Typography>
                  <Grid container spacing={2}>
                    {[
                      { label: 'Full Name', value: user.name },
                      { label: 'Email Address', value: user.email },
                      { label: 'Phone Number', value: user.phone },
                      { label: 'Member Since', value: 'January 2024' },
                    ].map(f => (
                      <Grid item xs={12} sm={6} key={f.label}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</Typography>
                          <Typography variant="body1" fontWeight={500} sx={{ mt: 0.5 }}>{f.value}</Typography>
                        </Box>
                        <Divider sx={{ mt: 1.5 }} />
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ mt: 3, p: 2, bgcolor: '#F0FDF4', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>Total Orders</Typography>
                      <Typography variant="h5" fontWeight={800} color="primary.main">{user.orders?.length || 0}</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>Total Spent</Typography>
                      <Typography variant="h5" fontWeight={800} color="primary.main">
                        {(user.orders?.reduce((s, o) => s + o.total, 0) ?? 0).toLocaleString()}$
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>Wishlist Items</Typography>
                      <Typography variant="h5" fontWeight={800} color="primary.main">{wishlist.length}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Orders */}
              {tab === 1 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>My Orders</Typography>
                  {user.orders?.map(order => (
                    <Paper
                      key={order.id}
                      sx={{
                        p: 2.5, mb: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="body1" fontWeight={700}>{order.id}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</Typography>
                      </Box>
                      <Chip label={order.status} color={statusColor[order.status] || 'default'} size="small" sx={{ fontWeight: 600 }} />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body1" fontWeight={800}>{order.total.toLocaleString()}$</Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={<ArrowForward />}
                        component={Link}
                        to={`/track?order=${order.id}`}
                        id={`track-order-${order.id}`}
                        sx={{ borderRadius: 2 }}
                      >
                        Track
                      </Button>
                    </Paper>
                  ))}
                </Box>
              )}

              {/* Addresses */}
              {tab === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                    <Typography variant="h6" fontWeight={700}>Saved Addresses</Typography>
                    <Button variant="outlined" size="small" id="add-address-btn" sx={{ borderRadius: 2 }}>+ Add Address</Button>
                  </Box>
                  {user.addresses?.map(addr => (
                    <Paper key={addr.id} sx={{ p: 2.5, borderRadius: 2, border: '2px solid', borderColor: addr.isDefault ? 'primary.main' : 'divider', mb: 2, position: 'relative' }}>
                      {addr.isDefault && <Chip label="Default" color="primary" size="small" sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700 }} />}
                      <Typography variant="body2" fontWeight={700}>{addr.type}</Typography>
                      <Typography variant="body2" color="text.secondary">{addr.line1}, {addr.city}, {addr.state} - {addr.pincode}</Typography>
                      <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Edit</Button>
                        <Button size="small" color="error" sx={{ borderRadius: 2 }}>Delete</Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}

              {/* Wishlist */}
              {tab === 3 && (
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>My Wishlist ({wishlist.length})</Typography>
                  {wishlist.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <Typography sx={{ fontSize: '3rem', mb: 2 }}>💝</Typography>
                      <Typography variant="h6" fontWeight={700} gutterBottom>Your wishlist is empty</Typography>
                      <Button variant="contained" component={Link} to="/products">Browse Products</Button>
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {wishlist.map(p => (
                        <Grid item xs={6} sm={4} key={p.id}>
                          <ProductCard product={p} compact />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
