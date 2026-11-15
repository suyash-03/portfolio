import { useState } from 'react';
import { Box, Container, Card, CardContent, Stack, Typography, Chip, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ExternalLink, Code, Terminal } from 'lucide-react';
import SectionTitle from './SectionTitle';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('work'); // 'work' or 'personal'

  const workProjects = [
    {
      type: 'Distributed Platform',
      icon: Terminal,
      iconColor: '#C778DD',
      title: 'Summit: Test Orchestration & Validation',
      description: 'Distributed test orchestration platform at Micron coordinating hardware validations, event-driven schedulers, and release pipelines across physical hardware nodes.',
      bullets: [
        'Led development of the orchestrator service (FastAPI, React, PostgreSQL), scaling workloads by 2x and lowering P95 scheduling latency by 30%.',
        'Built an event-driven validation system parsing JFrog Artifactory webhooks, eliminating manual runs and improving HIL validation efficiency by ~3x.',
        'Architected async Kafka/S3 telemetry pipeline for raw log storage and exposed Summit controls to agentic AI tools via Python FastMCP.'
      ],
      tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Apache Kafka', 'AWS S3', 'FastMCP', 'Jenkins', 'Docker'],
      linkText: 'Simulate Platform Above',
      linkUrl: '#summit'
    },
    {
      type: 'AI Developer Tool',
      icon: Code,
      iconColor: '#ABB2BF',
      title: 'AST-Driven PR Analysis System',
      description: 'AI-powered repository monitor scanning code changes, auto-generating unit test coverage, and validating commits inside developer environments.',
      bullets: [
        'Built an AST-driven PR analysis system that monitors active repositories, auto-generates unit tests, and validates test execution.',
        'Leveraged generative LLM execution pipelines via AWS Bedrock to parse source change trees and draft precise test coverages.',
        'Optimized code coverage metrics and significantly reduced developer manual review latency on incoming pull requests.'
      ],
      tech: ['Python', 'AWS Bedrock', 'AST Parsing', 'LLMs', 'Git Hooks', 'Unit Testing'],
      linkText: 'View Experience Detail',
      linkUrl: '#experience'
    }
  ];

  const personalProjects = [
    {
      type: 'macOS Desktop App',
      icon: FolderOpen,
      iconColor: '#C778DD',
      title: 'FmCUI',
      description: 'A macOS desktop application integrating Apple Foundation Models for on-device LLM inference, with streaming token-by-token responses and low-latency Markdown/code rendering.',
      bullets: [
        'Architected and deployed a macOS application using Electron, React, TypeScript, and Vite, integrating Apple Foundation Models for on-device LLM inference.',
        'Engineered streaming inference over a local loopback server, processing token-by-token responses with low-latency Markdown/code rendering.',
        'Built automated CI/CD and release workflows using GitHub Actions and electron-builder for production application packaging and deployment.'
      ],
      tech: ['Electron', 'React', 'TypeScript', 'Vite', 'Apple Foundation Models', 'GitHub Actions'],
      linkText: 'View Product Portfolio',
      linkUrl: 'https://suyash-03.github.io/fmcui-product-portfolio/'
    },
    {
      type: "Students' Union Project",
      icon: FolderOpen,
      iconColor: '#ABB2BF',
      title: 'BITS SU App',
      description: "Engineered the official Students' Union mobile application serving 8,000+ active campus users and processing over ₹6M+ in monthly transaction payments.",
      bullets: [
        'Implemented secure QR-based token authentication for payment processing & Google Sign-In (SSO).',
        'Streamlined unified system state handling with Provider for real-time Google Maps & FCM integration.',
        'Supported modules: newsletters, merchandise transactions, event ticketing, cab bookings, food orders.'
      ],
      tech: ['Django', 'Flutter', 'Dart', 'Firebase', 'Google Maps API'],
      linkText: 'View on PlayStore',
      linkUrl: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app&hl=en_IN'
    },
    {
      type: 'Academic Department Project',
      icon: FolderOpen,
      iconColor: '#ABB2BF',
      title: 'StudyDeck',
      description: 'The official semester scheduler app of the Academic Department, BITS Pilani, facilitating real-time timetable generation and automated conflict resolution for thousands of students.',
      bullets: [
        'Developed cross-platform Flutter app with interactive timetable visualization and conflict resolution.',
        'Architected using MVC pattern, integrated Provider for efficient global state management.',
        'Implemented local database response caching with sqflite, minimizing redundant backend server queries.'
      ],
      tech: ['Flutter', 'Dart', 'Provider', 'sqflite', 'Timetable Algorithms'],
      linkText: 'Launch Application',
      linkUrl: 'https://studydeck.bits-sutechteam.org/'
    }
  ];

  const activeProjects = activeCategory === 'work' ? workProjects : personalProjects;

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <SectionTitle>featured-code</SectionTitle>

        {/* Tab switcher for Work vs Personal Projects */}
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 6, borderBottom: '1px solid rgba(171, 178, 191, 0.3)' }}>
          <Box
            className={`project-tab-btn ${activeCategory === 'work' ? 'active' : ''}`}
            onClick={() => setActiveCategory('work')}
          >
            Work Projects
          </Box>
          <Box
            className={`project-tab-btn ${activeCategory === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveCategory('personal')}
          >
            Personal Projects
          </Box>
        </Stack>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4
              }}
            >
              {activeProjects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Card className="bento-card" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {/* Dot corner decoration */}
                      <div className="dot-corner top-right" />
                      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                          <IconComponent size={18} color={project.iconColor} />
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem' }}>
                            {project.type}
                          </Typography>
                        </Stack>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, fontFamily: "'Fira Code', monospace", fontSize: '1.1rem' }}>
                          {project.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, fontSize: '0.9rem', flexGrow: 1, fontFamily: "'Fira Code', monospace" }}>
                          {project.description}
                        </Typography>
                        <Stack component="ul" spacing={1.5} sx={{ p: 0, m: 0, listStyle: 'none', mb: 4 }}>
                          {project.bullets.map((bullet, idx) => (
                            <Box
                              component="li" key={idx}
                              sx={{
                                pl: 3, position: 'relative', color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.6,
                                fontFamily: "'Fira Code', monospace",
                                '&::before': { content: '"▸"', position: 'absolute', left: 0, color: project.iconColor }
                              }}
                            >
                              {bullet}
                            </Box>
                          ))}
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3.5 }}>
                          {project.tech.map((t) => (
                            <Chip
                              key={t}
                              label={t}
                              size="small"
                              className="skill-tag"
                            />
                          ))}
                        </Stack>
                        <Box>
                          <Button
                            variant="outlined" size="small" endIcon={<ExternalLink size={14} />}
                            href={project.linkUrl}
                            target={project.linkUrl.startsWith('http') ? "_blank" : "_self"}
                            rel={project.linkUrl.startsWith('http') ? "noopener noreferrer" : ""}
                            sx={{
                              borderColor: '#ABB2BF',
                              color: '#ABB2BF',
                              fontFamily: "'Fira Code', monospace",
                              fontSize: '0.8rem',
                              '&:hover': { borderColor: '#C778DD', color: '#C778DD', bgcolor: 'rgba(199,120,221,0.05)' }
                            }}
                          >
                            {project.linkText}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Projects;
