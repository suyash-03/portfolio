import { useEffect, useState, useRef } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, Container, Box, Typography,
  Button, Stack, Card, CardContent, Chip, AppBar, Toolbar, IconButton,
  Drawer, List, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import {
  Mail, Linkedin, Github, Phone, FileText, ExternalLink,
  FolderOpen, GraduationCap, Menu, X, ArrowRight, Download,
  Code, Database, Cpu, Wrench,
} from 'lucide-react';
import profilePhoto from './profile.png';
import './App.css';

// ---- Theme ----
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#06b6d4' },
    background: { default: '#0f0f1a', paper: '#16213e' },
    text: { primary: '#e2e8f0', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 12, padding: '12px 28px' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #1f2b4d',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': { borderColor: '#6366f1', boxShadow: '0 0 40px rgba(99, 102, 241, 0.15)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

const gradient = 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #f472b6 100%)';
const gradientText = {
  background: gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ---- Animation Variants ----
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ---- Data ----
const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

const experiences = [
  {
    title: 'Software Engineer 2', company: 'Micron', location: 'Bangalore, India', period: 'Jul 2024 - Present',
    points: [
      'Spearheading development of Summit, a unified automation platform using FastAPI, React.js and PostgreSQL for automated test workflows, execution, and real-time monitoring',
      'Implemented ArtiFlow, an event-driven automation feature integrating JFrog Artifactory webhooks, resulting in 2\u00d7 improvement in operational efficiency',
      'Engineered scalable Test Case Management solution with async parallel processing, reducing load times by 50%',
      'Achieved 30% reduction in API response times and scaled system to handle 2\u00d7 traffic with 99.99% uptime',
    ],
  },
  {
    title: 'Software Engineering Intern', company: 'Legistify (YC X22)', location: 'Gurgaon, India', period: 'Jan 2024 - Jun 2024',
    points: [
      'Built SmartCC, a Node.js micro-service using Gmail APIs and Google Cloud Pub/Sub for real-time email processing',
      'Implemented rule-based triggers and event-driven e-signature reminders improving user experience',
      'Integrated backend services to extract and persist email metadata in MongoDB with robust indexing and caching',
    ],
  },
  {
    title: 'Software Engineering Intern', company: 'Soci\u00e9t\u00e9 G\u00e9n\u00e9rale', location: 'Bangalore, India', period: 'Jul 2023 - Aug 2023',
    points: [
      'Developed scalable backend analytics pipeline using C#, Git CLI, and structured data processing',
      'Architected production-grade desktop application using .NET WPF and MVVM architecture with SQLite storage',
      'Implemented real-time data visualization dashboards using LiveCharts2 for performance benchmarking across global teams',
    ],
  },
  {
    title: 'Machine Learning Intern', company: 'Indian Army', location: 'Remote', period: 'Jun 2022 - Jul 2022',
    points: [
      'Trained YOLOv5-based object detection model for real-time drone detection, achieving 0.67 mAP on custom aerial surveillance dataset',
      'Optimized model for edge deployment using TensorRT and TensorFlow Lite, achieving 120% improvement in inference speed',
      'Designed data augmentation pipeline using Albumentations to enhance model robustness against adverse weather conditions',
    ],
  },
];

const projects = [
  {
    title: 'BITS SU App',
    description: "Official mobile application of the Students' Union, BITS Pilani, used daily by 5000+ students facilitating INR 60L+ in monthly transactions.",
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    highlights: [
      'Built scalable production features: newsletters, merchandise signups, event registrations, cab bookings, food ordering',
      'Implemented secure QR code-based authentication and Google Sign-In SSO',
      'Integrated Firebase Cloud Messaging for real-time notifications',
      'Google Maps API integration for live cab tracking and booking',
    ],
    link: 'https://play.google.com/store/apps/details?id=org.subitspilani.bits_su_app&hl=en_IN',
  },
  {
    title: 'StudyDeck',
    description: 'Official app of the Academic Department BITS Pilani, facilitating timetable creation and semester planning.',
    tech: ['Flutter', 'Dart', 'Provider', 'sqflite'],
    highlights: [
      'Developed cross-platform Flutter app with interactive timetable visualization and automated conflict resolution',
      'Architected using MVC pattern, integrated Provider for efficient state management',
      'Implemented local response caching with sqflite, reducing server load and improving offline UX',
    ],
    link: 'https://studydeck.bits-sutechteam.org/',
  },
  {
    title: 'PingHire',
    description: 'High-performance candidate-job matching engine using weighted scoring algorithms for precise relevance ranking.',
    tech: ['Python', 'Git', 'JSON', 'Design Patterns'],
    highlights: [
      'Architected matching engine evaluating candidates across skills, experience, and education',
      'Built scalable JSON-based data ingestion pipeline for high-throughput matching',
      'Engineered pluggable notification adapter with O(1) integration of new channels',
    ],
    link: 'https://github.com/suyash-03/job-recommendation-backend',
  },
];

const skillCategories = [
  { title: 'Languages', icon: Code, skills: [{ name: 'Python', level: 95 }, { name: 'JavaScript', level: 90 }, { name: 'Java', level: 85 }, { name: 'C/C++', level: 80 }, { name: 'Dart', level: 75 }] },
  { title: 'Frameworks & Tech', icon: Cpu, skills: [{ name: 'FastAPI', level: 95 }, { name: 'React.js', level: 90 }, { name: 'Node.js', level: 85 }, { name: 'Flutter', level: 80 }, { name: 'Django', level: 75 }] },
  { title: 'Databases', icon: Database, skills: [{ name: 'PostgreSQL', level: 90 }, { name: 'MongoDB', level: 85 }, { name: 'MySQL', level: 85 }, { name: 'DynamoDB', level: 75 }, { name: 'Redis', level: 80 }] },
  { title: 'Tools & DevOps', icon: Wrench, skills: [{ name: 'Git', level: 95 }, { name: 'Docker', level: 85 }, { name: 'AWS S3', level: 80 }, { name: 'Linux', level: 85 }, { name: 'CI/CD', level: 85 }] },
];

const interests = [
  { icon: '\uD83D\uDCAA', label: 'Gymming' }, { icon: '\u26F8\uFE0F', label: 'Skating' },
  { icon: '\uD83C\uDFF8', label: 'Badminton' }, { icon: '\uD83C\uDFCA', label: 'Swimming' }, { icon: '\uD83C\uDFAE', label: 'Gaming' },
];

const contactLinks = [
  { icon: Mail, label: 'Email', value: 'suyash.singh9450@gmail.com', href: 'mailto:suyash.singh9450@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/suyash-singh-bb9477203/', external: true },
  { icon: Github, label: 'GitHub', value: 'github.com/suyash-03', href: 'https://github.com/suyash-03', external: true },
  { icon: Phone, label: 'Phone', value: '+91 7007038266', href: 'tel:+917007038266' },
  { icon: FileText, label: 'Resume', value: 'View My Resume', href: 'https://drive.google.com/file/d/1BfFVKido3JBLXqRoP-2U2lB2pFr0PoN2/view?usp=share_link', external: true, highlight: true },
];

// ---- Reusable ----
const SectionTitle = ({ number, children }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeUp}>
    <Typography variant="h2" sx={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', mb: 7, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box component="span" sx={{ fontFamily: "'Fira Code', monospace", fontSize: '1rem', color: 'primary.main', fontWeight: 400 }}>{number}</Box>
      {children}
    </Typography>
  </motion.div>
);

const SkillBar = ({ skill, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <Box ref={ref}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" fontWeight={500}>{skill.name}</Typography>
        <Typography variant="body2" sx={{ color: 'primary.light', fontFamily: "'Fira Code', monospace" }}>{skill.level}%</Typography>
      </Box>
      <Box sx={{ height: 6, bgcolor: '#1f2b4d', borderRadius: 1, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ height: '100%', background: gradient, borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
};

// ---- Navigation ----
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed" elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(15, 15, 26, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography component="a" href="#home" sx={{ flexGrow: 1, ...gradientText, fontWeight: 800, textDecoration: 'none', fontSize: '1.5rem' }}>
            Suyash Singh<Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
          </Typography>
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Typography
                key={link} component="a" href={`#${link.toLowerCase()}`}
                sx={{
                  color: 'text.secondary', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
                  position: 'relative', transition: 'color 0.3s', '&:hover': { color: 'text.primary' },
                  '&::after': {
                    content: '""', position: 'absolute', bottom: -4, left: 0, width: '0%', height: 2,
                    background: gradient, transition: 'width 0.3s ease',
                  },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>
          <IconButton sx={{ display: { md: 'none' }, color: 'text.primary' }} onClick={() => setDrawerOpen(true)}>
            <Menu size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { bgcolor: 'background.paper', width: 280 } }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.primary' }}><X size={24} /></IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton key={link} component="a" href={`#${link.toLowerCase()}`} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={link} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

// ---- Cursor Glow (used by App, passed down to Hero) ----
const useCursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const spotlightBg = useMotionTemplate`radial-gradient(650px circle at ${smoothX}px ${smoothY}px, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.06) 40%, transparent 80%)`;

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return { spotlightBg, handleMouseMove };
};

// ---- Hero ----
const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Suyash Singh";
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      id="home"
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', px: 3, pt: 12, pb: 12 }}
    >
      <Box className="hero-bg">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
        <div className="grid-overlay" />
      </Box>

      <motion.div style={{ y, opacity: heroOpacity, position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800, width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Chip
            label={<><span className="badge-dot" />&nbsp; Software Engineer 2 @ Micron</>}
            variant="outlined"
            sx={{ mb: 3, py: 2.5, px: 1, fontSize: '0.85rem', borderColor: 'rgba(99, 102, 241, 0.3)', bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light' }}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', mb: 2, whiteSpace: 'nowrap' }}>
            <Box component="span" sx={gradientText}>{text}</Box>
            <Box component="span" className="cursor" sx={gradientText}>|</Box>
          </Typography>
        </motion.div>

        <Stack spacing={2} sx={{ maxWidth: 700, mx: 'auto', mb: 5 }}>
          {[
            <>I'm a software engineer based in <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>Bangalore</Box>, currently focused on building scalable automation platforms and performance-critical backend systems.</>,
            <>A <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>BITS Pilani</Box> graduate, I work across the stack from system design and APIs to databases and user-facing applications with an emphasis on efficiency, reliability, and clean architecture.</>,
            <>I love working on problems where <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>scale</Box>, <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>correctness</Box>, and <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>developer experience</Box> truly matter.</>,
          ].map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}>
              <Typography sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}>{line}</Typography>
            </motion.div>
          ))}
        </Stack>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 5 }}>
            <Button
              variant="contained" size="large" endIcon={<ArrowRight size={20} />} href="#contact"
              sx={{ background: gradient, boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)', '&:hover': { boxShadow: '0 0 60px rgba(99, 102, 241, 0.5)', transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}
            >
              Get in Touch
            </Button>
            <Button variant="outlined" size="large" href="#experience" sx={{ borderColor: '#1f2b4d', color: 'text.primary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}>
              View My Work
            </Button>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <Stack direction="row" spacing={7} justifyContent="center">
            {[{ n: '2+', l: 'Years Experience' }, { n: '15+', l: 'Technologies' }].map((s) => (
              <Box key={s.l} textAlign="center">
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, ...gradientText }}>{s.n}</Typography>
                <Typography variant="body2" color="text.secondary">{s.l}</Typography>
              </Box>
            ))}
          </Stack>
        </motion.div>
      </motion.div>

      <Box className="scroll-indicator">
        <div className="mouse"><div className="wheel" /></div>
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 2 }}>Scroll to explore</Typography>
      </Box>
    </Box>
  );
};

