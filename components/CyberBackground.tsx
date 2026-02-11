'use client'

import { useState, useEffect } from 'react'

interface Particle {
  id: number
  width: number
  height: number
  left: number
  top: number
  colorIndex: number
}

export function CyberBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Generate particles only on client after hydration
    const generatedParticles: Particle[] = [...Array(12)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      colorIndex: i % 3,
    }))
    setParticles(generatedParticles)
    setMounted(true)
  }, [])

  const getColor = (colorIndex: number) => {
    switch (colorIndex) {
      case 0:
        return 'rgba(0, 255, 150, 0.6)'
      case 1:
        return 'rgba(0, 255, 200, 0.5)'
      default:
        return 'rgba(102, 0, 255, 0.4)'
    }
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden pointer-events-none">
      {/* Base gradient with animated glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 50% 0%, rgba(0, 255, 150, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 600px 500px at 100% 100%, rgba(0, 255, 200, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 700px 400px at 0% 50%, rgba(102, 0, 255, 0.04) 0%, transparent 70%)
          `,
          animation: 'subtleGlowShift 20s ease-in-out infinite',
        }}
      />

      {/* Animated grid pattern - ultra optimized */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.15, animation: 'gridGlitch 15s linear infinite' }}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="cyber-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="rgba(0, 255, 150, 0.2)" strokeWidth="1" />
            <rect x="40" y="40" width="40" height="40" fill="none" stroke="rgba(0, 255, 200, 0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyber-grid)" />
      </svg>

      {/* Subtle horizontal scan lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0, 255, 150, 0.02) 0px, rgba(0, 255, 150, 0.02) 1px, transparent 1px, transparent 3px)',
          animation: 'scanlineScroll 8s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles - optimized with GPU transforms */}
      {mounted && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: getColor(particle.colorIndex),
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `floatParticle${particle.colorIndex} ${15 + particle.id * 2}s ease-in-out infinite`,
            filter: 'drop-shadow(0 0 4px currentColor)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Animated corner accents */}
      <div
        className="absolute top-0 left-0 w-48 h-48"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.1) 0%, transparent 70%)',
          animation: 'cornerPulse 6s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48"
        style={{
          background: 'linear-gradient(315deg, rgba(0, 255, 200, 0.08) 0%, transparent 70%)',
          animation: 'cornerPulse 7s ease-in-out infinite 1s',
          filter: 'blur(40px)',
        }}
      />

      {/* Animated border highlights - subtle tech feel */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 150, 0.3) 50%, transparent 100%)',
          animation: 'borderFlow 8s linear infinite',
        }}
      />

      <style>{`
        @keyframes subtleGlowShift {
          0%, 100% {
            opacity: 0.8;
            filter: blur(60px);
          }
          50% {
            opacity: 1;
            filter: blur(80px);
          }
        }

        @keyframes gridGlitch {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-2px) translateX(1px);
          }
          50% {
            transform: translateY(-4px) translateX(-1px);
          }
          75% {
            transform: translateY(-2px) translateX(1px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes scanlineScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(20px);
          }
        }

        @keyframes floatParticle0 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(80px, -150px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes floatParticle1 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-100px, -180px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes floatParticle2 {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(120px, -200px) scale(0.6);
            opacity: 0;
          }
        }

        @keyframes cornerPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes borderFlow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
