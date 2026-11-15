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
        <SectionTitle>work-history</SectionTitle>
        <Card className="bento-card">
          <CardContent sx={{ p: 0 }}>
            {/* Horizontal Tabs Header */}
            <Box
              sx={{
                borderBottom: '1px solid #ABB2BF',
                display: 'flex',
                overflowX: 'auto',
                p: 2,
                gap: 1,
                bgcolor: 'rgba(0,0,0,0.1)',
                alignItems: 'center',
                flexWrap: { xs: 'nowrap', md: 'wrap' },
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {experiences.map((exp, idx) => {
                const isActive = activeTab === idx;
                // Show promoted badge between SE1 and SE2 (SE2 is index 0, SE1 is index 1)
                // We render the badge AFTER the SE1 tab (idx=1) since SE2 comes first in array
                const showPromotedBadge = exp.promoted === true && idx === 0;

                return (
                  <Box key={`${exp.company}-${exp.role}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                      onClick={() => setActiveTab(idx)}
                      sx={{
                        flexShrink: 0,
                        textTransform: 'none',
                        borderRadius: '4px',
                        py: 1,
                        px: 2.5,
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        fontFamily: "'Fira Code', monospace",
                        color: isActive ? '#C778DD' : 'text.secondary',
                        bgcolor: isActive ? 'rgba(199, 120, 221, 0.08)' : 'transparent',
                        border: '1px solid',
                        borderColor: isActive ? '#C778DD' : 'transparent',
                        '&:hover': {
                          bgcolor: 'rgba(199, 120, 221, 0.05)',
                          color: '#C778DD'
                        },
                        transition: 'all 0.3s'
                      }}
                    >
                      {exp.company === 'Micron'
                        ? `Micron (${exp.role === 'Software Engineer 2' ? 'SE 2' : 'SE 1'})`
                        : exp.company}
                    </Button>
                    {/* Promoted badge appears next to SE2 */}
                    {showPromotedBadge && (
                      <span className="promoted-badge">↑ Promoted</span>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Detail Panel */}
            <Box sx={{ p: { xs: 3, md: 5 }, minHeight: 320 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Promotion Highlight Banner */}
                  {experiences[activeTab].promoted && (
                    <Box sx={{ mb: 3, p: 1.5, px: 2, bgcolor: 'rgba(199, 120, 221, 0.08)', border: '1px solid #C778DD', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#C778DD', fontFamily: "'Fira Code', monospace", fontWeight: 600, fontSize: '0.8rem' }}>
                        ★ PROMOTION: Promoted from Software Engineer 1 to Software Engineer 2 at Micron
                      </Typography>
                    </Box>
                  )}

                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 3, gap: 1.5 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "'Fira Code', monospace" }}>
                        {experiences[activeTab].role}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#C778DD', fontWeight: 500, fontFamily: "'Fira Code', monospace" }}>
                        {experiences[activeTab].company} — {experiences[activeTab].location}
                      </Typography>
                    </Box>
                    <Chip
                      label={experiences[activeTab].period}
                      size="small"
                      sx={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: '0.8rem',
                        bgcolor: 'rgba(199, 120, 221, 0.06)',
                        border: '1px solid rgba(199, 120, 221, 0.3)',
                        color: '#C778DD'
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
                          fontSize: '0.93rem',
                          lineHeight: 1.7,
                          fontFamily: "'Fira Code', monospace",
                          '&::before': {
                            content: '"→"',
                            position: 'absolute',
                            left: 0,
                            color: '#C778DD'
                          }
                        }}
                      >
                        {point}
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ borderTop: '1px solid rgba(171, 178, 191, 0.3)', pt: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5, fontFamily: "'Fira Code', monospace" }}>
                      Technologies Used
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {experiences[activeTab].tech.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          className="skill-tag"
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
