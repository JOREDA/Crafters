import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TypedNumber = ({ end = 0, duration = 2, className = '' }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setDisplayNumber(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayNumber(end);
      }
    };

    controls.start({ opacity: 1, y: 0 });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, controls]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {displayNumber}
    </motion.span>
  );
};

export default TypedNumber;
