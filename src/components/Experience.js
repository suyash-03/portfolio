import { useState } from 'react';
import { Box, Container, Card, CardContent, Button, Stack, Typography, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { experiences } from '../data/portfolioData';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box component="section" id="experience" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle number="02.">Work History</SectionTitle>
        <Card className="bento-card">
          <CardContent sx={{ p: 0 }}>
            {/* Horizontal Tabs Header */}
            <Box
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                overflowX: 'auto',
                p: 2,
                gap: 1.5,
                bgcolor: 'rgba(255, 255, 255, 0.01)'
              }}
            >
              {experiences.map((exp, idx) => (
                <Button
                  key={exp.company}
                  onClick={() => setActiveTab(idx)}
                  sx={{
                    flexShrink: 0,
                    textTransform: 'none',
                    borderRadius: '10px',
                    py: 1.2,
                    px: 3.5,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: activeTab === idx ? '#fff' : 'text.secondary',
                    bgcolor: activeTab === idx ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    border: '1px solid',
                    borderColor: activeTab === idx ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      color: 'text.primary'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  {exp.company}
                </Button>
              ))}
            </Box>

            {/* Detail Panel */}
            <Box sx={{ p: { xs: 4, md: 5 }, minHeight: 320 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 3, gap: 1.5 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {experiences[activeTab].role}
                      </Typography>
                      <Typography variant="subtitle1" color="primary.light" sx={{ fontWeight: 500 }}>
                        {experiences[activeTab].company} — {experiences[activeTab].location}
                      </Typography>
                    </Box>
                    <Chip
                      label={experiences[activeTab].period}
                      size="small"
                      sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.8rem',
                        bgcolor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: 'text.secondary'
                      }}
                    />
                  </Stack>

                  <Stack component="ul" spacing={2} sx={{ p: 0, m: 0, listStyle: 'none', mb: 4 }}>
                    {experiences[activeTab].points.map((point, idx) => (
                      <Box
                        component="li"
                        key={idx}
                        sx={{
                          pl: 3,
                          position: 'relative',
                          color: 'text.secondary',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          '&::before': {
                            content: '"→"',
                            position: 'absolute',
                            left: 0,
                            color: 'primary.light'
                          }
                        }}
                      >
                        {point}
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', pt: 3.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5 }}>
                      Technologies Used
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {experiences[activeTab].tech.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(99, 102, 241, 0.05)',
                            border: '1px solid rgba(99, 102, 241, 0.1)',
                            color: 'primary.light',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Experience;
