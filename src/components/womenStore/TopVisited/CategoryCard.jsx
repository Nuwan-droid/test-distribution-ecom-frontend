import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ title, image, count }) {
  const navigate = useNavigate();

  const len = title ? title.length : 0;
  const isSuperLong = len > 13;
  const isLong = len > 9;
  const isMedium = len > 7;

  return (
    <Box
      onClick={() => navigate(`/products?category=Women fashion&subcategory=${title}`)}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 180, sm: 220, md: 300 },
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 4,
        '&:hover img': { transform: 'scale(1.05)' },
        '&:hover .count-overlay': { opacity: 1 },
        '&:hover .bg-overlay': { bgcolor: 'rgba(0,0,0,0.5)' }
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
      />
      <Box
        className="bg-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 1, md: 1.5 },
          transition: 'background-color 0.3s ease'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 800,
            letterSpacing: isSuperLong ? '0.3px' : isLong ? '0.5px' : isMedium ? '0.75px' : '1px',
            textAlign: 'center',
            lineHeight: 1.15,
            wordBreak: 'normal',
            overflowWrap: 'normal',
            fontSize: isSuperLong
              ? { xs: '0.72rem', sm: '0.78rem', md: '0.82rem' }
              : isLong
              ? { xs: '0.78rem', sm: '0.85rem', md: '0.9rem' }
              : isMedium
              ? { xs: '0.85rem', sm: '0.92rem', md: '0.98rem' }
              : { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          }}
        >
          {title.toUpperCase()}
        </Typography>
        
        <Typography 
          className="count-overlay"
          variant="subtitle1" 
          sx={{ 
            color: 'white', 
            opacity: 0, 
            transition: 'opacity 0.3s ease',
            mt: 1,
            fontWeight: 500
          }}
        >
          {count} Products
        </Typography>
      </Box>
    </Box>
  );
}
