import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  getUserCountry,
  getClientIP,
  getCountryCodeFromEdgeHeaders,
  geoLocationFromCountryCode,
} from "@/lib/geo"
import { GEO_CONFIG, isCountryAllowed } from "@/lib/geo-config"
import { clearGeoCache } from "@/lib/geo-cache"

export async function middleware(request: NextRequest) {
  // Skip geo-check for certain paths (everything else runs geo; blocked users go to GEO_CONFIG.redirects.blocked)
  const pathname = request.nextUrl.pathname
  const skipPaths = ["/api", "/_next", "/favicon.ico"]

  if (skipPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check if user wants to clear cache (for testing)
  const searchParams = request.nextUrl.searchParams
  if (searchParams.get("clearGeoCache") === "true") {
    const clearedCount = clearGeoCache()
    console.log(`[Middleware] Cleared ${clearedCount} cache entries`)
  }

  const ip = getClientIP(request.headers)

  if (GEO_CONFIG.debug.verbose) {
    console.log("[Middleware] Checking IP:", ip)
  }

  try {
    const edgeCc = getCountryCodeFromEdgeHeaders(request.headers)
    const geoLocation = edgeCc
      ? geoLocationFromCountryCode(edgeCc)
      : await getUserCountry(ip)

    if (!isCountryAllowed(geoLocation.countryCode)) {
      if (GEO_CONFIG.production.logBlocks) {
        console.log(
          `[Middleware] Blocked access from ${geoLocation.country} (${geoLocation.countryCode})${edgeCc ? " [edge header]" : ""}`
        )
      }
      return NextResponse.redirect(new URL(GEO_CONFIG.redirects.blocked))
    }

    if (GEO_CONFIG.debug.verbose) {
      console.log(
        `[Middleware] Allowed access from ${geoLocation.country} (${geoLocation.countryCode})${edgeCc ? " [edge header]" : ""}`
      )
    }
  } catch (error) {
    console.error("[Middleware] Error in geolocation check:", error)

    if (!GEO_CONFIG.fallback.allowOnError) {
      return NextResponse.redirect(new URL(GEO_CONFIG.redirects.blocked))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
