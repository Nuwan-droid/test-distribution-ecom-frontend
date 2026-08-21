import { useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Shared height across photo ───────────────────────────────────────────── */
const VIEW_HEIGHT = { xs: 260, sm: 320, md: 340, lg: 380, xl: 430 };
const THUMB_HEIGHT = { xs: 46, sm: 58, md: 66, lg: 74, xl: 78 };
const THUMB_WIDTH  = { xs: 46, sm: 54, md: 60, lg: 66, xl: 70 };

/* ─── Main Gallery ─────────────────────────────────────────────────────────── */
export default function ProductImageGallery({ images, productName }) {
  const [selected, setSelected] = useState(0);

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
      {images.length > 1 && (
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
                  selected === i
                    ? '2px solid #222'
                    : '1.5px solid #e0e0e0',
                transition: 'all 0.18s',
                opacity: selected === i ? 1 : 0.5,
                '&:hover': { opacity: 1, borderColor: '#999' },
              }}
            />
          ))}
        </Box>
      )}

      {/* ── Right: Main Panel — photo ── */}
      <Box sx={{ flex: 1, overflow: 'hidden', borderRadius: 1.5, minWidth: 0 }}>
        <AnimatePresence mode="wait">
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
                maxHeight: { xs: 280, sm: 340, md: 360, lg: 400, xl: 450 },
                objectFit: 'cover',
                bgcolor: '#f5f5f5',
                display: 'block',
                borderRadius: 1.5,
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
