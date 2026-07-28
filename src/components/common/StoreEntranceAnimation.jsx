import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function StoreEntranceAnimation({ children, storeName, tagline = 'CURATED LUXURY & ESSENTIALS' }) {
  const [showVeil, setShowVeil] = useState(true);

  useEffect(() => {
    // Unmount veil from DOM after animation completes so it doesn't block pointer events
    const timer = setTimeout(() => {
      setShowVeil(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* ── CINEMATIC ENTERING STORE OVERLAY VEIL (GPU COMPOSITED) ── */}
      {showVeil && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#111111',
            color: '#FFFFFF',
            pointerEvents: 'none',
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            animation: 'veilSlideOut 1.2s cubic-bezier(0.77, 0, 0.175, 1) 0.8s forwards',
            '@keyframes veilSlideOut': {
              '0%': {
                opacity: 1,
                transform: 'translateY(0) translateZ(0)',
              },
              '70%': {
                opacity: 0.9,
              },
              '100%': {
                opacity: 0,
                transform: 'translateY(-12%) translateZ(0)',
                visibility: 'hidden',
              },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              px: 3,
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
              animation: 'contentFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              '@keyframes contentFadeUp': {
                '0%': { opacity: 0, transform: 'translateY(20px) translateZ(0)' },
                '100%': { opacity: 1, transform: 'translateY(0) translateZ(0)' },
              },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: 6,
                fontWeight: 600,
                fontSize: { xs: '0.68rem', sm: '0.82rem' },
                mb: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Entering Flagship Store
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', sm: '3rem', md: '3.8rem' },
                letterSpacing: 2,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                mb: 2,
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {storeName}
            </Typography>

            {/* GPU-Composited Luxury Divider Line (using scaleX instead of width to prevent reflows) */}
            <Box
              sx={{
                width: '120px',
                height: '2px',
                bgcolor: 'rgba(255,255,255,0.85)',
                transformOrigin: 'center',
                willChange: 'transform, opacity',
                animation: 'lineExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
                '@keyframes lineExpand': {
                  '0%': { transform: 'scaleX(0)', opacity: 0 },
                  '100%': { transform: 'scaleX(1)', opacity: 1 },
                },
                mb: 2,
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: 3,
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.9rem' },
              }}
            >
              {tagline}
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── SHOWROOM FLOOR CONTENT (GPU-OPTIMIZED FADE & GENTLE TRANSLATE WITHOUT HEAVY TREE SCALING) ── */}
      <Box
        sx={{
          width: '100%',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
          animation: 'showroomEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
          opacity: 0,
          '@keyframes showroomEnter': {
            '0%': {
              opacity: 0,
              transform: 'translateY(14px) translateZ(0)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0) translateZ(0)',
            },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
