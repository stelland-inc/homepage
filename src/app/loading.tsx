'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import loadingAnimation from '@/assets/new_loader.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="w-40 h-40">
        <Lottie
          animationData={loadingAnimation}
          loop
          renderer={'canvas' as any}
          autoplay
        />
      </div>
    </div>
  );
};

export default Loading;