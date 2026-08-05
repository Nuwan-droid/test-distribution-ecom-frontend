import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Slide, Zoom } from '@mui/material';

export default function StoreEntranceAnimation({ children, storeName, tagline = 'CURATED LUXURY & ESSENTIALS' }) {
  const [showVeil, setShowVeil] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Hold the veil for 1.8 seconds, then trigger the fade out
    const veilTimer = setTimeout(() => {
      setShowVeil(false);
    }, 1800);
    
    // Start showing content just slightly before the veil completely disappears
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1900);

    return () => {
      clearTimeout(veilTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      
      {/* ── CINEMATIC ENTERING STORE OVERLAY VEIL ── */}
      {/* Exits with a smooth 1s fade */}
      <Fade in={showVeil} timeout={{ enter: 0, exit: 1000 }} unmountOnExit>
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
          }}
        >
          {/* Slides up smoothly on enter */}
          <Slide direction="up" in={showVeil} timeout={{ enter: 800, exit: 600 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: 3 }}>
              
              <Fade in={true} timeout={1000}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: 6,
                    fontWeight: 600,
                    fontSize: { xs: '0.68rem', sm: '0.82rem' },
                    mb: 1.5,
                  }}
                >
                  Entering Flagship Store
                </Typography>
              </Fade>

              <Fade in={true} timeout={1400}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2rem', sm: '3rem', md: '3.8rem' },
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    mb: 2,
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  {storeName}
                </Typography>
              </Fade>

              <Zoom in={true} timeout={1600}>
                <Box
                  sx={{
                    width: '120px',
                    height: '2px',
                    bgcolor: 'rgba(255,255,255,0.85)',
                    mb: 2,
                  }}
                />
              </Zoom>

              <Fade in={true} timeout={1800}>
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
              </Fade>

            </Box>
          </Slide>
        </Box>
      </Fade>

      {/* ── SHOWROOM FLOOR CONTENT ── */}
      {/* Content gracefully fades in and slides up */}
      <Fade in={showContent} timeout={1200}>
        <Box>
          <Slide direction="up" in={showContent} timeout={1200}>
            <Box sx={{ width: '100%' }}>
              {children}
            </Box>
          </Slide>
        </Box>
      </Fade>

    </Box>
  );
}
