"use client";
import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  showLoading: boolean;
  setShowLoading: (show: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ showLoading, setShowLoading }) => {
  const [particleStyles, setParticleStyles] = useState<React.CSSProperties[]>([]);
  const [gridParticles, setGridParticles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [setShowLoading]);

  useEffect(() => {
    if (!showLoading) return;
    
    // Floating particles
    const styles = [...Array(40)].map(() => ({
      width: `${Math.random() * 15 + 5}px`,
      height: `${Math.random() * 15 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.4 + 0.1,
      animationDuration: `${Math.random() * 15 + 5}s`,
      animationDelay: `${Math.random() * 3}s`,
      filter: `blur(${Math.random() * 3}px)`,
      background: `radial-gradient(circle, 
        ${getRandomColor()}, 
        ${getRandomColor()})`
    }));
    
    // Grid particles (background grid)
    const grid = [];
    const cols = 20;
    const rows = 15;
    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      grid.push({
        left: `${(col / cols) * 100}%`,
        top: `${(row / rows) * 100}%`,
        width: '2px',
        height: '2px',
        opacity: 0,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 2}s`,
        background: getRandomColor(),
        boxShadow: `0 0 5px 1px ${getRandomColor()}`
      });
    }
    
    setParticleStyles(styles);
    setGridParticles(grid);
  }, [showLoading]);

  function getRandomColor() {
    const colors = [
      'rgba(99, 102, 241, 0.8)',  // indigo
      'rgba(59, 130, 246, 0.8)',   // blue
      'rgba(168, 85, 247, 0.8)',   // purple
      'rgba(236, 72, 153, 0.8)',   // pink
      'rgba(6, 182, 212, 0.8)',    // cyan
      'rgba(34, 211, 238, 0.8)',   // light blue
      'rgba(217, 70, 239, 0.8)'    // fuchsia
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-8 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-8 border-transparent 
            border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-cyan-500 
            animate-spin-gradient shadow-lg shadow-blue-500/30"></div>
          <div className="absolute inset-4 rounded-full bg-slate-900 flex items-center justify-center">
            <Terminal className="w-12 h-12 text-blue-400 animate-pulse-glow" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white animate-pulse-glow">
          Loading Portfolio
        </h2>
        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-loading-progress"
            style={{ animationDuration: '5s' }}
          />
        </div>
        <p className="mt-2 text-slate-400 text-sm animate-float-gentle">
          Preparing the experience...
        </p>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {particleStyles.map((style, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float-gentle"
            style={style}
          />
        ))}
        
        {/* Grid particles */}
        {gridParticles.map((style, i) => (
          <div
            key={`grid-${i}`}
            className="absolute rounded-full animate-pulse-glow"
            style={style}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent animate-pan-down"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/20 to-transparent animate-pan-right"></div>
        </div>
        
        {/* Pulsing circles */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-900/10 animate-pulse-scale transform-gpu"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-900/10 animate-pulse-scale transform-gpu" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;