import { Box, Paper, Typography, Avatar } from '@mui/material';
import { Star } from '@mui/icons-material';

export default function SingleTestimonial({ testimonial }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%', // Take up 100% height of parent grid item
        width: '100%',  // Take up 100% width of parent grid item
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      {/* Star Ratings Row */}
      <Box sx={{ display: 'flex', mb: 1.5 }}>
        {[...Array(testimonial.rating)].map((_, s) => (
          <Star key={s} sx={{ color: '#F59E0B', fontSize: 18 }} />
        ))}
      </Box>

      {/* Testimonial Text - flexGrow: 1 pushes the avatar section to the bottom */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 2.5,
          fontStyle: 'italic',
          lineHeight: 1.7,
          fontSize: '0.925rem',
          flexGrow: 1 // Forces equal layout alignment
        }}
      >
        "{testimonial.text}"
      </Typography>

      {/* User Bio Section (Bottom-pinned) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
        <Avatar src={testimonial.avatar} sx={{ width: 44, height: 44 }} />
        <Box>
          <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'capitalize' }}>
            {testimonial.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Verified Buyer
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
