import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { LocalShipping, Replay, VerifiedUser, Headset } from '@mui/icons-material';

const trustBadges = [
  { icon: <LocalShipping sx={{ fontSize: 32, color: 'secondary.main' }} />, title: 'Free Delivery', subtitle: 'On orders above 150$+' },
  { icon: <Replay sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '30-Day Returns', subtitle: 'Easy return policy' },
  { icon: <VerifiedUser sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '100% Authentic', subtitle: 'Genuine products only' },
  { icon: <Headset sx={{ fontSize: 32, color: 'secondary.main' }} />, title: '24/7 Support', subtitle: 'Always here for you' },
];

export default function TrustBadges() {
  return (
    <Box sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, sm: 3, md: 5, lg: 7, xl: 9 },
          }}
        >
          {trustBadges.map((badge, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 0.5,
                position: 'relative',
                '&:not(:last-child)::after': {
                  content: '""',
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  right: { md: -20, lg: -28, xl: -36 },
                  top: '15%',
                  height: '70%',
                  width: '1px',
                  backgroundColor: 'divider',
                },
              }}
            >
              {badge.icon}
              <Box>
                <Typography variant="body2" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>{badge.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>{badge.subtitle}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