// ---- About ----
const About = () => (
  <Box component="section" id="about" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#1a1a2e' }}>
    <Container maxWidth="lg">
      <SectionTitle number="01.">About Me</SectionTitle>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, gap: { xs: 5, md: 7 }, alignItems: 'start' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Box className="image-wrapper" sx={{ position: { md: 'sticky' }, top: { md: 100 }, mx: { xs: 'auto', md: 0 } }}>
            <img src={profilePhoto} alt="Suyash Singh" className="profile-photo" />
            <div className="image-border" />
          </Box>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          {[
            <Typography sx={{ fontSize: '1.2rem', color: 'text.primary', fontWeight: 500 }}>
              Hey! I'm <Box component="span" sx={gradientText}>Suyash Singh</Box>, a Software Engineer 2 at
              <Box component="span" sx={{ color: 'primary.light' }}> Micron</Box>, currently based in Bangalore.
            </Typography>,
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
              I graduated from <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>BITS Pilani</Box> with a B.E. in
              Electrical & Electronics Engineering, and I enjoy building software that's thoughtful, scalable, and a pleasure to work with.
            </Typography>,
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
              I spend most of my time designing backend systems and full-stack applications, working with{' '}
              {['FastAPI', 'React.js', 'Node.js', 'Django', 'Flutter', 'Spring Boot', 'PostgreSQL'].map((t) => (
                <Chip key={t} label={t} size="small" variant="outlined" sx={{ mx: 0.3, my: 0.3, borderColor: 'rgba(6, 182, 212, 0.3)', color: 'secondary.main', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace" }} />
              ))}
              . I'm especially interested in automation platforms, event-driven systems, and clean system design.
            </Typography>,
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
              I actively practice Competitive Programming and Data Structures & Algorithms, mostly because I enjoy the problem-solving mindset it builds.
            </Typography>,
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem', pt: 1, borderTop: '1px solid #1f2b4d', mt: 1 }}>
              Outside of code, I like staying active. I did my schooling in <Box component="span" sx={{ color: 'primary.light', fontWeight: 500 }}>Varanasi</Box>,
              which is where my curiosity for building and breaking things first started.
            </Typography>,
          ].map((content, i) => (
            <motion.div key={i} variants={fadeUp}><Box sx={{ mb: 2 }}>{content}</Box></motion.div>
          ))}
          <motion.div variants={fadeUp}>
            <Paper sx={{ p: 2.5, bgcolor: '#16213e', border: '1px solid #1f2b4d', mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>When I'm not coding:</Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {interests.map((item) => (
                  <Chip
                    key={item.label} label={`${item.icon} ${item.label}`} variant="outlined"
                    sx={{ borderColor: 'rgba(99, 102, 241, 0.2)', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99, 102, 241, 0.1)', transform: 'translateY(-2px)' }, transition: 'all 0.3s' }}
                  />
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </Container>
  </Box>
);

// ---- Experience ----
const Experience = () => (
  <Box component="section" id="experience" sx={{ py: { xs: 10, md: 15 } }}>
    <Container maxWidth="lg">
      <SectionTitle number="02.">Experience</SectionTitle>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {experiences.map((exp, idx) => (
          <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, mb: idx < experiences.length - 1 ? 6 : 0, flexDirection: { xs: 'column', md: 'row' } }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', flexShrink: 0 }}>
                <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: gradient, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)', flexShrink: 0 }} />
                {idx < experiences.length - 1 && (
                  <Box sx={{
                    width: { xs: 'auto', md: 2 }, height: { xs: 2, md: 'auto' }, flexGrow: 1, mt: { md: 1 },
                    background: { xs: 'linear-gradient(to right, #6366f1, transparent)', md: 'linear-gradient(to bottom, #6366f1, transparent)' },
                  }} />
                )}
              </Box>
              <motion.div style={{ flexGrow: 1 }} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card>
                  <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 2, flexWrap: 'wrap', gap: 1 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>{exp.title}</Typography>
                        <Typography variant="body2" color="primary.light">{exp.company} &bull; {exp.location}</Typography>
                      </Box>
                      <Chip label={exp.period} size="small" sx={{ fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', bgcolor: '#1f2b4d', color: 'text.secondary' }} />
                    </Box>
                    <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} spacing={1.5}>
                      {exp.points.map((point, i) => (
                        <Box component="li" key={i} sx={{
                          pl: 3, position: 'relative', color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7,
                          '&::before': { content: '"\u25B9"', position: 'absolute', left: 0, color: 'primary.main' },
                        }}>
                          {point}
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  </Box>
);

// ---- Projects ----
const Projects = () => (
  <Box component="section" id="projects" sx={{ py: { xs: 10, md: 15 } }}>
    <Container maxWidth="lg">
      <SectionTitle number="03.">Projects</SectionTitle>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {projects.map((project, idx) => (
            <motion.div key={idx} variants={fadeUp} style={{ height: '100%' }}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ height: '100%' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                      <FolderOpen size={40} color="#6366f1" />
                      <IconButton component="a" href={project.link} target="_blank" rel="noopener noreferrer" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <ExternalLink size={22} />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1.5, fontSize: '1.3rem' }}>{project.title}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2.5, fontSize: '0.95rem', lineHeight: 1.6 }}>{project.description}</Typography>
                    <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 3, flexGrow: 1 }} spacing={1}>
                      {project.highlights.map((h, i) => (
                        <Box component="li" key={i} sx={{
                          pl: 2.5, position: 'relative', color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.5,
                          '&::before': { content: '"\u25B9"', position: 'absolute', left: 0, color: 'primary.main' },
                        }}>
                          {h}
                        </Box>
                      ))}
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {project.tech.map((t) => (
                        <Chip key={t} label={t} size="small" sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem' }} />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  </Box>
);

// ---- Skills ----
const Skills = () => (
  <Box component="section" id="skills" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#1a1a2e' }}>
    <Container maxWidth="lg">
      <SectionTitle number="04.">Skills</SectionTitle>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div key={idx} variants={fadeUp}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card>
                    <CardContent sx={{ p: 3.5 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                        <Icon size={28} color="#6366f1" />
                        <Typography variant="h6" fontSize="1.1rem">{cat.title}</Typography>
                      </Stack>
                      <Stack spacing={2.5}>
                        {cat.skills.map((skill, i) => (
                          <SkillBar key={skill.name} skill={skill} delay={i} />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </Box>
      </motion.div>
    </Container>
  </Box>
);

// ---- Education ----
const Education = () => (
  <Box component="section" id="education" sx={{ py: { xs: 10, md: 15 } }}>
    <Container maxWidth="lg">
      <SectionTitle number="05.">Education</SectionTitle>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card sx={{ maxWidth: 800 }}>
            <CardContent sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' }, p: { xs: 3, md: 5 } }}>
              <Box sx={{ width: 60, height: 60, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <GraduationCap size={30} color="#6366f1" />
              </Box>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="body2" sx={{ color: 'primary.light', fontFamily: "'Fira Code', monospace", mb: 1 }}>2020 - 2024</Typography>
                <Typography variant="h6" sx={{ mb: 0.5 }}>B.E. Electrical and Electronics Engineering</Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>Birla Institute of Technology and Science, Pilani</Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', mb: 2 }}>
                  Comprehensive coursework in Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Programming, Discrete Mathematics, Graph Theory, and Calculus.
                </Typography>
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'transparent', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.05))', borderLeft: '3px solid #6366f1', borderRadius: '0 8px 8px 0', boxShadow: 'none' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                    BITS Pilani is the alma mater of founders of SanDisk, Hotmail, Swiggy, MPL, Groww, Zeta, BigBasket, BlueJeans, Postman, and several other unicorns.
                  </Typography>
                </Paper>
                <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  {['BITS Pilani', 'Associate Dean Recognition'].map((a) => (
                    <Chip key={a} label={a} size="small" sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'primary.light', fontWeight: 500 }} />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  </Box>
);

// ---- Contact ----
const Contact = () => (
  <Box component="section" id="contact" sx={{ py: { xs: 10, md: 15 }, bgcolor: '#1a1a2e' }}>
    <Container maxWidth="lg">
      <SectionTitle number="06.">Get in Touch</SectionTitle>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <Box sx={{ maxWidth: 700, mx: 'auto', textAlign: 'center' }}>
          <motion.div variants={fadeUp}>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: 6 }}>
              I'm always interested in hearing about new opportunities, challenging projects, or just connecting with fellow developers. Feel free to reach out!
            </Typography>
          </motion.div>

          <Stack spacing={2.5} sx={{ mb: 5 }}>
            {contactLinks.map((c, idx) => {
              const Icon = c.icon;
              return (
                <motion.div key={idx} variants={fadeUp}>
                  <motion.div whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Paper
                      component="a" href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 2.5, p: 3, textDecoration: 'none', color: 'inherit', cursor: 'pointer',
                        border: '1px solid', borderColor: c.highlight ? 'primary.main' : '#1f2b4d',
                        bgcolor: c.highlight ? 'rgba(99, 102, 241, 0.05)' : 'background.paper',
                        transition: 'all 0.3s',
                        '&:hover': { borderColor: 'primary.main', boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)' },
                      }}
                    >
                      <Box sx={{ width: 50, height: 50, borderRadius: 3, bgcolor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={24} color="#6366f1" />
                      </Box>
                      <Box textAlign="left">
                        <Typography variant="body2" color="text.secondary">{c.label}</Typography>
                        <Typography fontWeight={600}>{c.value}</Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </motion.div>
              );
            })}
          </Stack>

          <motion.div variants={fadeUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained" size="large" endIcon={<ArrowRight size={20} />}
                href="mailto:suyash.singh9450@gmail.com"
                sx={{ background: gradient, px: 5, py: 1.8, fontSize: '1.1rem', boxShadow: '0 0 40px rgba(99, 102, 241, 0.3)', '&:hover': { boxShadow: '0 0 60px rgba(99, 102, 241, 0.5)', transform: 'translateY(-3px)' }, transition: 'all 0.3s' }}
              >
                Say Hello
              </Button>
              <Button
                variant="outlined" size="large" endIcon={<Download size={20} />}
                href="https://drive.google.com/file/d/1BfFVKido3JBLXqRoP-2U2lB2pFr0PoN2/view?usp=share_link"
                target="_blank"
                sx={{ px: 5, py: 1.8, fontSize: '1.1rem', borderColor: '#1f2b4d', color: 'text.primary', '&:hover': { borderColor: 'primary.main' } }}
              >
                Download Resume
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  </Box>
);

// ---- Footer ----
const Footer = () => (
  <Box component="footer" sx={{ py: 5, textAlign: 'center', borderTop: '1px solid #1f2b4d' }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      Designed & Built with <Box component="span" sx={{ color: '#ef4444' }}>{'\u2764'}</Box> by Suyash Singh
    </Typography>
    <Typography variant="caption" sx={{ color: '#64748b' }}>
      {'\u00A9'} {new Date().getFullYear()} All rights reserved.
    </Typography>
  </Box>
);

// ---- App ----
function App() {
  const { spotlightBg, handleMouseMove } = useCursorGlow();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box onMouseMove={handleMouseMove} sx={{ position: 'relative' }}>
        <motion.div
          style={{ background: spotlightBg, position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Navigation />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
