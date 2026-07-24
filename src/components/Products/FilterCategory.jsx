import { Accordion, AccordionSummary, AccordionDetails, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FilterCategory({ title, options }) {
  return (
    <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #eee' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0 }}>
        <FormGroup>
          {options.map((option, index) => (
            <FormControlLabel 
              key={index} 
              control={<Checkbox size="small" />} 
              label={<Typography variant="body2">{option}</Typography>} 
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}
