import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'summit', label: 'Summit Sandbox' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const SideDotsNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial run
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: { xs: 'none', lg: 'block' }
      }}
    >
      <Stack spacing={2.5} alignItems="center">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <Tooltip
              key={sec.id}
              title={sec.label}
              placement="left"
              arrow
              enterDelay={100}
              leaveDelay={100}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'rgba(9, 9, 13, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: 'text.primary',
                    px: 1.5,
                    py: 0.8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }
                },
                arrow: {
                  sx: {
                    color: 'rgba(9, 9, 13, 0.95)'
                  }
                }
              }}
            >
              <Box
                component="a"
                href={`#${sec.id}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  textDecoration: 'none',
                  position: 'relative'
                }}
              >
                {/* Visual Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.2)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    boxShadow: isActive ? '0 0 10px #06b6d4' : 'none'
                  }}
                />
              </Box>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SideDotsNav;
