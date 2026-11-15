import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const SectionTitle = ({ children }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontFamily: "'Fira Code', monospace",
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        <Box component="span" sx={{ color: '#C778DD' }}>#</Box>
        {children}
      </Typography>
      {/* Horizontal rule extending to the right */}
      <Box
        sx={{
          flex: 1,
          height: '1px',
          bgcolor: '#ABB2BF',
          opacity: 0.4,
          minWidth: 40,
        }}
      />
    </Box>
  </motion.div>
);

export default SectionTitle;
