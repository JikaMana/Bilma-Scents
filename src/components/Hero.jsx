import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBackground from '../assets/images/background/heroBackground.webp';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-white"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, type: 'spring' }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold font-display italic mb-12 max-w-3xl">
          Elevate everyday moments to extraordinary.
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}>
          <Link
            to="/store"
            className="bg-white text-[#9c6a24] px-6 py-3 rounded-full font-semibold font-manrope hover:bg-opacity-90 transition">
            SHOP OUR FRAGRANCES
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
