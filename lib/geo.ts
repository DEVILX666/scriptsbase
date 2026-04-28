/**
 * Server-side geolocation utilities
 * Uses IP-API (free tier) for country detection
 * Includes caching for improved performance
 */

import { getCachedGeo, setCachedGeo } from "./geo-cache"

export interface GeoLocation {
  country: string
  countryCode: string
  isUSA: boolean
}

/**
 * Detects user's country from their IP address
 * Uses a reliable geolocation API service with caching
 */
export async function getUserCountry(ip?: string, bypassCache: boolean = false): Promise<GeoLocation> {
  try {
    // Skip IP validation for local development
    if (!ip || ip === "::1" || ip === "127.0.0.1") {
      return {
        country: "USA",
        countryCode: "US",
        isUSA: true,
      }
    }

    // Check cache first (unless bypassing)
    if (!bypassCache) {
      const cachedResult = getCachedGeo(ip)
      if (cachedResult) {
        console.debug("[Geo] Cache hit for IP:", ip)
        return cachedResult
      }
    } else {
      console.log("[Geo] Bypassing cache for IP:", ip)
    }

    // Use ip-api.com for accurate geolocation
    // Free tier allows 45 requests/minute
    const url = `http://ip-api.com/json/${ip}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "NextJS-App/1.0",
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      throw new Error(`Geolocation API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== "success") {
      throw new Error(`Geolocation lookup failed: ${data.message}`)
    }

    const countryCode = data.countryCode || "UNKNOWN"
    const result: GeoLocation = {
      country: data.country || "Unknown",
      countryCode,
      isUSA: countryCode === "US",
    }

    // Cache the result
    setCachedGeo(ip, result)

    return result
  } catch (error) {
    console.error("[Geo] Error detecting country:", error)
    // Default to allowing access on API error (failsafe)
    return {
      country: "Unknown",
      countryCode: "UNKNOWN",
      isUSA: true,
    }
  }
}

/**
 * Extract client IP from Next.js request headers
 * Handles proxies and various deployment environments
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  const realIP = headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return "0.0.0.0"
}
