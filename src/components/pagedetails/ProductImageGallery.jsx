import { useState, lazy, Suspense, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ViewInAr } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy-load Three.js — only fetched when user clicks the 3D thumbnail
const ProductViewer3D = lazy(() => import('../3d/ProductViewer3D'));

/* ─── Shared height across photo & canvas ─────────────────────────────────── */
const VIEW_HEIGHT = { xs: 260, sm: 320, md: 360, lg: 400, xl: 430 };
const THUMB_HEIGHT = { xs: 46, sm: 58, md: 66, lg: 74, xl: 78 };
const THUMB_WIDTH  = { xs: 46, sm: 54, md: 60, lg: 66, xl: 70 };

/* ─── 3D canvas loading fallback ──────────────────────────────────────────── */
function Viewer3DFallback() {
  return (
    <Box
      sx={{
        width: '100%',
        height: VIEW_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        background: 'radial-gradient(ellipse at 60% 30%, #e8edf5 0%, #f5f7fa 100%)',
        borderRadius: 1.5,
      }}
    >
      <CircularProgress size={32} thickness={3} sx={{ color: '#111' }} />
      <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, letterSpacing: 1 }}>
        Loading 3D model…
      </Typography>
    </Box>
  );
}

/* ─── Special 3D thumbnail tile ───────────────────────────────────────────── */
function Thumb3D({ isSelected, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      aria-label="View 3D model"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }}
      style={{ padding: 0 }}
      id="gallery-thumb-3d"
      sx={{
        width: '100%',
        height: THUMB_HEIGHT,
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 1,
        border: isSelected ? '2px solid #111' : '1.5px solid #e0e0e0',
        bgcolor: isSelected ? '#111' : '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.3,
        transition: 'all 0.18s',
        opacity: isSelected ? 1 : 0.55,
        '&:hover': {
          opacity: 1,
          borderColor: '#555',
          bgcolor: isSelected ? '#111' : '#ebebeb',
        },
      }}
    >
      <ViewInAr
        sx={{
          fontSize: { xs: 16, sm: 18, md: 20 },
          color: isSelected ? '#fff' : '#444',
        }}
      />
      <Typography
        sx={{
          fontSize: '0.52rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: isSelected ? '#fff' : '#666',
          lineHeight: 1,
        }}
      >
        3D
      </Typography>
    </Box>
  );
}

/* ─── Main Gallery ─────────────────────────────────────────────────────────── */
export default function ProductImageGallery({ images, productName, modelUrl }) {
  // selected: number = photo index, or '3d' for the 3D model
  const [selected, setSelected] = useState(0);

  const is3D = selected === '3d';

  // ——— Background prefetch ———————————————————————————————————
  // Fire 500 ms after mount so the 3D JS bundle + the GLB file are already
  // in the browser cache by the time the user clicks the 3D thumbnail.
  useEffect(() => {
    if (!modelUrl) return;
    const t = setTimeout(() => {
      // 1. Prefetch the Three.js / R3F bundle (lazy chunk)
      import('../3d/ProductViewer3D')
        .then(({ preloadModel }) => {
          // 2. Prefetch the actual .glb file via useGLTF.preload
          preloadModel(modelUrl);
        })
        .catch(() => { /* silently ignore — prefetch is best-effort */ });
    }, 500);
    return () => clearTimeout(t);
  }, [modelUrl]);
  // —————————————————————————————————————————————————

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: 1, sm: 1.5 },
        position: { sm: 'sticky' },
        top: { sm: 72 },
        alignSelf: { sm: 'flex-start' },
        width: '100%',
      }}
    >
      {/* ── Left: Thumbnail Strip ── */}
      {(images.length > 1 || modelUrl) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: THUMB_WIDTH,
            flexShrink: 0,
            overflowY: 'auto',
            maxHeight: VIEW_HEIGHT,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {/* Photo thumbnails */}
          {images.map((img, i) => (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`View ${i + 1}`}
              onClick={() => setSelected(i)}
              sx={{
                width: '100%',
                height: THUMB_HEIGHT,
                flexShrink: 0,
                objectFit: 'cover',
                bgcolor: '#f5f5f5',
                cursor: 'pointer',
                borderRadius: 1,
                border:
                  !is3D && selected === i
                    ? '2px solid #222'
                    : '1.5px solid #e0e0e0',
                transition: 'all 0.18s',
                opacity: !is3D && selected === i ? 1 : 0.5,
                '&:hover': { opacity: 1, borderColor: '#999' },
              }}
            />
          ))}

          {/* 3D model thumbnail — appended at the bottom of the strip */}
          {modelUrl && (
            <Thumb3D
              isSelected={is3D}
              onClick={() => setSelected('3d')}
            />
          )}
        </Box>
      )}

      {/* ── Right: Main Panel — photo or 3D canvas ── */}
      <Box sx={{ flex: 1, overflow: 'hidden', borderRadius: 1.5, minWidth: 0 }}>
        <AnimatePresence mode="wait">
          {!is3D ? (
            /* Photo view */
            <motion.div
              key={`photo-${selected}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                component="img"
                src={images[selected]}
                alt={productName}
                sx={{
                  width: '100%',
                  height: VIEW_HEIGHT,
                  maxHeight: { xs: 280, sm: 340, md: 380, lg: 420, xl: 450 },
                  objectFit: 'cover',
                  bgcolor: '#f5f5f5',
                  display: 'block',
                  borderRadius: 1.5,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                }}
              />
            </motion.div>
          ) : (
            /* 3D canvas — Three.js only loads after first click on the 3D thumb */
            <motion.div
              key="3d"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              style={{ width: '100%' }}
            >
              <Suspense fallback={<Viewer3DFallback />}>
                <ProductViewer3D
                  modelUrl={modelUrl}
                  height={VIEW_HEIGHT}
                  autoRotate
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
