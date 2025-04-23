import type { Metadata } from "next"
import GalleryHeader from "@/components/gallery/gallery-header"
import GalleryGrid from "@/components/gallery/gallery-grid"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Gallery | Visionfy",
  description: "Explore stunning AI-generated images created with Visionfy's advanced technology",
}

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen pt-16">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-pink-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <GalleryHeader />
          <GalleryGrid />
        </main>
        <Footer />
      </div>
    </div>
  )
}
