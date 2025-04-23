"use client"

import { useState } from "react"
import { Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

// Plan type definition
type PlanFeature = {
  name: string
  included: boolean | string
  tooltip?: string
}

type Plan = {
  id: string
  name: string
  price: string
  description: string
  features: PlanFeature[]
  popular?: boolean
}

// Simplified plans array without colors and icons
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Try out our platform with no commitment",
    features: [
      { name: "5 image generations per month", included: true },
      { name: "Standard resolution (1024×1024)", included: true },
      { name: "Basic editing tools", included: true },
      { name: "Community access", included: true },
      { name: "Watermarked downloads", included: true },
      { name: "Priority generation queue", included: false },
      { name: "Advanced prompt tools", included: false },
      { name: "Team sharing", included: false },
      { name: "Commercial usage rights", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "$4.99",
    description: "Perfect for hobbyists and casual creators",
    features: [
      { name: "50 image generations per month", included: true },
      { name: "Standard resolution (1024×1024)", included: true },
      { name: "Basic editing tools", included: true },
      { name: "Community access", included: true },
      { name: "No watermarks", included: true },
      { name: "Priority generation queue", included: false },
      { name: "Advanced prompt tools", included: false },
      { name: "Team sharing", included: false },
      { name: "Commercial usage rights", included: "Limited" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$24.99",
    description: "Ideal for content creators and artists",
    popular: true,
    features: [
      {
        name: "200 image generations per month",
        included: true,
        tooltip: "Generate up to 200 high-quality AI images each month",
      },
      {
        name: "Mix of standard and high resolution",
        included: true,
        tooltip: "150 standard (1024×1024) and 50 high-res (1024×1792) images",
      },
      { name: "Advanced editing tools", included: true },
      { name: "Community access", included: true },
      { name: "No watermarks", included: true },
      { name: "Priority generation queue", included: true },
      {
        name: "Advanced prompt tools",
        included: true,
        tooltip: "Prompt history, templates, and AI-assisted prompt enhancement",
      },
      {
        name: "Team sharing",
        included: "Up to 3 users",
        tooltip: "Collaborate with team members on projects",
      },
      { name: "Commercial usage rights", included: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$79.99",
    description: "For professional studios and businesses",
    features: [
      { name: "500 image generations per month", included: true },
      {
        name: "Unlimited high resolution images",
        included: true,
        tooltip: "Use your entire quota for high-res (1024×1792) images if needed",
      },
      { name: "Advanced editing tools", included: true },
      { name: "Community access", included: true },
      { name: "No watermarks", included: true },
      { name: "Priority generation queue", included: true },
      { name: "Advanced prompt tools", included: true },
      {
        name: "Team sharing",
        included: "Up to 10 users",
        tooltip: "Collaborate with up to 10 team members on projects",
      },
      { name: "Commercial usage rights", included: true },
      {
        name: "API access",
        included: "Limited",
        tooltip: "Programmatic access with custom rate limits",
      },
      { name: "Dedicated account manager", included: true },
      {
        name: "White-labeling options",
        included: true,
        tooltip: "Custom branding for your organization",
      },
    ],
  },
]

interface ChangePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPlan: string
}

export default function ChangePlanModal({ open, onOpenChange, currentPlan }: ChangePlanModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePlanChange = () => {
    if (!selectedPlan) {
      toast({
        title: "No plan selected",
        description: "Please select a plan to continue",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call to change plan
    setTimeout(() => {
      setIsProcessing(false)
      onOpenChange(false)

      toast({
        title: "Plan updated successfully",
        description: `Your subscription has been updated to the ${plans.find((p) => p.id === selectedPlan)?.name} plan.`,
      })

      // Reset selected plan
      setSelectedPlan(null)
    }, 1500)
  }

  // Calculate annual price (20% discount)
  const getAnnualPrice = (monthlyPrice: string) => {
    const price = Number.parseFloat(monthlyPrice.replace("$", ""))
    if (isNaN(price) || price === 0) return monthlyPrice
    const annualPrice = (price * 12 * 0.8).toFixed(2)
    return `$${annualPrice}`
  }

  // Function to handle viewing detailed pricing
  const handleViewPricing = () => {
    // Open the pricing page in a new tab
    const pricingWindow = window.open("/pricing", "_blank")

    // If the window opened successfully, we can try to show the dashboard return button
    if (pricingWindow) {
      // Use localStorage to communicate with the new window
      localStorage.setItem("showDashboardReturn", "true")
    }

    // Close the modal
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-4 rounded-lg">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-base">Change Plan</DialogTitle>
          <DialogDescription className="text-xs">Select a new plan below.</DialogDescription>
        </DialogHeader>

        {/* Compact billing toggle */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center bg-muted/50 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-2 py-1 rounded-full ${billingCycle === "monthly" ? "bg-background shadow-sm" : ""}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-2 py-1 rounded-full ${billingCycle === "annual" ? "bg-background shadow-sm" : ""}`}
            >
              Annual (-20%)
            </button>
          </div>
        </div>

        {/* Link to pricing page */}
        <div className="text-center mb-3">
          <a
            href="/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-primary hover:underline"
            onClick={() => {
              // Set a flag to show we're coming from the dashboard
              localStorage.setItem("showDashboardReturn", "true")
              // Close the modal
              onOpenChange(false)
            }}
          >
            View detailed plan features
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>

        {/* Compact plan selection */}
        <div className="space-y-2 mb-3">
          {plans.map((plan) => {
            const isCurrentPlan = plan.name.toLowerCase() === currentPlan.toLowerCase()
            const isPlanSelected = selectedPlan === plan.id

            return (
              <div
                key={plan.id}
                className={`flex items-center justify-between p-2 rounded border ${
                  isPlanSelected
                    ? "border-primary bg-primary/5"
                    : isCurrentPlan
                      ? "border-muted-foreground/30"
                      : "border-border/50"
                } cursor-pointer`}
                onClick={() => !isCurrentPlan && setSelectedPlan(plan.id)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{plan.name}</span>
                    {plan.popular && (
                      <span className="text-[10px] px-1 bg-primary/10 text-primary rounded">Popular</span>
                    )}
                    {isCurrentPlan && (
                      <span className="text-[10px] px-1 bg-muted text-muted-foreground rounded">Current</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {billingCycle === "annual" ? `$${getAnnualPrice(plan.price)}/year` : `${plan.price}/month`}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  {isPlanSelected ? (
                    <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : !isCurrentPlan ? (
                    <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t text-xs">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handlePlanChange} disabled={!selectedPlan || isProcessing}>
            {isProcessing ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing
              </span>
            ) : (
              "Change Plan"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
