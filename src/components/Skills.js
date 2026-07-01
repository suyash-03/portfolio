import { Box, Container, Card, CardContent, Stack, Typography, Chip } from '@mui/material';
import SectionTitle from './SectionTitle';
import { skillCategories } from '../data/portfolioData';

const Skills = () => {
  return (
    <Box component="section" id="skills" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle number="04.">Tech Directory</SectionTitle>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3.5
          }}
        >
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Card className="bento-card" key={idx} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center' }}>
                      <Icon size={22} color={cat.color} />
                    </Box>
                    <Typography variant="h6" fontSize="1.1rem" sx={{ fontWeight: 650 }}>{cat.title}</Typography>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap" gap={1.2}>
                    {cat.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        className="skill-tag"
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
