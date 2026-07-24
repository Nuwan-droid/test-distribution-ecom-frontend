import { useState } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, md: 2 }, position: { sm: 'sticky' }, top: { sm: 100 } }}>
      {/* Thumbnails */}
      {images.length > 1 && (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'row', sm: 'column' }, 
            gap: 1.5, 
            width: { xs: '100%', sm: 60, md: 80 },
            overflowX: { xs: 'auto', sm: 'visible' },
            pb: { xs: 1, sm: 0 },
            order: { xs: 2, sm: 1 } // On mobile, thumbnails below the main image
          }}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              component="img"
              src={img}
              alt={`Thumb ${i + 1}`}
              onClick={() => setSelectedImage(i)}
              sx={{
                width: { xs: 70, sm: '100%' },
                height: { xs: 70, sm: 90, md: 120 },
                flexShrink: 0,
                objectFit: 'cover',
                bgcolor: '#f5f5f5',
                cursor: 'pointer',
                border: i === selectedImage ? '2px solid #333' : '1px solid #e0e0e0',
                transition: 'all 0.2s',
                opacity: i === selectedImage ? 1 : 0.6,
                '&:hover': { opacity: 1 },
              }}
            />
          ))}
        </Box>
      )}
      
      {/* Main Image */}
      <Box sx={{ flex: 1, position: 'relative', order: { xs: 1, sm: 2 } }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              component="img"
              src={images[selectedImage]}
              alt={productName}
              sx={{
                width: '100%',
                height: { xs: 300, sm: 250, md: 400, lg: 450 },
                objectFit: 'cover',
                bgcolor: '#f5f5f5',
                borderRadius: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
