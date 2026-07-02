import { motion } from 'framer-motion';

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 0.6 }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 15,
        delay: delay,
        duration: duration
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
