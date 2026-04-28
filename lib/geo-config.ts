/**
 * Geolocation Configuration
 * Centralized settings for geo-restriction system
 */

export const GEO_CONFIG = {
  /**
   * Allowed country codes for access
   * Change this to allow multiple countries
   * Example: ['US', 'CA', 'MX']
   */
  allowedCountries: [
    "US", // United States
    "FR", // France
    "DE", // Germany
    "GB", // United Kingdom
    "CH", // Switzerland
    "ES", // Spain
    "LU", // Luxembourg
    "SI", // Slovenia
    "AU", // Australia
    "CA", // Canada
    "PL", // Poland
    "GR", // Greece
    "BA", // Bosnia and Herzegovina
    "ME", // Montenegro
    "AE", // United Arab Emirates
    "BG", // Bulgaria
    "QA", // Qatar
    "SA", // Saudi Arabia
  ],

  /**
   * Geolocation API settings
   */
  api: {
    // Primary API: ip-api.com
    url: "http://ip-api.com/json",
    timeout: 5000, // milliseconds
    userAgent: "NextJS-App/1.0",
  },

  /**
   * Cache settings
   */
  cache: {
    // Time to live for cache entries (default: 1 hour)
    ttl: 60 * 60 * 1000,
    // Maximum entries to store in memory
    maxEntries: 10000,
  },

  /**
   * Redirect paths
   */
  redirects: {
    // Where to send non-allowed users
    blocked: "/unavailable",
    // Where to send allowed users (optional)
    allowed: "/",
  },

  /**
   * Debug/Monitoring
   */
  debug: {
    // Enable debug logging
    verbose: process.env.NODE_ENV === "development",
    // Enable debug endpoint
    enableDebugEndpoint: process.env.NODE_ENV === "development",
  },

  /**
   * Fallback behavior
   */
  fallback: {
    // Allow access if geolocation API fails
    allowOnError: true,
    // Log fallback events
    logFallbacks: true,
  },

  /**
   * IP detection settings
   */
  ipDetection: {
    // Headers to check for real IP (in priority order)
    headerPriority: ["x-forwarded-for", "x-real-ip", "cf-connecting-ip"],
    // Local IPs to skip geolocation check
    skipLocalIPs: ["127.0.0.1", "::1", "localhost"],
  },

  /**
   * Production settings
   * Override these based on environment
   */
  production: {
    // Use premium geolocation API
    usePremiumAPI: false,
    // Cache geolocation results
    enableCache: true,
    // Log all geo blocks
    logBlocks: true,
  },
}

/**
 * Check if a country code is allowed
 */
export function isCountryAllowed(countryCode: string): boolean {
  return GEO_CONFIG.allowedCountries.includes(countryCode)
}

/**
 * Get redirect URL based on access
 */
export function getRedirectUrl(isAllowed: boolean): string {
  return isAllowed ? GEO_CONFIG.redirects.allowed : GEO_CONFIG.redirects.blocked
}

/**
 * Update allowed countries at runtime
 * Use with caution in production
 */
export function updateAllowedCountries(countries: string[]): void {
  GEO_CONFIG.allowedCountries = countries
  console.log("[Geo] Allowed countries updated:", countries)
}
