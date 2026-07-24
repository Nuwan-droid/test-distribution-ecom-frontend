import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ title, image, count }) {
  const navigate = useNavigate();

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
          transition: 'background-color 0.3s ease'
        }}
      >
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, letterSpacing: 2, textAlign: 'center' }}>
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
