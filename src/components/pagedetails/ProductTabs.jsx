import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

export default function ProductTabs() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        mt: { xs: 3, sm: 4, md: 5, lg: 6, xl: 6 },
        pt: { xs: 2, sm: 2.5, md: 3 },
        borderTop: '1px solid #e0e0e0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
          '& .MuiTabs-indicator': { backgroundColor: '#111' },
          '& .MuiTab-root': {
            color: '#666',
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' },
            '&.Mui-selected': { color: '#111' },
          },
        }}
      >
        <Tab label="ADDITIONAL INFORMATION" />
        <Tab label="REVIEWS" />
        <Tab label="SHIPPING & DELIVERY" />
      </Tabs>

      <Box sx={{ py: { xs: 2, sm: 2.5, md: 3, lg: 3.5 }, px: { xs: 2, sm: 3, md: 4 }, maxWidth: 800, mx: 'auto', minHeight: 60, textAlign: 'center' }}>
        {tab === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Standard product sizing and authentic materials guaranteed.
          </Typography>
        )}
        {tab === 1 && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No customer reviews yet. Be the first to review this product!
          </Typography>
        )}
        {tab === 2 && (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Standard delivery takes 3-5 business days.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
