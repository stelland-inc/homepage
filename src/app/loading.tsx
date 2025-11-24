'use client'
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/new_loader.json';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="w-40 h-40">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Loading;