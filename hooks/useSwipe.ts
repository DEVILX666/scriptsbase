'use client';

import { useState, useEffect, useCallback } from 'react'

export function useSwipe() {
  const [startX, setStartX] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setStartX(e.touches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX

    if (Math.abs(diff) > 50) {
      setDirection(diff > 0 ? 'left' : 'right')
    }
  }, [startX])

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  const reset = useCallback(() => {
    setDirection(null)
  }, [])

  return { direction, reset }
}
