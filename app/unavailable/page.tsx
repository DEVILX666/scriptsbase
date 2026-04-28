"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UnavailablePage() {
  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-lg rounded-full"></div>
            <div className="relative bg-red-500/10 p-4 rounded-full border border-red-500/30">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-2">Service Unavailable</h1>

        {/* Status Message */}
        <p className="text-slate-400 mb-2">HTTP 503</p>

        {/* Description */}
        <p className="text-slate-300 mb-8 leading-relaxed">
          We&apos;re sorry, but this service is currently unavailable. Our team is working to
          restore it as quickly as possible. Please try again later.
        </p>

        {/* Status Details */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-slate-400 mb-1">Status: Maintenance Mode</p>
          <p className="text-sm text-slate-400">Last Check: {new Date().toLocaleString()}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleRefresh}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Go Back
          </Button>
        </div>

        {/* Support Note */}
        <p className="text-xs text-slate-500 mt-8">
          If the problem persists, please contact our support team at support@example.com
        </p>
      </div>
    </div>
  )
}
