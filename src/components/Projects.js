import { Box, Container, Card, CardContent, Stack, Typography, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FolderOpen, ExternalLink } from 'lucide-react';
import SectionTitle from './SectionTitle';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Projects = () => {
  return (
    <Box component="section" id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle number="03.">Featured Code</SectionTitle>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4
          }}
        >
          {/* BITS SU App Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card className="bento-card" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <FolderOpen size={20} color="#6366f1" />
                  <Typography variant="subtitle2" color="primary.light" sx={{ fontFamily: 'monospace' }}>Students' Union Project</Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>BITS SU App</Typography>
                <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontSize: '0.95rem', flexGrow: 1 }}>
                  Engineered the official Students' Union mobile application serving 8,000+ active campus users and processing over ₹6M+ in monthly transaction payments.
                </Typography>
                <Stack component="ul" spacing={1.5} sx={{ p: 0, m: 0, listStyle: 'none', mb: 4 }}>
                  {[
                    "Implemented secure QR-based token authentication for payment processing & Google Sign-In (SSO).",
                    "Streamlined unified system state handling with Provider for real-time Google Maps & FCM integration.",
                    "Supported modules: newsletters, merchandise transactions, event ticketing, cab bookings, food orders."
                  ].map((bullet, idx) => (
                    <Box
                      component="li" key={idx}
                      sx={{
                        pl: 3, position: 'relative', color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6,
                        '&::before': { content: '"•"', position: 'absolute', left: 0, color: 'secondary.main', fontWeight: 'bold' }
                      }}
                    >
                      {bullet}
                    </Box>
                  ))}
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3.5 }}>
                  {['Django', 'Flutter', 'Dart', 'Firebase', 'Google Maps API'].map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.15)', color: 'secondary.main', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }} />
                  ))}
                </Stack>
                <Box>
                  <Button
                    variant="outlined" size="small" endIcon={<ExternalLink size={16} />}
                    href="https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app&hl=en_IN"
                    target="_blank" rel="noopener noreferrer"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.1)', color: 'text.primary',
                      '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(255,255,255,0.02)' }
                    }}
                  >
                    View on PlayStore
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* StudyDeck Card */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card className="bento-card" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <FolderOpen size={20} color="#06b6d4" />
                  <Typography variant="subtitle2" color="secondary.main" sx={{ fontFamily: 'monospace' }}>Academic Department Project</Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>StudyDeck</Typography>
                <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontSize: '0.95rem', flexGrow: 1 }}>
                  The official semester scheduler app of the Academic Department, BITS Pilani, facilitating real-time timetable generation and automated conflict resolution for thousands of students.
                </Typography>
                <Stack component="ul" spacing={1.5} sx={{ p: 0, m: 0, listStyle: 'none', mb: 4 }}>
                  {[
                    "Developed cross-platform Flutter app with interactive timetable visualization and conflict resolution.",
                    "Architected using MVC pattern, integrated Provider for efficient global state management.",
                    "Implemented local database response caching with sqflite, minimizing redundant backend server queries."
                  ].map((bullet, idx) => (
                    <Box
                      component="li" key={idx}
                      sx={{
                        pl: 3, position: 'relative', color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6,
                        '&::before': { content: '"•"', position: 'absolute', left: 0, color: 'primary.light', fontWeight: 'bold' }
                      }}
                    >
                      {bullet}
                    </Box>
                  ))}
                </Stack>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3.5 }}>
                  {['Flutter', 'Dart', 'Provider', 'sqflite', 'Timetable Algorithms'].map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'text.secondary', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }} />
                  ))}
                </Stack>
                <Box>
                  <Button
                    variant="outlined" size="small" endIcon={<ExternalLink size={16} />}
                    href="https://studydeck.bits-sutechteam.org/"
                    target="_blank" rel="noopener noreferrer"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.1)', color: 'text.primary',
                      '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(255,255,255,0.02)' }
                    }}
                  >
                    Launch Application
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
