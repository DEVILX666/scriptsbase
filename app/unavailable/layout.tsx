import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Unavailable",
  description: "The service is currently unavailable.",
}

export default function UnavailableLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
