import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/components/auth/auth-provider"

export const metadata: Metadata = {
  title: "Authentication | Visiomancer",
  description: "Authentication pages for Visiomancer",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
