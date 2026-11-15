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
              bgcolor: 'rgba(199, 120, 221, 0.1)',
              border: '1px solid #C778DD',
              borderRadius: '4px',
              color: '#C778DD',
              width: 44,
              height: 44,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(199, 120, 221, 0.2)',
                borderColor: '#C778DD',
                color: '#FFFFFF',
                transform: 'translateY(-3px)'
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
