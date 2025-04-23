import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dreamscape | Visionfy",
  description: "Explore ethereal AI-generated dreamscapes and visual journeys",
}

// Sample dreamscape categories
const categories = ["All", "Ethereal", "Surreal", "Cosmic", "Fantasy", "Abstract", "Futuristic", "Mystical"]

// Sample dreamscape images with metadata
const dreamscapes = [
  {
    id: "dream-1",
    title: "Celestial Gardens",
    creator: "DreamWeaver",
    image: "/Lumina Isles.png",
    category: "Ethereal",
  },
  {
    id: "dream-2",
    title: "Crystal Memories",
    creator: "MindScape",
    image: "/Chronoscape Reflections.png",
    category: "Surreal",
  },
  {
    id: "dream-3",
    title: "Nebula Whispers",
    creator: "StarGazer",
    image: "/cosmic-whispers.png",
    category: "Cosmic",
  },
  {
    id: "dream-4",
    title: "Ancient Guardians",
    creator: "MythMaker",
    image: "/Rune-Guardians of the Forgotten Pass.png",
    category: "Fantasy",
  },
  {
    id: "dream-5",
    title: "Thought Patterns",
    creator: "NeuralArtist",
    image: "/Mindstream.png",
    category: "Abstract",
  },
  {
    id: "dream-6",
    title: "Neo-Tokyo Dreams",
    creator: "CyberMind",
    image: "/neo-tokyo-dreams.png",
    category: "Futuristic",
  },
  {
    id: "dream-7",
    title: "Enchanted Forest",
    creator: "WonderWeaver",
    image: "/enchanted-forest.png",
    category: "Mystical",
  },
  {
    id: "dream-8",
    title: "Ocean of Stars",
    creator: "CosmicDreamer",
    image: "/ocean-of-stars.png",
    category: "Cosmic",
  },
  {
    id: "dream-9",
    title: "Memory Palace",
    creator: "MindArchitect",
    image: "/memory-palace.png",
    category: "Surreal",
  },
  {
    id: "dream-10",
    title: "Crystal Caverns",
    creator: "GemSculptor",
    image: "/crystal-caverns.png",
    category: "Fantasy",
  },
  {
    id: "dream-11",
    title: "Digital Consciousness",
    creator: "ByteDreamer",
    image: "/digital-consciousness.png",
    category: "Abstract",
  },
  {
    id: "dream-12",
    title: "Astral Projection",
    creator: "SoulJourney",
    image: "/astral-projection.png",
    category: "Ethereal",
  },
]

export default function DreamscapePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 h-[800px] w-[800px] bg-purple-500/10 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] bg-pink-500/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="container pt-32 pb-20">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Explore AI Dreamscapes</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Journey Through Dreamscapes
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore extraordinary visual worlds created by AI, where imagination knows no bounds and dreams become
              visible.
            </p>
          </div>

          {/* Featured Dreamscape */}
          <div className="mb-16 relative rounded-xl overflow-hidden border group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 z-10" />
            <img
              src="/astral-projection.png"
              alt="Featured Dreamscape"
              className="w-full h-[500px] object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold text-white mb-2">Astral Journeys</h2>
                <p className="text-white/90 mb-4 max-w-2xl">
                  Experience the sensation of consciousness beyond the physical form, where spirit and cosmos merge in a
                  dance of ethereal energy.
                </p>
                <Button className="group">
                  Explore Featured Dreamscapes
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Dreamscape Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dreamscapes.map((dream) => (
              <div key={dream.id} className="group relative rounded-lg overflow-hidden border">
                <img
                  src={dream.image || "/placeholder.svg"}
                  alt={dream.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div>
                    <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs mb-2">
                      {dream.category}
                    </span>
                    <h3 className="text-white text-xl font-bold">{dream.title}</h3>
                    <p className="text-white/80 text-sm">Created by {dream.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border">
              <h2 className="text-2xl font-bold mb-4">Create Your Own Dreamscape</h2>
              <p className="text-muted-foreground mb-6">
                Let your imagination run wild and create your own stunning dreamscapes with our AI-powered tools.
              </p>
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  Start Creating
                  <Sparkles className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
