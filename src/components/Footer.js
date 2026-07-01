import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ py: 6, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', mt: 10 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      Designed & engineered by Suyash Singh
    </Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5 }}>
      © {new Date().getFullYear()} All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
