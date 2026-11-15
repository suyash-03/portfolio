import { useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';
import aboutPhoto from '../about_photo.jpeg';

const About = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Asymmetrical parallax float transitions
  const leftY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Box ref={containerRef} component="section" id="about" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle>about-me</SectionTitle>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
            gap: { xs: 4, md: 5 },
            alignItems: 'start'
          }}
        >
          {/* Photo Column (Left Parallax Shift) */}
          <motion.div style={{ y: leftY, width: '100%', maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
            <Box
              sx={{
                borderRadius: '5px',
                overflow: 'hidden',
                border: '1px solid #ABB2BF',
                position: 'relative',
                bgcolor: '#2C313A'
              }}
            >
              <img
                src={aboutPhoto}
                alt="Suyash Singh"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </Box>
          </motion.div>

          {/* Content Column (Right Parallax Shift) */}
          <motion.div style={{ y: rightY }}>
            <Card className="bento-card">
              <div className="dot-corner top-right" />
              <CardContent sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, fontFamily: "'Fira Code', monospace" }}>Suyash Singh</Typography>
                <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8, fontSize: '0.92rem', fontFamily: "'Fira Code', monospace" }}>
                  Hey there! I am a Software Engineer 2 at <Box component="span" sx={{ color: '#C778DD', fontWeight: 500 }}>Micron</Box> in Bangalore.
                  I graduated from <Box component="span" sx={{ color: '#C778DD', fontWeight: 500 }}>BITS Pilani</Box> with a B.E. in Electrical and Electronics Engineering.
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.8, fontSize: '0.92rem', fontFamily: "'Fira Code', monospace" }}>
                  I specialize in constructing reliable systems, automating heavy testing structures, and scaling applications to support rapid organizational workloads.
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8, fontSize: '0.92rem', fontFamily: "'Fira Code', monospace" }}>
                  Outside of work, I do Competitive Programming (LeetCode rating 1800+) and enjoy badminton, gym sessions, and gaming.
                </Typography>

                {/* Funny Quote Box */}
                <Box sx={{ p: 2, bgcolor: '#282C33', border: '1px solid #ABB2BF', borderRadius: '4px' }}>
                  <Typography variant="body2" sx={{ fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', color: '#ABB2BF', lineHeight: 1.6 }}>
                    <Box component="span" sx={{ color: '#C778DD', fontWeight: 600 }}>// Philosophy: </Box>
                    "It works on my machine — so we're shipping your machine."
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Stats Row */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2.5,
                mt: 3
              }}
            >
              <Card className="bento-card">
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <Trophy size={16} color="#C778DD" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontFamily: "'Fira Code', monospace" }}>LeetCode</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Fira Code', monospace", color: '#FFFFFF' }}>1800+</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>Top 7% (400k+ users)</Typography>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <Award size={16} color="#ABB2BF" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontFamily: "'Fira Code', monospace" }}>JEE Mains</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Fira Code', monospace", color: '#FFFFFF' }}>99.20%ile</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>Top 0.8% nationwide</Typography>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <GraduationCap size={16} color="#C778DD" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, fontFamily: "'Fira Code', monospace" }}>BITSAT</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Fira Code', monospace", color: '#FFFFFF' }}>Score 336</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>Top ~1% rank</Typography>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
