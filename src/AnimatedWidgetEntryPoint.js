import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const AnimatedWidgetEntryPoint = ({ onOpen, timeThreshold = 10000 }) => {
  const [expanded, setExpanded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), timeThreshold);
    return () => clearTimeout(timer);
  }, [timeThreshold]);

  const iconSpring = useSpring({
    transform: expanded ? 'scale(0)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  const buttonSpring = useSpring({
    opacity: expanded ? 1 : 0,
    transform: expanded ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 300, friction: 10 },
  });

  const glowVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: [0.5, 1.2, 1],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <motion.div
        className="absolute inset-0 bg-blue-300 rounded-full"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <animated.div style={iconSpring} className="relative z-10">
        <button 
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={onOpen}
        >
          <MessageCircle size={24} />
        </button>
      </animated.div>
      <animated.div style={buttonSpring} className="absolute bottom-0 right-0">
        <button 
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-colors duration-300 whitespace-nowrap"
          onClick={onOpen}
        >
          Still can't decide?
        </button>
      </animated.div>
    </div>
  );
};

export default AnimatedWidgetEntryPoint;