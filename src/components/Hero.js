import { useRef } from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import profilePhoto from '../profile.png';

const RESUME_URL = 'https://drive.google.com/file/d/1k3hBRM9GzNaaKSWFixiYYKq5Ft4h1ITu/view?usp=sharing';

// Staggered landing animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  const heroRef = useRef(null);

  // Parallax scroll reaction
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <Box
      ref={heroRef}
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 14, md: 18 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Hero Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: { xs: 8, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Left Column: Heading, Bio, CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY }}
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants}>
              <div className="status-badge" style={{ marginBottom: 24 }}>
                <span className="status-dot" />
                <span>Software Engineer 2 @ Micron</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2.4rem', md: '3.2rem', lg: '3.6rem' },
                  mb: 3,
                  lineHeight: { xs: 1.25, md: 1.18 },
                  fontWeight: 700,
                  fontFamily: "'Fira Code', monospace",
                  color: '#FFFFFF',
                  wordBreak: 'break-word',
                }}
              >
                Suyash is a{' '}
                <Box component="span" sx={{ color: '#C778DD' }}>
                  software engineer
                </Box>{' '}
                and distributed systems builder.
              </Typography>
            </motion.div>

            {/* Subtext description */}
            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: 'text.secondary',
                  mb: 5,
                  lineHeight: 1.8,
                  maxWidth: 540,
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                He crafts scalable test orchestration platforms, event-driven firmware pipelines, and AI agent debugging servers at Micron. Alumnus of BITS Pilani.
              </Typography>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" gap={2}>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  href="#contact"
                  sx={{
                    borderColor: '#C778DD',
                    color: '#C778DD',
                    fontFamily: "'Fira Code', monospace",
                    px: 3,
                    py: 1.3,
                    '&:hover': {
                      borderColor: '#C778DD',
                      bgcolor: 'rgba(199, 120, 221, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  Contact me !!
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="#experience"
                  sx={{
                    borderColor: '#ABB2BF',
                    color: '#ABB2BF',
                    fontFamily: "'Fira Code', monospace",
                    px: 3,
                    py: 1.3,
                    '&:hover': {
                      borderColor: '#C778DD',
                      color: '#C778DD',
                      bgcolor: 'rgba(199, 120, 221, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  View Experience
                </Button>

                {/* Desktop-only Resume Button */}
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Download size={18} />}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    borderColor: '#ABB2BF',
                    color: '#ABB2BF',
                    fontFamily: "'Fira Code', monospace",
                    px: 3,
                    py: 1.3,
                    '&:hover': {
                      borderColor: '#C778DD',
                      color: '#C778DD',
                      bgcolor: 'rgba(199, 120, 221, 0.05)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  Resume
                </Button>
              </Stack>
            </motion.div>
          </motion.div>

          {/* Right Column: Figma-inspired Geometric Artwork + Status Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: visualY, position: 'relative' }}
          >
            <Box
              sx={{
                position: 'relative',
                maxWidth: 420,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Floating Decorative Wireframe Box (Top-Left) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: -20,
                  left: -10,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="98" height="98" stroke="#C778DD" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
                  <rect x="22" y="22" width="56" height="56" stroke="#C778DD" strokeWidth="1.5" opacity="0.8" />
                </svg>
              </motion.div>

              {/* Floating Dot Matrix (Top-Right) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: 35,
                  right: -8,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 54, sm: 72 },
                    height: { xs: 54, sm: 72 },
                    backgroundImage: 'radial-gradient(circle, #ABB2BF 1.5px, transparent 1.5px)',
                    backgroundSize: '14px 14px',
                    opacity: 0.5,
                  }}
                />
              </motion.div>

              {/* Floating Dot Matrix (Bottom-Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: 45,
                  left: -12,
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 48, sm: 60 },
                    height: { xs: 48, sm: 60 },
                    backgroundImage: 'radial-gradient(circle, #C778DD 1.5px, transparent 1.5px)',
                    backgroundSize: '12px 12px',
                    opacity: 0.45,
                  }}
                />
              </motion.div>

              {/* Profile Image with Geometric Frame */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: { xs: 260, sm: 310 },
                  height: { xs: 300, sm: 360 },
                  border: '1px solid #ABB2BF',
                  bgcolor: '#2C313A',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Suyash Singh"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1.04)',
                  }}
                />
                {/* Tech Bracket Accents */}
                <Box sx={{ position: 'absolute', top: 10, left: 10, width: 14, height: 14, borderTop: '2px solid #C778DD', borderLeft: '2px solid #C778DD' }} />
                <Box sx={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderTop: '2px solid #C778DD', borderRight: '2px solid #C778DD' }} />
                <Box sx={{ position: 'absolute', bottom: 10, left: 10, width: 14, height: 14, borderBottom: '2px solid #C778DD', borderLeft: '2px solid #C778DD' }} />
                <Box sx={{ position: 'absolute', bottom: 10, right: 10, width: 14, height: 14, borderBottom: '2px solid #C778DD', borderRight: '2px solid #C778DD' }} />
              </Box>

              {/* Signature Figma Status Bar pinned beneath portrait */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{ zIndex: 2, marginTop: '-14px', width: '92%' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: '10px 16px',
                    border: '1px solid #ABB2BF',
                    bgcolor: '#282C33',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      bgcolor: '#C778DD',
                      flexShrink: 0,
                      boxShadow: '0 0 10px rgba(199, 120, 221, 0.7)',
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: { xs: '0.75rem', sm: '0.82rem' },
                      color: '#ABB2BF',
                      lineHeight: 1.4,
                    }}
                  >
                    Currently working on{' '}
                    <Box component="span" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      Summit & AI Agents
                    </Box>
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        {/* Signature Figma Template Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: '6rem' }}
        >
          <Box sx={{ maxWidth: 720, mx: 'auto', px: 2, position: 'relative' }}>
            {/* Main Quote Card */}
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                border: '1px solid #ABB2BF',
                bgcolor: '#282C33',
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Top-Left Overlapping Quote Mark */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -16,
                  left: 20,
                  px: 1,
                  bgcolor: '#282C33',
                  color: '#ABB2BF',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '2rem',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                “
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: { xs: '0.95rem', sm: '1.2rem' },
                  fontWeight: 500,
                  color: '#FFFFFF',
                  lineHeight: 1.6,
                }}
              >
                There are only two hard things in Computer Science: cache invalidation, naming things, and off-by-one errors.
              </Typography>

              {/* Bottom-Right Overlapping Quote Mark */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -16,
                  right: 20,
                  px: 1,
                  bgcolor: '#282C33',
                  color: '#ABB2BF',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '2rem',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                ”
              </Box>
            </Box>

            {/* Author Box directly attached below, right aligned */}
            <Box
              sx={{
                display: 'inline-block',
                float: 'right',
                mt: '-1px',
                p: { xs: '8px 14px', sm: '10px 18px' },
                border: '1px solid #ABB2BF',
                borderTop: 'none',
                bgcolor: '#282C33',
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  color: '#ABB2BF',
                }}
              >
                - Phil Karlton
              </Typography>
            </Box>
            <Box sx={{ clear: 'both' }} />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
