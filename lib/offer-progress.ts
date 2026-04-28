/**
 * Offer Progress Tracking System
 * Tracks individual progress for each offer
 * Updates every 15 minutes in a cycle: 0/2 → 1/2 → 2/2
 */

export interface OfferProgress {
  offerId: string
  currentProgress: number
  maxProgress: number
  isCompleted: boolean
  lastUpdated: number
}

// Store progress in sessionStorage for real-time updates
const STORAGE_KEY = "offer_progress_"

/**
 * Initialize or get progress for an offer
 */
export function getOfferProgress(offerId: string): OfferProgress {
  if (typeof window === "undefined") {
    return {
      offerId,
      currentProgress: 0,
      maxProgress: 2,
      isCompleted: false,
      lastUpdated: Date.now(),
    }
  }

  const stored = sessionStorage.getItem(`${STORAGE_KEY}${offerId}`)
  if (stored) {
    return JSON.parse(stored)
  }

  const newProgress: OfferProgress = {
    offerId,
    currentProgress: 0,
    maxProgress: 2,
    isCompleted: false,
    lastUpdated: Date.now(),
  }

  sessionStorage.setItem(`${STORAGE_KEY}${offerId}`, JSON.stringify(newProgress))
  return newProgress
}

/**
 * Calculate elapsed time since last update (in minutes)
 */
export function getElapsedMinutes(lastUpdated: number): number {
  return Math.floor((Date.now() - lastUpdated) / (1000 * 60))
}

/**
 * Update progress based on 15-minute cycle
 * Every 15 minutes, progress increments: 0/2 → 1/2 → 2/2 → completed
 */
export function updateOfferProgress(offerId: string): OfferProgress {
  if (typeof window === "undefined") {
    return getOfferProgress(offerId)
  }

  const progress = getOfferProgress(offerId)
  const elapsedMinutes = getElapsedMinutes(progress.lastUpdated)

  // Update every 15 minutes
  const cyclesElapsed = Math.floor(elapsedMinutes / 15)

  if (cyclesElapsed > 0) {
    const newProgress = Math.min(progress.currentProgress + cyclesElapsed, progress.maxProgress)
    const isCompleted = newProgress >= progress.maxProgress

    const updated: OfferProgress = {
      ...progress,
      currentProgress: newProgress,
      isCompleted,
      lastUpdated: Date.now(),
    }

    sessionStorage.setItem(`${STORAGE_KEY}${offerId}`, JSON.stringify(updated))
    return updated
  }

  return progress
}

/**
 * Manually set progress (for testing or user interaction)
 */
export function setOfferProgress(offerId: string, currentProgress: number): OfferProgress {
  if (typeof window === "undefined") {
    return getOfferProgress(offerId)
  }

  const progress = getOfferProgress(offerId)
  const isCompleted = currentProgress >= progress.maxProgress

  const updated: OfferProgress = {
    ...progress,
    currentProgress: Math.min(currentProgress, progress.maxProgress),
    isCompleted,
    lastUpdated: Date.now(),
  }

  sessionStorage.setItem(`${STORAGE_KEY}${offerId}`, JSON.stringify(updated))
  return updated
}

/**
 * Reset progress for an offer
 */
export function resetOfferProgress(offerId: string): void {
  if (typeof window === "undefined") return

  const newProgress: OfferProgress = {
    offerId,
    currentProgress: 0,
    maxProgress: 2,
    isCompleted: false,
    lastUpdated: Date.now(),
  }

  sessionStorage.setItem(`${STORAGE_KEY}${offerId}`, JSON.stringify(newProgress))
}

/**
 * Get time until next progress update (in seconds)
 */
export function getTimeUntilNextUpdate(offerId: string): number {
  const progress = getOfferProgress(offerId)
  const elapsedMinutes = getElapsedMinutes(progress.lastUpdated)
  const minutesUntilUpdate = 15 - (elapsedMinutes % 15)
  return minutesUntilUpdate * 60
}
