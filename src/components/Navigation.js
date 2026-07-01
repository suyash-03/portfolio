import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Stack, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolioData';

const gradientText = {
  background: 'linear-gradient(135deg, #a5b4fc 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const gradient = 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)';

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
          bgcolor: scrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2.6, md: 4 } }}>
          <Typography component="a" href="#home" sx={{ flexGrow: 1, ...gradientText, fontWeight: 900, textDecoration: 'none', fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
            suyash<Box component="span" sx={{ color: 'secondary.main', WebkitTextFillColor: 'initial' }}>.singh</Box>
          </Typography>
          <Stack direction="row" spacing={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Typography
                key={link} component="a" href={`#${link.toLowerCase()}`}
                sx={{
                  color: 'text.secondary', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
                  position: 'relative', transition: 'color 0.3s', '&:hover': { color: 'text.primary' },
                  '&::after': {
                    content: '""', position: 'absolute', bottom: -4, left: 0, width: '0%', height: 2,
                    background: gradient, transition: 'width 0.3s ease',
                  },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>
          <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }} onClick={() => setDrawerOpen(true)}>
            <Menu size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { bgcolor: 'background.paper', width: 280, borderLeft: '1px solid rgba(255, 255, 255, 0.05)' } }}>
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.primary' }}><X size={24} /></IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItemButton key={link} component="a" href={`#${link.toLowerCase()}`} onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 2, mb: 1, textAlign: 'center' }}>
              <ListItemText primary={link} primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
