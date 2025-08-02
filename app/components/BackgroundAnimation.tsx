"use client";
import React, { useEffect, useRef, RefObject } from "react";

interface BackgroundAnimationProps {
  showLoading: boolean;
}

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  hue: number;
  type: 'circle' | 'square' | 'triangle';
}

const createFloatingElement = (width: number, height: number): FloatingElement => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: 20 + Math.random() * 40,
  speed: 0.2 + Math.random() * 0.8,
  rotation: Math.random() * Math.PI * 2,
  rotationSpeed: (Math.random() - 0.5) * 0.02,
  opacity: 0.1 + Math.random() * 0.2,
  hue: 200 + Math.random() * 80,
  type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
});

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  showLoading,
}) => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (showLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Adjust number of elements based on screen size
      const elementCount = window.innerWidth < 768 ? 8 : 12;
      elementsRef.current = Array.from({ length: elementCount }, () =>
        createFloatingElement(window.innerWidth, window.innerHeight)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    if (elementsRef.current.length === 0) {
      const elementCount = window.innerWidth < 768 ? 8 : 12;
      elementsRef.current = Array.from({ length: elementCount }, () =>
        createFloatingElement(window.innerWidth, window.innerHeight)
      );
    }

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const height = size * Math.sqrt(3) / 2;
      ctx.beginPath();
      ctx.moveTo(x, y - height / 2);
      ctx.lineTo(x - size / 2, y + height / 2);
      ctx.lineTo(x + size / 2, y + height / 2);
      ctx.closePath();
    };

    const drawElement = (element: FloatingElement) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate(element.rotation);
      
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, element.size);
      gradient.addColorStop(0, `hsla(${element.hue}, 70%, 60%, ${element.opacity})`);
      gradient.addColorStop(0.7, `hsla(${element.hue}, 70%, 40%, ${element.opacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${element.hue}, 70%, 20%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = `hsla(${element.hue}, 70%, 80%, ${element.opacity * 0.3})`;
      ctx.lineWidth = 1;

      switch (element.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case 'square':
          ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size);
          ctx.strokeRect(-element.size / 2, -element.size / 2, element.size, element.size);
          break;
        case 'triangle':
          drawTriangle(ctx, 0, 0, element.size);
          ctx.fill();
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };

    const updateElement = (element: FloatingElement) => {
      // Floating motion with sine wave
      element.y -= element.speed;
      element.x += Math.sin(timeRef.current * 0.001 + element.x * 0.01) * 0.5;
      element.rotation += element.rotationSpeed;
      
      // Pulse opacity
      element.opacity = (0.15 + Math.sin(timeRef.current * 0.002 + element.y * 0.01) * 0.1);
      
      // Reset position when element goes off screen
      if (element.y < -element.size) {
        element.y = window.innerHeight + element.size;
        element.x = Math.random() * window.innerWidth;
        element.hue = 200 + Math.random() * 80;
      }
      
      if (element.x < -element.size) {
        element.x = window.innerWidth + element.size;
      } else if (element.x > window.innerWidth + element.size) {
        element.x = -element.size;
      }
    };

    const drawGrid = () => {
      const gridSize = window.innerWidth < 768 ? 60 : 80;
      const opacity = 0.03;
      
      ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= window.innerWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= window.innerHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < elementsRef.current.length; i++) {
        for (let j = i + 1; j < elementsRef.current.length; j++) {
          const el1 = elementsRef.current[i];
          const el2 = elementsRef.current[j];
          const distance = Math.sqrt(
            Math.pow(el1.x - el2.x, 2) + Math.pow(el1.y - el2.y, 2)
          );
          
          if (distance < 200) {
            const opacity = (200 - distance) / 200 * 0.1;
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(el1.x, el1.y);
            ctx.lineTo(el2.x, el2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw subtle grid
      drawGrid();
      
      // Update and draw floating elements
      elementsRef.current.forEach(element => {
        updateElement(element);
        drawElement(element);
      });
      
      // Draw connections between nearby elements
      drawConnections();
      
      // Add subtle center glow
      const centerGradient = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight / 2,
        Math.max(window.innerWidth, window.innerHeight) / 2
      );
      centerGradient.addColorStop(0, 'rgba(59, 130, 246, 0.02)');
      centerGradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [showLoading]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      />
      {/* Enhanced Floating Elements */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${showLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-float-particle-1" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-500 rounded-full opacity-40 animate-float-particle-2" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-pink-500 rounded-full opacity-50 animate-float-particle-3" />
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-cyan-500 rounded-full opacity-30 animate-float-particle-4" />

        {/* Code-like floating elements */}
        <div className="absolute top-20 left-1/4 text-blue-400/20 text-xs font-mono rotate-12 select-none animate-float-code-1">
          const developer = 'passionate'
        </div>
        <div className="absolute bottom-40 right-1/4 text-purple-400/20 text-xs font-mono -rotate-12 select-none animate-float-code-2">
          {'{ innovation: true }'}
        </div>
      </div>
    </>
  );
};

export default BackgroundAnimation;