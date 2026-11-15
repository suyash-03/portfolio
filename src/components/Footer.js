import { Box, Typography, Container, Stack } from '@mui/material';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <Box component="footer" sx={{ py: 6, borderTop: '1px solid #ABB2BF', mt: 10, bgcolor: '#282C33' }}>
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Typography sx={{ fontFamily: "'Fira Code', monospace", fontWeight: 600, fontSize: '1rem', color: '#FFFFFF' }}>
              <Box component="span" sx={{ color: '#ABB2BF' }}>&lt;</Box>
              <Box component="span" sx={{ color: '#C778DD' }}>suyash-singh</Box>
              <Box component="span" sx={{ color: '#ABB2BF' }}> /&gt;</Box>
            </Typography>
            <Typography variant="caption" sx={{ color: '#ABB2BF', fontFamily: "'Fira Code', monospace" }}>
              suyash.singh9450@gmail.com
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: '#ABB2BF', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>
            Software Engineer specializing in distributed backends & automation platforms
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: '#FFFFFF', fontWeight: 600, display: 'block', mb: 1, fontFamily: "'Fira Code', monospace" }}>
            Media
          </Typography>
          <Stack direction="row" spacing={2}>
            <a href="https://github.com/suyash-03" target="_blank" rel="noopener noreferrer" style={{ color: '#ABB2BF' }}>
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/suyash-singh-bb9477203/" target="_blank" rel="noopener noreferrer" style={{ color: '#ABB2BF' }}>
              <Linkedin size={20} />
            </a>
            <a href="mailto:suyash.singh9450@gmail.com" style={{ color: '#ABB2BF' }}>
              <Mail size={20} />
            </a>
          </Stack>
        </Box>
      </Stack>

      <Typography variant="caption" sx={{ color: '#ABB2BF', textAlign: 'center', display: 'block', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', opacity: 0.7 }}>
        © Copyright {new Date().getFullYear()}. Designed & engineered by Suyash Singh
      </Typography>
    </Container>
  </Box>
);

export default Footer;
