import { useEffect, useState, useRef } from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TerminalLogs } from '../data/portfolioData';

const gradient = 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)';
const gradientText = {
  background: 'linear-gradient(135deg, #a5b4fc 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const SummitTerminal = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [visibleLines, setVisibleLines] = useState([]);
  const [cpu, setCpu] = useState(38);
  const [mem, setMem] = useState(1.8);
  const containerRef = useRef(null);

  // Simulate CPU / MEM fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * (58 - 32 + 1) + 32));
      setMem((Math.random() * (2.0 - 1.7) + 1.7).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisibleLines([]);
    let timer;
    const logs = TerminalLogs[activeTab];
    let currentIndex = 0;

    const printLine = () => {
      if (currentIndex < logs.length) {
        const nextLine = logs[currentIndex];
        setVisibleLines((prev) => [...prev, nextLine]);
        currentIndex++;
        timer = setTimeout(printLine, 400);
      }
    };
    printLine();

    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const totalLines = TerminalLogs[activeTab].length;
  const progressPercent = Math.min(Math.round((visibleLines.length / totalLines) * 100), 100);
  const isFinished = visibleLines.length === totalLines;

  return (
    <Box className="terminal-window">
      <Box className="terminal-header">
        <Box className="terminal-dots">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', opacity: 0.7 }}>
          system-capabilities-agent
        </Typography>
      </Box>
      <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', overflowX: 'auto', p: 1, gap: 1, bgcolor: 'rgba(0,0,0,0.2)' }}>
        {[
          { id: 'history', label: 'Experience' },
          { id: 'skills', label: 'Skills & Stack' },
          { id: 'capabilities', label: 'Capabilities' }
        ].map((tab) => (
          <Button
            key={tab.id}
            size="small"
            onClick={() => setActiveTab(tab.id)}
            sx={{
              py: 0.5, px: 2,
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: activeTab === tab.id ? 'primary.light' : 'text.secondary',
              bgcolor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
              border: '1px solid',
              borderColor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' }
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>
      <Box ref={containerRef} className="terminal-content" sx={{ height: 210 }}>
        <AnimatePresence>
          {visibleLines.map((line, idx) => (
            line && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="terminal-line"
                style={{
                  color: line.isCommand ? '#818cf8' : line.isSuccess ? '#10b981' : '#cbd5e1',
                  fontWeight: line.isCommand || line.isSuccess ? 600 : 400
                }}
              >
                {line.text}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </Box>
      <Box sx={{ p: 1.8, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 6, height: 6, borderRadius: '50%',
                bgcolor: isFinished ? '#10b981' : '#f59e0b',
                boxShadow: isFinished ? '0 0 8px #10b981' : '0 0 8px #f59e0b'
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.75rem' }}>
              {isFinished ? 'STATUS: SUCCESS' : 'STATUS: EXECUTING'}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'primary.light', fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600 }}>
            {progressPercent}%
          </Typography>
        </Box>
        <Box sx={{ height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
          <Box
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: gradient,
              transition: 'width 0.3s ease-out'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, opacity: 0.6 }}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
            CPU: {cpu}%
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
            MEM: {mem} GB
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
            NODE: suyash-profile-agent
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  
  // Track scroll progress of the hero section relative to viewport top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Scroll reactions: slide up and fade out
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Terminal shrinks, slides up faster (creates depth) and fades out
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const terminalScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Box
      ref={heroRef}
      id="home"
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', pt: 16, pb: 10 }}
    >

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center'
          }}
        >
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <Box>
              <div className="status-badge" style={{ marginBottom: 24 }}>
                <span className="status-dot" />
                <span>Software Engineer 2 @ Micron</span>
              </div>
            </Box>

            <Typography variant="h1" sx={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', mb: 3, lineHeight: 1.1, fontWeight: 900 }}>
              I build scalable <Box component="span" sx={gradientText}>automation platforms</Box> & distributed backends.
            </Typography>

            <Typography sx={{ fontSize: '1.15rem', color: 'text.secondary', mb: 5, lineHeight: 1.7, maxWidth: 540 }}>
              Hi, I'm <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>Suyash Singh</Box>. I'm a Software Engineer specializing in distributed orchestration platforms, event-driven automation, and high-throughput async pipelines. A BITS Pilani alumnus, I build resilient, latency-optimized systems that scale under heavy workloads.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5}>
              <Button
                variant="contained" size="large" endIcon={<ArrowRight size={20} />} href="#contact"
                sx={{
                  background: gradient,
                  boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 30px rgba(99, 102, 241, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                Get in Touch
              </Button>
              <Button
                variant="outlined" size="large" href="#experience"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.light',
                    bgcolor: 'rgba(255,255,255,0.02)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                View Experience
              </Button>
            </Stack>
          </motion.div>
          
          <motion.div style={{ y: terminalY, scale: terminalScale, opacity: terminalOpacity }}>
            <SummitTerminal />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
