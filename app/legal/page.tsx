import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const legalDocuments = [
  {
    title: "Terms of Service",
    description: "The rules and guidelines for using Visionfy's services",
    path: "/legal/terms",
    lastUpdated: "January 15, 2025",
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
    path: "/legal/privacy",
    lastUpdated: "January 15, 2025",
  },
  {
    title: "Acceptable Use Policy",
    description: "Guidelines for appropriate use of our AI image generation services",
    path: "/legal/acceptable-use",
    lastUpdated: "January 15, 2025",
  },
  {
    title: "Copyright Policy",
    description: "Information about copyright ownership and intellectual property",
    path: "/legal/copyright",
    lastUpdated: "January 15, 2025",
  },
  {
    title: "Cookie Policy",
    description: "How we use cookies and similar technologies",
    path: "/legal/cookies",
    lastUpdated: "January 15, 2025",
  },
  {
    title: "Data Processing Agreement",
    description: "Terms for processing personal data in compliance with privacy laws",
    path: "/legal/data-processing",
    lastUpdated: "January 15, 2025",
  },
]

export default function LegalPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Legal Information</h1>
              <p className="text-muted-foreground text-lg">
                Important documents regarding your use of Visionfy's services
              </p>
            </div>

            <div className="grid gap-6">
              {legalDocuments.map((doc, index) => (
                <Link
                  key={index}
                  href={doc.path}
                  className="block p-6 border rounded-xl transition-all duration-300 hover:shadow-md hover:border-primary/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{doc.title}</h2>
                      <p className="text-muted-foreground">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Last updated: {doc.lastUpdated}</span>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 p-6 border rounded-xl bg-muted/30">
              <h2 className="text-xl font-semibold mb-4">Have Questions?</h2>
              <p className="text-muted-foreground mb-2">
                If you have any questions about our legal documents or need clarification, please don't hesitate to
                contact us.
              </p>
              <p className="text-muted-foreground">
                Email us at{" "}
                <a href="mailto:legal@visionfy.ai" className="text-primary hover:underline">
                  legal@visionfy.ai
                </a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
