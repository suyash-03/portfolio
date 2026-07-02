import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 99,
          }}
        >
          <IconButton
            onClick={scrollToTop}
            sx={{
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'primary.light',
              backdropFilter: 'blur(8px)',
              width: 50,
              height: 50,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                bgcolor: 'rgba(99, 102, 241, 0.25)',
                borderColor: '#6366f1',
                color: '#ffffff',
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)'
              }
            }}
          >
            <ArrowUp size={24} />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
