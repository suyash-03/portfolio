import { useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Award, GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';
import profilePhoto from '../profile.png';

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
        <SectionTitle number="01.">About Me</SectionTitle>
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
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 35px rgba(0,0,0,0.5)',
                position: 'relative'
              }}
            >
              <img
                src={profilePhoto}
                alt="Suyash Singh"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </Box>
          </motion.div>

          {/* Content Column (Right Parallax Shift) */}
          <motion.div style={{ y: rightY }}>
            <Card className="bento-card">
              <CardContent sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Suyash Singh</Typography>
                <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: '0.95rem' }}>
                  Hey there! I am a Software Engineer 2 at <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>Micron</Box> in Bangalore.
                  I graduated from <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>BITS Pilani</Box> with a B.E. in Electrical and Electronics Engineering.
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: '0.95rem' }}>
                  I specialize in constructing reliable systems, automating heavy testing structures, and scaling applications to support rapid organizational workloads.
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
                  Outside of work, I do Competitive Programming (LeetCode rating 1800+) and enjoy badminton, gym sessions, and gaming.
                </Typography>
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
                    <Trophy size={16} color="#f59e0b" />
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>LeetCode</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>1800+</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Top 7% (400k+ users)</Typography>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <Award size={16} color="#06b6d4" />
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>JEE Mains</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>99.20%ile</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Top 0.8% nationwide</Typography>
                </CardContent>
              </Card>

              <Card className="bento-card">
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <GraduationCap size={16} color="#6366f1" />
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>BITSAT</Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>Score 336</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>Top ~1% rank</Typography>
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
