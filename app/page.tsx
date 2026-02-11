'use client'

import { useState } from 'react'
import { OpeningScreen } from '@/components/OpeningScreen'
import { GameCarousel, type Game } from '@/components/GameCarousel'
import { VideoOverlay } from '@/components/VideoOverlay'
import { CyberBackground } from '@/components/CyberBackground'

type AppState = 'opening' | 'carousel' | 'video' | 'redirecting'

export default function Home() {
  const [state, setState] = useState<AppState>('opening')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const handleOpeningComplete = () => {
    setState('carousel')
  }

  const handleGameSelected = (game: Game) => {
    setSelectedGame(game)
    setState('video')
  }

  const handleVideoContinue = () => {
    if (selectedGame) {
      setState('redirecting')
      // Small delay for visual feedback
      setTimeout(() => {
        window.location.href = selectedGame.redirectUrl
      }, 300)
    }
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-black relative">
      <CyberBackground />

      <div className="relative z-10">
        {state === 'opening' && <OpeningScreen onComplete={handleOpeningComplete} />}

      {state === 'carousel' && <GameCarousel onGameSelected={handleGameSelected} />}

      {state === 'video' && selectedGame && (
        <VideoOverlay game={selectedGame} onContinue={handleVideoContinue} />
      )}

        {state === 'redirecting' && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-cyan-300 text-lg font-bold tracking-widest uppercase">Unlocking access...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
