"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { translations, countryToLanguage } from "@/lib/translations"

interface VideoOverlayProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  lockerUrl: string
  gameName: string
}

async function getCountryCode(): Promise<string> {
  try {
    // Try primary geolocation service (ipapi.co)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
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
      
      const response = await fetch("https://geolocation-db.com/json/", {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
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
    return "US"
  } catch (error) {
    return "US"
  }
}

export function VideoOverlay({ isOpen, onClose, onContinue, lockerUrl, gameName }: VideoOverlayProps) {
  const [language, setLanguage] = useState<string>("en")
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(140)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const detectLanguage = async () => {
      try {
        const countryCode = await getCountryCode()
        const detectedLanguage = countryCode ? countryToLanguage[countryCode.toLowerCase()] || "en" : "en"
        setLanguage(detectedLanguage)
      } catch (error) {
        setLanguage("en")
      }
    }

    detectLanguage()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

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
  }, [isOpen])

  const handleContinue = () => {
    if (isButtonEnabled) {
      onContinue()
      setTimeout(() => {
        window.location.href = lockerUrl
      }, 300)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTranslation = translations[language] || translations.en

  // Determine video URL based on game name
  const getVideoUrl = () => {
    const gameNameLower = gameName.toLowerCase()
    
    if (gameNameLower.includes("tsunami") || gameNameLower.includes("escape tsunami")) {
      return "https://streamable.com/e/aunk0f?nocontrols=0"
    } else if (gameNameLower.includes("rivals")) {
      return "https://streamable.com/e/dm6xl8?nocontrols=0"
    } else {
      return "https://streamable.com/e/3meq0b?nocontrols=0"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-2xl h-full sm:h-[95vh] bg-card border border-border/50 rounded-none sm:rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border/50 px-3 py-2 sm:py-3 text-center flex-shrink-0">
          <h1 className="text-sm sm:text-xl font-bold text-foreground truncate">{currentTranslation.title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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
            style={{ border: "none", display: "block" }}
          />
        </div>

        {/* Button */}
        <footer className="border-t border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-3 sm:py-4 flex-shrink-0">
          <Button
            onClick={handleContinue}
            disabled={!isButtonEnabled}
            className={`w-full font-bold py-3 sm:py-4 rounded-lg transition-all duration-300 ${
              isButtonEnabled
                ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-105 text-white shadow-lg text-base sm:text-lg"
                : "bg-gray-600 cursor-not-allowed text-gray-300 text-base sm:text-lg"
            }`}
          >
            {isButtonEnabled 
              ? currentTranslation.button 
              : `${currentTranslation.button} (${formatTime(timeRemaining)})`
            }
          </Button>
        </footer>
      </div>
    </div>
  )
}
