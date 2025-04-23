"use client"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import FeaturesSection from "@/components/features-section"
import FeatureDemos from "@/components/feature-demos"
import PricingPlans from "@/components/pricing-plans"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import React from "react"

export default function Home() {
  // Add this useEffect at the beginning of the component
  React.useEffect(() => {
    // Check if we should scroll to pricing section
    const shouldScrollToPricing = localStorage.getItem("scrollToPricing") === "true"

    if (shouldScrollToPricing) {
      // Clear the flag
      localStorage.removeItem("scrollToPricing")

      // Find the pricing section and scroll to it
      const pricingSection = document.getElementById("pricing")
      if (pricingSection) {
        setTimeout(() => {
          pricingSection.scrollIntoView({ behavior: "smooth" })
        }, 500) // Small delay to ensure the page is fully loaded
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Single unified background for the entire page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturesSection />
        <FeatureDemos />
        <section id="pricing">
          <PricingPlans />
        </section>
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
