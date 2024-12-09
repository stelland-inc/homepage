// const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
      'three', 
      '@react-three/fiber', 
      '@react-three/drei', 
      'maath',
      'valtio'
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      // Explicit Three.js module resolution
      'three': require.resolve('three'),
    };
    
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/source',
      use: {
        loader: 'lottie-loader',
      },
    });
    
    config.externals = [...config.externals, { canvas: 'canvas' }];
    
    return config;
  },
  
  // Add this to ensure proper handling of client-side modules
  reactStrictMode: true,
  
};

module.exports = nextConfig;
