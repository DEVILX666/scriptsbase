'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSwipe } from '@/hooks/useSwipe'

export interface Game {
  id: string
  name: string
  thumbnail: string
  videoUrl: string | null
  redirectUrl: string
}

export const GAMES: Game[] = [
  {
    id: 'steal-brainrot',
    name: 'Steal a Brainrot',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-a7e8f9e9d22cb5f138fec8b1d479dd1e/150/150/Image/Webp/noFilter',
    videoUrl: null,
    redirectUrl: 'https://installchecker.site/cl/i/o46o84',
  },
  {
    id: 'escape-tsunami',
    name: 'Escape Tsunami',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-a53cd6a473150fd917fb92390b82e658/150/150/Image/Webp/noFilter',
    videoUrl: 'https://streamable.com/dm6xl8',
    redirectUrl: 'https://installchecker.site/cl/i/5nnrd3',
  },
  {
    id: 'rivals',
    name: 'Rivals',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/150/150/Image/Webp/noFilter',
    videoUrl: 'https://streamable.com/aunk0f',
    redirectUrl: 'https://installchecker.site/cl/i/qnn3d5',
  },
  {
    id: '99-nights',
    name: '99 Nights in the Forest',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-01c83a40091a0d1f1753ad6cca099d31/150/150/Image/Webp/noFilter',
    videoUrl: null,
    redirectUrl: 'https://installchecker.site/cl/i/n66or9',
  },
  {
    id: 'blox-fruits',
    name: 'Blox Fruits',
    thumbnail: 'https://tr.rbxcdn.com/180DAY-610963206f287c1164c8fcad47efb331/150/150/Image/Webp/noFilter',
    videoUrl: null,
    redirectUrl: 'https://installchecker.site/cl/i/4oo4n1',
  },
]

interface GameCarouselProps {
  onGameSelected: (game: Game) => void
}

export function GameCarousel({ onGameSelected }: GameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left')
  const { direction, reset: resetSwipe } = useSwipe()

  useEffect(() => {
    if (direction === 'left') {
      setSlideDirection('left')
      handleNext()
      resetSwipe()
    } else if (direction === 'right') {
      setSlideDirection('right')
      handlePrev()
      resetSwipe()
    }
  }, [direction, resetSwipe])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection('left')
    setCurrentIndex((prev) => (prev + 1) % GAMES.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection('right')
    setCurrentIndex((prev) => (prev - 1 + GAMES.length) % GAMES.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const currentGame = GAMES[currentIndex]
  const nextGame = GAMES[(currentIndex + 1) % GAMES.length]
  const prevGame = GAMES[(currentIndex - 1 + GAMES.length) % GAMES.length]

  const getTransform = (position: 'current' | 'next' | 'prev') => {
    if (!isAnimating) {
      return position === 'current' ? 'translateX(0) scale(1) rotateY(0deg)' : 'translateX(0) scale(0.8) rotateY(0deg)'
    }

    if (slideDirection === 'left') {
      if (position === 'current') return 'translateX(-100%) scale(0.9) rotateY(25deg)'
      if (position === 'next') return 'translateX(0) scale(1) rotateY(0deg)'
      return 'translateX(-100%) scale(0.8) rotateY(25deg)'
    } else {
      if (position === 'current') return 'translateX(100%) scale(0.9) rotateY(-25deg)'
      if (position === 'prev') return 'translateX(0) scale(1) rotateY(0deg)'
      return 'translateX(100%) scale(0.8) rotateY(-25deg)'
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 relative overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 neon-glow-green tracking-widest">
        SELECT YOUR GAME SCRIPTS
      </h2>

      {/* Game Card Container - 3D Perspective */}
      <div className="flex-1 flex items-center justify-center w-full max-w-sm perspective" style={{ perspective: '1000px' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Previous Game Shadow */}
          <div
            className="absolute text-center pointer-events-none"
            style={{
              opacity: isAnimating ? 0 : 0.3,
              transform: getTransform('prev'),
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="mb-8 inline-block relative opacity-50">
              <div className="neon-box-glow rounded-lg p-2">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src={prevGame.thumbnail || "/placeholder.svg"}
                    alt={prevGame.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Game */}
          <div
            className="absolute text-center w-full transition-all"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: getTransform('current'),
              transitionDuration: '600ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: 10,
            }}
          >
            {/* Game Thumbnail */}
            <div className="mb-6 sm:mb-8 inline-block relative">
              <div className="neon-box-glow rounded-lg p-2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-xl blur-lg opacity-0 transition-opacity duration-600" style={{ opacity: isAnimating ? 0 : 0.5 }} />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-lg overflow-hidden bg-gray-900 shadow-2xl">
                  <Image
                    src={currentGame.thumbnail || "/placeholder.svg"}
                    alt={currentGame.name}
                    fill
                    className="object-cover"
                    priority
                    loading="eager"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Game Name */}
            <h3 className="text-xl sm:text-3xl font-bold neon-glow-cyan mb-6 sm:mb-8 tracking-wide transition-all duration-300">
              {currentGame.name}
            </h3>

            {/* Continue Button */}
            <button
              onClick={() => onGameSelected(currentGame)}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500/30 to-green-500/30 border border-cyan-500/60 rounded-lg text-cyan-300 font-bold uppercase tracking-widest text-xs sm:text-sm transition-all duration-300 hover:from-cyan-500/60 hover:to-green-500/60 hover:border-cyan-400 hover:text-cyan-100 active:scale-95 hover:shadow-lg hover:shadow-cyan-500/50"
              style={{
                boxShadow: '0 0 20px rgba(0, 255, 200, 0.3)',
              }}
            >
              Continue
            </button>
          </div>

          {/* Next Game Shadow */}
          <div
            className="absolute text-center pointer-events-none"
            style={{
              opacity: isAnimating ? 0 : 0.3,
              transform: getTransform('next'),
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="mb-8 inline-block relative opacity-50">
              <div className="neon-box-glow rounded-lg p-2">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src={nextGame.thumbnail || "/placeholder.svg"}
                    alt={nextGame.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="flex gap-2 justify-center mb-6 sm:mb-8">
        {GAMES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setSlideDirection(index > currentIndex ? 'left' : 'right')
                setIsAnimating(true)
                setCurrentIndex(index)
                setTimeout(() => setIsAnimating(false), 600)
              }
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-cyan-500 to-green-500 w-8 h-2 shadow-lg shadow-cyan-500/50' 
                : 'bg-gray-600 hover:bg-gray-500 w-2 h-2'
            }`}
          />
        ))}
      </div>

      {/* Subtle help text */}
      <p className="text-gray-500 text-xs uppercase tracking-widest">Swipe or click indicators to navigate</p>
    </div>
  )
}
