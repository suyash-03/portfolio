import { Box, Container, Card, CardContent, Stack, Typography, Paper } from '@mui/material';
import { GraduationCap } from 'lucide-react';
import SectionTitle from './SectionTitle';

const Education = () => {
  return (
    <Box component="section" id="education" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle>education</SectionTitle>
        <Card className="bento-card">
          <div className="dot-corner top-right" />
          <CardContent sx={{ p: { xs: 4, md: 5 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="flex-start">
              <Box sx={{ width: 56, height: 56, borderRadius: '4px', bgcolor: 'rgba(199, 120, 221, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(199, 120, 221, 0.3)' }}>
                <GraduationCap size={28} color="#C778DD" />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" sx={{ color: '#C778DD', fontFamily: "'Fira Code', monospace", mb: 1, display: 'block' }}>
                  2020 - 2024
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, fontFamily: "'Fira Code', monospace", color: '#FFFFFF' }}>
                  B.E. Electrical and Electronics Engineering
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#ABB2BF', mb: 2.5, fontFamily: "'Fira Code', monospace" }}>
                  Birla Institute of Technology and Science, Pilani
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.92rem', lineHeight: 1.8, mb: 3, fontFamily: "'Fira Code', monospace" }}>
                  Rigorous engineering curriculum focusing on Data Structures & Algorithms, Database Management (DBMS), OOP paradigms, Operating Systems, Computer Programming, Discrete Mathematics, and Graph Theory.
                </Typography>
                <Paper sx={{ p: 2.5, bgcolor: '#282C33', border: '1px solid #ABB2BF', borderRadius: '4px' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6, color: '#ABB2BF', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>
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
