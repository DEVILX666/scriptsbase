'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { translations, countryToLanguage } from '@/lib/translations'
import { Game } from './GameCarousel'

interface VideoOverlayProps {
  game: Game
  onContinue: () => void
}

async function getCountryCode(): Promise<string> {
  try {
    // Try primary geolocation service (ipapi.co)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (data.country_code) {
          return data.country_code
        }
      }
    } catch (error) {
      // Continue to fallback
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch('https://geolocation-db.com/json/', {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (data.country_code) {
          return data.country_code
        }
      }
    } catch (error) {
      // Continue with default
    }

    // Default fallback
    return 'US'
  } catch (error) {
    return 'US'
  }
}

export function VideoOverlay({ game, onContinue }: VideoOverlayProps) {
  const [language, setLanguage] = useState<string>('en')
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(3)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const countryCode = await getCountryCode()
        const detectedLanguage = countryCode
          ? countryToLanguage[countryCode.toLowerCase()] || 'en'
          : 'en'
        setLanguage(detectedLanguage)
      } catch (error) {
        setLanguage('en')
      }
    }

    detectLanguage()
  }, [])

  useEffect(() => {
    setIsButtonEnabled(false)
    setTimeRemaining(110)

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setIsButtonEnabled(true)
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleContinue = () => {
    if (isButtonEnabled) {
      onContinue()
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentTranslation =
    translations[language as keyof typeof translations] || translations.en

  // Determine video URL based on game name
  const getVideoUrl = () => {
    const gameNameLower = game.name.toLowerCase()

    if (gameNameLower.includes('tsunami') || gameNameLower.includes('escape tsunami')) {
      return 'https://streamable.com/e/aunk0f?nocontrols=0'
    } else if (gameNameLower.includes('rivals')) {
      return 'https://streamable.com/e/dm6xl8?nocontrols=0'
    } else {
      return 'https://streamable.com/e/3meq0b?nocontrols=0'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-2xl h-full sm:h-[95vh] bg-black border border-cyan-500/40 rounded-none sm:rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-500/15 to-green-500/15 border-b border-cyan-500/30 px-3 py-2 sm:py-3 text-center flex-shrink-0 backdrop-blur-sm">
          <h1 className="text-sm sm:text-xl font-bold text-cyan-300 neon-glow-cyan truncate">
            {currentTranslation.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            {currentTranslation.watchText || "Watch the video till the end"}
          </p>
          <p className="text-lg sm:text-xl mt-1">👇</p>
        </header>

        {/* Video fills remaining space */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <iframe
            src={getVideoUrl()}
            allowFullScreen
            title="Premium Scripts Tutorial"
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
          />
        </div>

        {/* Button */}
        <footer className="border-t border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-green-500/10 px-3 py-3 sm:py-4 flex-shrink-0 backdrop-blur-sm">
          <Button
            onClick={handleContinue}
            disabled={!isButtonEnabled}
            className={`w-full font-bold py-3 sm:py-4 rounded-lg transition-all duration-300 ${
              isButtonEnabled
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 hover:opacity-90 hover:scale-105 text-black shadow-lg hover:shadow-2xl text-base sm:text-lg'
                : 'bg-gray-700/50 cursor-not-allowed text-gray-400 text-base sm:text-lg border border-gray-600/50'
            }`}
          >
            {isButtonEnabled
              ? currentTranslation.button
              : `${currentTranslation.button} (${formatTime(timeRemaining)})`}
          </Button>
        </footer>
      </div>
    </div>
  )
}
