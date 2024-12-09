import React from 'react';
import Lottie from 'lottie-react';

interface LottieLoaderProps {
  animationData: Animation; // The Lottie JSON animation file
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LottieLoader: React.FC<LottieLoaderProps> = ({
  animationData,
  width = 200,
  height = 200,
  className = ''
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width, height }}
      />
    </div>
  );
};

export default LottieLoader;
