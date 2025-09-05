import React from 'react';
import { motion } from 'framer-motion';
import { logoAnimation2 } from '@/lib/utils';
import map from '../assets/moneta-loading-map.webp';
import spinner from '../assets/market-transaction-animation.webp';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999999] bg-[#070c1b] flex items-center justify-center noRight">
      <div className="absolute w-[465px] h-[140px] flex items-center justify-center gap-[10px] transition-all duration-500 ease-in-out">
        <motion.div
          className="w-[140px] h-[140px] flex items-center justify-center"
          animate={logoAnimation2}
        >
          <img
            loading="lazy"
            src={spinner}
            width={120}
            height={120}
            style={{ transform: 'scale(1.15)' }}
            alt="Mirrorcaps icon"
          />
        </motion.div>
        <div className="load-text">
          <img
            loading="lazy"
            src="/loader-logo.png"
            alt="Mirrorcaps logo text"
            width={308}
            height={107}
          />
        </div>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-auto">
        <img
          loading="lazy"
          src={map}
          alt="Mirrorcaps logo icon"
          width={1920}
          height={736}
        />
      </div>
    </div>
  );
};

export default PageLoader;
