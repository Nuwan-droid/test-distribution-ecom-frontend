import { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

export default function ProductTabs() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ mt: { xs: 3, md: 4 }, borderTop: '1px solid #e0e0e0', pt: 2 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          '& .MuiTabs-indicator': { backgroundColor: '#111' },
          '& .MuiTab-root': { color: '#666', fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.9rem' }, '&.Mui-selected': { color: '#111' } }
        }}
      >
        <Tab label="ADDITIONAL INFORMATION" />
        <Tab label="REVIEWS" />
        <Tab label="SHIPPING & DELIVERY" />
      </Tabs>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto', minHeight: 200 }}>
        {tab === 0 && (
          <Box></Box>
        )}
        {tab === 1 && (
          <Box></Box>
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
