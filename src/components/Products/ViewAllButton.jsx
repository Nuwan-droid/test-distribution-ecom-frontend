import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function ViewAllButton({ to, label = "View all" }) {
  return (
    <Button
      component={Link}
      to={to}
      disableRipple
      endIcon={<ChevronRight sx={{ fontSize: 18 }} />}
      sx={{
        textTransform: 'none',
        color: 'secondary.main',
        fontWeight: 600,
        fontSize: { xs: '0.85rem', md: '0.9rem' },
        padding: '4px 8px',
        minWidth: 'auto',
        '&:hover': {
          bgcolor: 'transparent',
          color: 'secondary.dark',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
        },
        '& .MuiButton-endIcon': {
          marginLeft: '2px',
          transition: 'transform 0.2s',
        },
        '&:hover .MuiButton-endIcon': {
          transform: 'translateX(3px)',
        }
      }}
    >
      {label}
    </Button>
  );
}
