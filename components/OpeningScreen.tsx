'use client'

import { useEffect, useState } from 'react'

interface OpeningScreenProps {
  onComplete: () => void
}

export function OpeningScreen({ onComplete }: OpeningScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Start exit sequence at 3.5s
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 3500)

    // Complete at 4.2s
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 4200)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-700 overflow-hidden ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated scanlines background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 150, 0.03) 0px, rgba(0, 255, 150, 0.03) 1px, transparent 1px, transparent 2px)',
            animation: 'scanlines 8s linear infinite',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 255, 150, 0.15) 0%, transparent 70%)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main text with hacking effect */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em]">
            <span
              className="neon-glow-cyan inline-block"
              style={{
                animation: 'hackingFadeInOut 2.5s cubic-bezier(0.4, 0, 0.6, 1) forwards',
                willChange: 'opacity, transform, text-shadow',
              }}
            >
              WELCOME TO
            </span>
          </h1>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em]">
            <span
              className="neon-glow-green inline-block"
              style={{
                animation: 'hackingFadeInOut 2.5s cubic-bezier(0.4, 0, 0.6, 1) forwards 0.3s both',
                willChange: 'opacity, transform, text-shadow',
              }}
            >
              SCRIPTSBASE
            </span>
          </h2>
        </div>

        {/* Typing cursor effect */}
        <div 
          className="mt-8 text-cyan-400 text-lg tracking-widest"
          style={{
            animation: 'typeWriter 2.5s steps(24, end) 0.5s forwards, blinkCursor 1s step-end 2.5s infinite',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {'>'} ACCESSING DATABASE...
        </div>
      </div>

      <style>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.8;
            filter: blur(20px);
          }
          50% {
            opacity: 1;
            filter: blur(30px);
          }
        }

        @keyframes hackingFadeInOut {
          0% {
            opacity: 0;
            text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff, 0 0 10px rgba(0, 255, 255, 0.5);
            transform: scaleX(0.95) rotateY(-5deg);
          }
          20% {
            opacity: 1;
            text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff, 0 0 20px rgba(0, 255, 255, 0.8);
            transform: scaleX(1) rotateY(0deg);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(0, 255, 150, 0.6), 0 0 20px rgba(0, 255, 150, 0.3);
            transform: scaleX(1) rotateY(0deg);
          }
          80% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(0, 255, 150, 0.8), 0 0 40px rgba(0, 255, 150, 0.4);
            transform: scaleX(1) rotateY(0deg);
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(0, 255, 150, 0.8), 0 0 30px rgba(0, 255, 150, 0.5);
            transform: scaleX(1) rotateY(0deg);
          }
        }

        @keyframes typeWriter {
          0% {
            width: 0;
          }
          100% {
            width: 24ch;
          }
        }

        @keyframes blinkCursor {
          0%, 49% {
            border-right: 3px solid #00ffff;
          }
          50%, 100% {
            border-right: 3px solid transparent;
          }
        }
      `}</style>
    </div>
  )
}
