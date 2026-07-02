import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SummitSimulator from './components/SummitSimulator';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// ---- Theme Configuration ----
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    secondary: { main: '#06b6d4' },
    background: { default: '#030303', paper: '#09090d' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 28px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Global background spotlights shift as user scrolls
  const spot1Y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const spot2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="noise-overlay" />
      
      {/* Global Background Spotlights */}
      <Box className="bg-canvas">
        <motion.div style={{ y: spot1Y }} className="ambient-spotlight spot-1" />
        <motion.div style={{ y: spot2Y }} className="ambient-spotlight spot-2" />
        <div className="dot-grid" />
      </Box>

      {/* Scroll Progress Bar at Viewport Top */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      <Navigation />
      <Hero />

      <ScrollReveal>
        <SummitSimulator />
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Experience />
      </ScrollReveal>

      <ScrollReveal>
        <Projects />
      </ScrollReveal>

      <ScrollReveal>
        <Skills />
      </ScrollReveal>

      <ScrollReveal>
        <Education />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>

      <Footer />

      {/* Floating Scroll Indicator Elements */}
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
