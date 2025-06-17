import React from 'react';
import { motion } from 'framer-motion';
import AssemblingLogo from './AssemblingLogo'; // Import the new assembling logo

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#E4EEF0]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }} // Add a slight delay before fading out
    >
      <AssemblingLogo />
    </motion.div>
  );
};

export default Preloader;