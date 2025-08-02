"use client";
import React, { useEffect, useRef, RefObject } from "react";

interface BackgroundAnimationProps {
  showLoading: boolean;
}

interface ParticleOptions {
  canvasWidth: number;
  canvasHeight: number;
}

class Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  pulse: number;
  floatOffset: number;
  z: number; // depth layer, [0,1]
  constructor({ canvasWidth, canvasHeight }: ParticleOptions) {
    this.z = Math.random(); // depth: closer ones move faster/larger
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseSize = Math.random() * 2 + 0.5;
    this.size = this.baseSize;
    const speedFactor = 0.3 + this.z * 1.5; // closer moves a bit more
    this.speedX = (Math.random() - 0.5) * 2 * speedFactor;
    this.speedY = (Math.random() - 0.5) * 2 * speedFactor;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.hue = Math.random() * 60 + 220; // starting hue
    this.pulse = Math.random() * Math.PI * 2;
    this.floatOffset = Math.random() * Math.PI * 2;
  }

  update(
    canvasWidth: number,
    canvasHeight: number,
    mouse: { x: number; y: number } | null,
    globalHueShift: number
  ) {
    // Movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

    // Organic float & pulse
    this.pulse += 0.02 + this.z * 0.005;
    this.floatOffset += 0.01;
    this.y += Math.sin(this.pulse) * 0.4 * (1 - this.z * 0.5);
    this.x += Math.cos(this.floatOffset) * 0.2 * (1 - this.z * 0.5);

    // Mouse repulsion
    if (mouse) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const minDist = 100;
      if (distSq < minDist * minDist && distSq > 0) {
        const factor = (minDist - Math.sqrt(distSq)) / minDist;
        // push away
        this.x += (dx / Math.sqrt(distSq)) * factor * 5 * (1 - this.z);
        this.y += (dy / Math.sqrt(distSq)) * factor * 5 * (1 - this.z);
      }
    }

    // Size pulse
    this.size = this.baseSize + Math.sin(this.pulse) * 0.5 * (1 - this.z * 0.5);

    // Opacity modulation
    this.opacity = 0.3 + Math.sin(this.pulse * 0.9) * 0.2;

    // Hue drifts slowly with global shift
    this.hue = (this.hue + globalHueShift * 0.02) % 360;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.size, 0.3), 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
    ctx.shadowBlur = 18 * (1 - this.z * 0.5);
    ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${Math.min(
      this.opacity + 0.2,
      1
    )})`;
    ctx.fill();
    ctx.restore();
  }
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({
  showLoading,
}) => {
  const canvasRef: RefObject<HTMLCanvasElement | null> = useRef(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const hueShiftRef = useRef(0);

  useEffect(() => {
    if (showLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 80 : 150;

    // For spatial partitioning (simple grid) to limit O(n^2) line checks
    const gridSize = 160; // cell size for proximity
    let grid: Map<string, Particle[]> = new Map();

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const buildGrid = () => {
      grid.clear();
      particles.forEach((p) => {
        const cellX = Math.floor(p.x / gridSize);
        const cellY = Math.floor(p.y / gridSize);
        const key = `${cellX},${cellY}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key)!.push(p);
      });
    };

    const getNeighbors = (p: Particle) => {
      const neighbors: Particle[] = [];
      const cellX = Math.floor(p.x / gridSize);
      const cellY = Math.floor(p.y / gridSize);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = `${cellX + dx},${cellY + dy}`;
          const bucket = grid.get(key);
          if (bucket) neighbors.push(...bucket);
        }
      }
      return neighbors;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(
          new Particle({
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
          })
        );
      }
    };
    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!ctx) return;
      // subtle background fade
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and build grid
      hueShiftRef.current += 0.2; // global hue drift
      buildGrid();
      particles.forEach((p) => {
        p.update(
          canvas.width,
          canvas.height,
          mouseRef.current,
          hueShiftRef.current
        );
      });

      // Draw connections with nearby neighbors
      const maxDist = 140;
      particles.forEach((p) => {
        const neighbors = getNeighbors(p);
        neighbors.forEach((other) => {
          if (other === p) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const opacity = 0.2 * (1 - dist / maxDist) * (1 - p.z * 0.5);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 1 * (1 - p.z * 0.3);
            ctx.stroke();
          }
        });
      });

      // Draw particles (draw closer ones last so they appear on top)
      particles
        .slice()
        .sort((a, b) => (a.z > b.z ? -1 : 1))
        .forEach((p) => p.draw(ctx));

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [showLoading]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    />
  );
};

export default BackgroundAnimation;
