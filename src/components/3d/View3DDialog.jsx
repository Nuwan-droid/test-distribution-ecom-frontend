import { lazy, Suspense, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Close, ViewInAr, OpenInFull } from '@mui/icons-material';

/**
 * Lazy-import the heavy Three.js canvas.
 * The bundle is only fetched after the Dialog opens for the first time.
 */
const ProductViewer3D = lazy(() => import('./ProductViewer3D'));

/* ─── Bundle loading fallback ─────────────────────────────────────────────── */
function BundleFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 420,
        gap: 2,
        background: 'radial-gradient(ellipse at 60% 30%, #e8edf5 0%, #f5f7fa 100%)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={40} thickness={3} sx={{ color: '#111' }} />
      <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
        Initialising 3D engine…
      </Typography>
    </Box>
  );
}

/* ─── Main dialog ─────────────────────────────────────────────────────────── */
/**
 * View3DDialog — lazy-loads ProductViewer3D (and Three.js) only on open.
 *
 * @param {boolean} open        - controls Dialog visibility
 * @param {()=>void} onClose    - called when user closes dialog
 * @param {string} modelUrl     - path to .glb model
 * @param {string} productName  - displayed in the dialog header
 */
export default function View3DDialog({ open, onClose, modelUrl, productName }) {
  // Warm-up: prefetch the Three.js bundle + GLB file 300ms after the card mounts,
  // so both are in cache before the user ever clicks "3D".
  useEffect(() => {
    if (!modelUrl) return;
    const t = setTimeout(() => {
      import('./ProductViewer3D').then(({ preloadModel }) => {
        preloadModel(modelUrl);
      }).catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [modelUrl]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
        },
      }}
      TransitionProps={{ unmountOnExit: true }}  // unmount canvas on close → frees GPU memory
    >
      {/* ── Header ── */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          py: 1.5,
          px: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: '#ffffff',
        }}
      >
        <ViewInAr sx={{ color: '#111', fontSize: 22 }} />
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ flex: 1, fontSize: '0.95rem', letterSpacing: 0.3 }}
          noWrap
        >
          {productName || '3D View'}
        </Typography>

        <Chip
          label="Interactive 3D"
          size="small"
          icon={<OpenInFull sx={{ fontSize: '13px !important' }} />}
          sx={{
            bgcolor: '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.65rem',
            height: 24,
            letterSpacing: '0.06em',
            '& .MuiChip-icon': { color: '#fff' },
          }}
        />

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close 3D viewer"
          sx={{
            ml: 0.5,
            color: '#444',
            '&:hover': { bgcolor: '#f0f0f0' },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Canvas area ── */}
      <DialogContent sx={{ p: 0, bgcolor: '#f5f7fa' }}>
        <Suspense fallback={<BundleFallback />}>
          {open && (
            <ProductViewer3D
              modelUrl={modelUrl}
              height={480}
              autoRotate
            />
          )}
        </Suspense>

        {/* Footer hint */}
        <Box
          sx={{
            px: 2.5,
            py: 1.4,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#ffffff',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="caption" sx={{ color: '#888', fontWeight: 500 }}>
            Drag to rotate · Scroll to zoom · Auto-rotates when idle
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
