import React from 'react';
import { Container, Box } from '@mui/material';
import ClaimYourVoucherBanner from './ClaimYourVoucherBanner';
import FlashSaleBanner from './FlashSaleBanner';

const PromoBanners = ({ showVoucher = true, showFlashSale = true }) => {
  if (!showVoucher && !showFlashSale) return null;

  return (
    <Container maxWidth="xl" sx={{ mb: 6, mt: 4, px: { xs: 2, sm: 3, md: 4, lg: 4, xl: 4 } }}>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: { xs: 2, sm: 3, md: 4, lg: 5, xl: 15 }, 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch' 
        }}
      >
        {showVoucher && (
          <Box sx={{ flex: 1, display: 'flex', minWidth: 0 }}>
            <ClaimYourVoucherBanner />
          </Box>
        )}

        {showFlashSale && (
          <Box sx={{ flex: 1, display: 'flex', minWidth: 0 }}>
            <FlashSaleBanner />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PromoBanners;
