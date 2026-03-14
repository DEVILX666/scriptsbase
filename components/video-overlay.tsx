"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { translations, countryToLanguage } from "@/lib/translations"
import Image from "next/image"

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const scriptImages = [
    "/scripts pic 1.png",
    "/scripts pic 2.png",
    "/scripts pic 3.png",
  ]

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
    setTimeRemaining(10)
    setCurrentImageIndex(0)
    
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

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? scriptImages.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === scriptImages.length - 1 ? 0 : prev + 1
    )
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTranslation = translations[language] || translations.en

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-2xl h-full sm:h-[95vh] bg-card border border-border/50 rounded-none sm:rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border/50 px-3 py-2 sm:py-3 text-center flex-shrink-0">
          <h1 className="text-sm sm:text-xl font-bold text-foreground truncate">{currentTranslation.title}</h1>
          <p className="text-lg sm:text-xl mt-2">👇</p>
        </header>

        {/* Image Gallery with Navigation */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Current Image */}
            <div className="relative w-full h-full max-w-full max-h-full">
              <Image
                src={scriptImages[currentImageIndex]}
                alt={`Script preview ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm text-white font-medium">
            {currentImageIndex + 1} / {scriptImages.length}
          </div>
        </div>

        {/* Footer with Button */}
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
