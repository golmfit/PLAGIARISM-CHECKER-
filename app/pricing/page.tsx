"use client"

import { useState } from "react"

import { useEffect } from "react"
import PricingPlans from "@/components/pricing-plans"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Check if we should show the dashboard return button
  useEffect(() => {
    // Always show the dashboard return button on this page
    const dashboardReturnElement = document.getElementById("dashboard-return")
    if (dashboardReturnElement) {
      dashboardReturnElement.classList.remove("hidden")
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <main className="pt-8 pb-16">
          {/* Dashboard return button */}
          <div className="container mb-8">
            <div id="dashboard-return" className="hidden">
              <a href="/dashboard" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </a>
              {isLoading && <div className="mt-2 text-sm text-muted-foreground">Loading...</div>}
            </div>
          </div>

          {/* Pricing content */}
          <PricingPlans />

          {/* Additional CTA */}
          <div className="container my-20">
            <div className="bg-muted/30 border rounded-xl p-8 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-muted-foreground mb-6">
                Contact our sales team for enterprise plans, custom integrations, or special requirements.
              </p>
              <Button size="lg">Contact Sales</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
