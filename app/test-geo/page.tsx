"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestGeoPage() {
  const [cacheStats, setCacheStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const fetchCacheStats = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/clear-cache")
      const data = await res.json()
      setCacheStats(data.cache)
      setMessage("Cache stats fetched")
    } catch (error) {
      setMessage("Error fetching cache stats")
      console.error(error)
    }
    setLoading(false)
  }

  const clearCache = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/clear-cache", { method: "POST" })
      const data = await res.json()
      setMessage(
        `Cache cleared! Removed ${data.entriesCleared} entries. Try accessing the site again with your new IP.`
      )
      setCacheStats(null)
    } catch (error) {
      setMessage("Error clearing cache")
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCacheStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Geo-Restriction Testing Panel</CardTitle>
            <CardDescription>Clear the cache when changing IP/VPN</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">How to Test:</h3>
              <ol className="text-slate-300 space-y-2 text-sm">
                <li>1. If you&apos;re blocked, change your IP/VPN to a USA location</li>
                <li>2. Click "Clear Cache" below to remove cached geo-data</li>
                <li>3. Refresh the page - you should now see the main site</li>
              </ol>
            </div>

            {/* Cache Stats */}
            {cacheStats && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Current Cache Stats:</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>Total Entries: <span className="text-blue-400 font-mono">{cacheStats.totalEntries}</span></p>
                  <p>Valid Entries: <span className="text-green-400 font-mono">{cacheStats.validEntries}</span></p>
                  <p>Expired Entries: <span className="text-yellow-400 font-mono">{cacheStats.expiredEntries}</span></p>
                  <p>Cache Size: <span className="text-purple-400 font-mono">{cacheStats.cacheSize}</span></p>
                </div>
              </div>
            )}

            {/* Message */}
            {message && (
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <p className="text-blue-300 text-sm">{message}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={fetchCacheStats}
                disabled={loading}
                className="bg-slate-700 hover:bg-slate-600 text-white"
              >
                {loading ? "Loading..." : "Refresh Stats"}
              </Button>
              <Button
                onClick={clearCache}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? "Clearing..." : "Clear Cache"}
              </Button>
            </div>

            {/* Info Box */}
            <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 text-sm text-amber-300">
              <p className="font-semibold mb-2">Note:</p>
              <p>The cache expires automatically every 5 minutes. If you still see the unavailable page after clearing, it means your IP is not being detected as USA.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
