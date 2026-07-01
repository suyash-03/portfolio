import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const SectionTitle = ({ number, children }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
    <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', mb: 5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box component="span" sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.1rem', color: 'primary.light', fontWeight: 400 }}>{number}</Box>
      {children}
    </Typography>
  </motion.div>
);

export default SectionTitle;
