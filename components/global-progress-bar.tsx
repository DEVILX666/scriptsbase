"use client"

import { useState, useEffect } from "react"
import { Lock } from "lucide-react"

interface GlobalProgressBarProps {
  currentProgress: number
  maxProgress: number
  language: string
}

export function GlobalProgressBar({
  currentProgress,
  maxProgress,
  language,
}: GlobalProgressBarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const taskLeft = maxProgress - currentProgress
  const displayText =
    language === "es"
      ? `${taskLeft} Tarea${taskLeft !== 1 ? "s" : ""} para desbloquear scripts`
      : language === "fr"
        ? `${taskLeft} Tâche${taskLeft !== 1 ? "s" : ""} pour déverrouiller les scripts`
        : language === "de"
          ? `${taskLeft} Aufgabe${taskLeft !== 1 ? "n" : ""} um Scripts freizuschalten`
          : `${taskLeft} Task${taskLeft !== 1 ? "s" : ""} left to unlock scripts`

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-md border-b border-cyan-400/60 shadow-lg shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Spinner and Text */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Spinning Loader Icon */}
            <div className="relative w-8 h-8 flex-shrink-0">
              <svg
                className="w-full h-full animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-cyan-500/40" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-cyan-300"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-sm md:text-base font-semibold text-white/95 truncate">
                Checking Completion...
              </p>
              <p className="text-xs md:text-sm text-cyan-300 truncate">
                {displayText}
              </p>
            </div>
          </div>

          {/* Right: Progress Badge */}
          <div className="flex-shrink-0 px-4 py-2.5 rounded-lg border border-cyan-400/80 bg-slate-800/80 backdrop-blur-md shadow-md shadow-cyan-500/20">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-300" />
              <span className="text-xs md:text-sm font-mono font-bold text-cyan-200">
                {currentProgress} / {maxProgress}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Underline */}
        <div className="relative h-1 mt-4 overflow-hidden bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          <div className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-slide-right shadow-lg shadow-cyan-400/50"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        :global(.animate-slide-right) {
          animation: slide-right 2s infinite;
        }
      `}</style>
    </div>
  )
}
