"use client";
import React, { useEffect, useState } from 'react';
import { Terminal, Code, Zap, Layers } from 'lucide-react';

interface LoadingScreenProps {
  showLoading: boolean;
  setShowLoading: (show: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ showLoading, setShowLoading }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [particleStyles, setParticleStyles] = useState<React.CSSProperties[]>([]);

  const loadingPhases = [
    { text: 'Initializing...', icon: Zap, duration: 800 },
    { text: 'Loading Components...', icon: Layers, duration: 1200 },
    { text: 'Compiling Assets...', icon: Code, duration: 1500 },
    { text: 'Optimizing Performance...', icon: Terminal, duration: 1000 },
    { text: 'Finalizing...', icon: Zap, duration: 500 }
  ];

  useEffect(() => {
    if (!showLoading) return;

    let progressInterval: NodeJS.Timeout;
    let phaseTimeout: NodeJS.Timeout;
    let currentProgress = 0;

    const updateProgress = () => {
      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 3 + 1;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setShowLoading(false), 500);
        }
      }, 80);
    };

    const cyclePhases = () => {
      let phaseIndex = 0;
      
      const nextPhase = () => {
        if (phaseIndex < loadingPhases.length) {
          setCurrentPhase(phaseIndex);
          setLoadingText(loadingPhases[phaseIndex].text);
          
          phaseTimeout = setTimeout(() => {
            phaseIndex++;
            nextPhase();
          }, loadingPhases[phaseIndex].duration);
        }
      };
      
      nextPhase();
    };

    // Start animations
    updateProgress();
    cyclePhases();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimeout);
    };
  }, [showLoading, setShowLoading]);

  useEffect(() => {
    if (!showLoading) return;
    
    // Create sophisticated particle system
    const styles = [...Array(25)].map((_, i) => ({
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.6 + 0.2,
      animationDuration: `${Math.random() * 20 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      background: getRandomColor(),
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      boxShadow: `0 0 ${Math.random() * 10 + 5}px ${getRandomColor()}`
    }));
    
    setParticleStyles(styles);
  }, [showLoading]);

  function getRandomColor() {
    const colors = [
      'rgba(59, 130, 246, 0.4)',   // blue
      'rgba(147, 51, 234, 0.4)',   // purple  
      'rgba(236, 72, 153, 0.4)',   // pink
      'rgba(6, 182, 212, 0.4)',    // cyan
      'rgba(34, 197, 94, 0.4)',    // green
      'rgba(251, 191, 36, 0.4)'    // amber
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  if (!showLoading) return null;

  const CurrentIcon = loadingPhases[currentPhase]?.icon || Terminal;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particleStyles.map((style, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-float-particle"
            style={{
              ...style,
              animation: `float-particle-${i % 4 + 1} ${style.animationDuration} linear infinite`
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
        
        {/* Logo/Icon container */}
        <div className="relative mb-8">
          <div className="relative w-24 h-24 mb-6">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-cyan-500 border-l-pink-500 animate-spin-reverse" />
            <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin-slow" />
            
            {/* Center icon */}
            <div className="absolute inset-6 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center border border-slate-700">
              <CurrentIcon className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Portfolio
          </h1>
          <p className="text-slate-400 text-sm tracking-wide">Professional Developer Experience</p>
        </div>

        {/* Loading phase indicator */}
        <div className="mb-8 h-6">
          <p className="text-slate-300 text-sm font-medium transition-all duration-300 ease-in-out">
            {loadingText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mb-4">
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-600">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Side lights */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        
        {/* Bottom light */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500/30 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-pink-500/30 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg" />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateX(20px) rotate(-180deg); opacity: 0.7; }
        }
        
        @keyframes float-particle-3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translate(-15px, -15px) rotate(90deg); opacity: 0.9; }
        }
        
        @keyframes float-particle-4 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(15px, 15px) rotate(-90deg); opacity: 0.6; }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;