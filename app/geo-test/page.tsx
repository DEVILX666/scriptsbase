"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface DebugData {
  client: {
    ip: string
    country: string
    countryCode: string
    isUSA: boolean
  }
  testIP?: {
    ip: string
    country: string
    countryCode: string
    isUSA: boolean
  }
  cache: {
    totalEntries: number
    validEntries: number
    expiredEntries: number
    cacheSize: string
    cleanedEntries: number
  }
}

export default function GeoTestPage() {
  const [data, setData] = useState<DebugData | null>(null)
  const [loading, setLoading] = useState(false)
  const [testIP, setTestIP] = useState("")
  const [error, setError] = useState<string | null>(null)

  const fetchDebugData = async (ip?: string) => {
    setLoading(true)
    setError(null)

    try {
      const url = ip ? `/api/debug/geo?ip=${encodeURIComponent(ip)}` : "/api/debug/geo"
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch on component mount
    fetchDebugData()
  }, [])

  const handleTestIP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (testIP.trim()) {
      await fetchDebugData(testIP)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Geolocation Debug Console</h1>
          <p className="text-slate-400">Test the geo-restriction system (remove in production)</p>
        </div>

        {/* Current Client Info */}
        {data && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your IP Information</CardTitle>
              <CardDescription className="text-slate-400">Current client geolocation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-sm mb-1">IP Address</p>
                  <p className="text-white font-mono">{data.client.ip}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-sm mb-1">Country Code</p>
                  <p className="text-white font-mono">{data.client.countryCode}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-sm mb-1">Country</p>
                  <p className="text-white">{data.client.country}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-sm mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    {data.client.isUSA ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-500 font-semibold">USA Access Granted</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-500 font-semibold">Non-USA Blocked</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test IP Input */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Test Different IPs</CardTitle>
            <CardDescription className="text-slate-400">
              Enter an IP address to check its geolocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTestIP} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g., 8.8.8.8 (USA), 1.1.1.1 (Australia)"
                  value={testIP}
                  onChange={(e) => setTestIP(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button
                  type="submit"
                  disabled={loading || !testIP.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Test IP
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Test IPs: 8.8.8.8 (USA), 1.1.1.1 (Australia), 95.216.0.0 (Germany)
              </p>
            </form>

            {/* Test Result */}
            {data?.testIP && (
              <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <p className="text-slate-500 text-sm mb-3">Test Result:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-slate-600 text-xs mb-1">IP</p>
                    <p className="text-white font-mono text-sm">{data.testIP.ip}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs mb-1">Country</p>
                    <p className="text-white text-sm">{data.testIP.country}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs mb-1">Code</p>
                    <p className="text-white font-mono text-sm">{data.testIP.countryCode}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs mb-1">Access</p>
                    <p
                      className={`text-sm font-semibold ${
                        data.testIP.isUSA ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {data.testIP.isUSA ? "✓ Allowed" : "✗ Blocked"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cache Stats */}
        {data && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Cache Statistics</CardTitle>
              <CardDescription className="text-slate-400">
                Performance metrics for geolocation cache
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Total Entries</p>
                  <p className="text-white text-lg font-semibold">{data.cache.totalEntries}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Valid</p>
                  <p className="text-green-500 text-lg font-semibold">{data.cache.validEntries}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Expired</p>
                  <p className="text-red-500 text-lg font-semibold">{data.cache.expiredEntries}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Size</p>
                  <p className="text-blue-500 text-lg font-semibold">{data.cache.cacheSize}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-4">
                Cleaned expired entries: <span className="text-slate-400">{data.cache.cleanedEntries}</span>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="bg-red-950 border-red-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-400 font-semibold">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-3 text-slate-400">Fetching geolocation data...</span>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-yellow-950 border border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-200 text-sm">
            <strong>⚠️ Security Notice:</strong> This debug page should be removed or password-protected
            in production. It exposes your geolocation API and caching system.
          </p>
        </div>
      </div>
    </div>
  )
}
