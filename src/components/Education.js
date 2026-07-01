import { Box, Container, Card, CardContent, Stack, Typography, Paper } from '@mui/material';
import { GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';

const Education = () => {
  return (
    <Box component="section" id="education" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle number="05.">Education</SectionTitle>
        <Card className="bento-card">
          <CardContent sx={{ p: { xs: 4, md: 5 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="flex-start">
              <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <GraduationCap size={28} color="#6366f1" />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: 'primary.light', fontFamily: "'JetBrains Mono', monospace", mb: 1, display: 'block' }}>
                  2020 - 2024
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  B.E. Electrical and Electronics Engineering
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2.5 }}>
                  Birla Institute of Technology and Science, Pilani
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.7, mb: 3 }}>
                  Rigorous engineering curriculum focusing on Data Structures & Algorithms, Database Management (DBMS), OOP paradigms, Operating Systems, Computer Programming, Discrete Mathematics, and Graph Theory.
                </Typography>
                <Paper sx={{ p: 2.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 3 }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6, color: 'text.secondary' }}>
                    BITS Pilani is recognized globally for producing top engineering talent, with alumni founding unicorns like Postman, Swiggy, MPL, Groww, and BigBasket.
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Education;
