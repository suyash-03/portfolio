import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Stack, IconButton, Drawer, List, ListItemButton, ListItemText, Button } from '@mui/material';
import { Menu, X, Download } from 'lucide-react';
import { navLinks } from '../data/portfolioData';

const RESUME_URL = 'https://drive.google.com/file/d/1k3hBRM9GzNaaKSWFixiYYKq5Ft4h1ITu/view?usp=sharing';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed" elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(40, 44, 51, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid #ABB2BF' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* Logo: <suyash-singh /> style */}
          <Typography
            component="a" href="#home"
            sx={{
              flexGrow: 1,
              fontFamily: "'Fira Code', monospace",
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: 'text.primary',
            }}
          >
            <Box component="span" sx={{ color: '#ABB2BF' }}>&lt;</Box>
            <Box component="span" sx={{ color: '#C778DD' }}>suyash-singh</Box>
            <Box component="span" sx={{ color: '#ABB2BF' }}> /&gt;</Box>
          </Typography>

          {/* Desktop nav links with # prefix */}
          <Stack direction="row" spacing={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Typography
                key={link} component="a" href={`#${link.toLowerCase()}`}
                sx={{
                  fontFamily: "'Fira Code', monospace",
                  color: 'text.secondary', fontSize: '0.9rem', fontWeight: 400, textDecoration: 'none',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#C778DD' },
                }}
              >
                <Box component="span" sx={{ color: '#C778DD' }}>#</Box>
                {link.toLowerCase()}
              </Typography>
            ))}
          </Stack>

          <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }} onClick={() => setDrawerOpen(true)}>
            <Menu size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#2C313A',
            width: 280,
            borderLeft: '1px solid #ABB2BF',
            fontFamily: "'Fira Code', monospace"
          }
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.primary' }}><X size={24} /></IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link} component="a" href={`#${link.toLowerCase()}`}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 1, mb: 1 }}
            >
              <ListItemText
                primary={
                  <Box component="span" sx={{ fontFamily: "'Fira Code', monospace" }}>
                    <Box component="span" sx={{ color: '#C778DD' }}>#</Box>
                    {link.toLowerCase()}
                  </Box>
                }
              />
            </ListItemButton>
          ))}
          {/* Mobile Resume Button */}
          <Box sx={{ px: 2, pt: 2, mt: 2, borderTop: '1px solid rgba(171, 178, 191, 0.2)' }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Download size={16} />}
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: '#C778DD',
                color: '#C778DD',
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.85rem',
                py: 1,
                '&:hover': {
                  borderColor: '#C778DD',
                  bgcolor: 'rgba(199, 120, 221, 0.1)',
                }
              }}
            >
              Resume
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
