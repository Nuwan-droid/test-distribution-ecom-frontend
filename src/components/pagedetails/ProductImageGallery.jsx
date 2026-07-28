import { useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',          // Always row: thumbnails left, main image right
        gap: { xs: 1, sm: 1.5 },
        position: { sm: 'sticky' },
        top: { sm: 72 },
        alignSelf: { sm: 'flex-start' },
        width: '100%',
      }}
    >
      {/* Thumbnail Strip — vertical, left side */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: { xs: 46, sm: 54, md: 60, lg: 66, xl: 70 },
            flexShrink: 0,
            overflowY: 'auto',
            maxHeight: { xs: 260, sm: 320, md: 360, lg: 400, xl: 430 },
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`View ${i + 1}`}
              onClick={() => setSelectedImage(i)}
              sx={{
                width: '100%',
                height: { xs: 46, sm: 58, md: 66, lg: 74, xl: 78 },
                flexShrink: 0,
                objectFit: 'cover',
                bgcolor: '#f5f5f5',
                cursor: 'pointer',
                borderRadius: 1,
                border: i === selectedImage
                  ? '2px solid #222'
                  : '1.5px solid #e0e0e0',
                transition: 'all 0.18s',
                opacity: i === selectedImage ? 1 : 0.5,
                '&:hover': { opacity: 1, borderColor: '#999' },
              }}
            />
          ))}
        </Box>
      )}

      {/* Main Image — fills remaining width */}
      <Box sx={{ flex: 1, overflow: 'hidden', borderRadius: 1.5 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Box
              component="img"
              src={images[selectedImage]}
              alt={productName}
              sx={{
                width: '100%',
                /* Responsive natural sizing across all breakpoints xs, sm, md, lg, xl */
                height: { xs: 260, sm: 320, md: 360, lg: 400, xl: 430 },
                maxHeight: { xs: 280, sm: 340, md: 380, lg: 420, xl: 450 },
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
