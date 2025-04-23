import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">About Visionfy</h1>
            <p className="text-muted-foreground text-lg">
              We're on a mission to democratize creativity through AI-powered image generation.
            </p>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Visionfy was founded in 2023 by a team of AI researchers, artists, and developers who shared a common
                vision: to make advanced image generation technology accessible to everyone, regardless of their
                technical background.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a research project quickly evolved into a powerful platform that empowers creators,
                businesses, and individuals to bring their visual ideas to life with unprecedented ease and quality.
              </p>
              <p className="text-muted-foreground">
                Today, Visionfy serves thousands of users worldwide, from professional designers and marketing teams to
                hobbyists and students exploring the creative possibilities of AI.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden border shadow-lg">
              <Image
                src="/collaborative-workspace.png"
                alt="The Visionfy team"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Creativity Without Limits</h3>
                <p className="text-muted-foreground">
                  We believe everyone should have the tools to express their creative vision, regardless of their
                  artistic skills or technical knowledge.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Ethical Innovation</h3>
                <p className="text-muted-foreground">
                  We develop our technology responsibly, with built-in safeguards and transparent policies to ensure
                  ethical use of AI-generated content.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">User-Centered Design</h3>
                <p className="text-muted-foreground">
                  We prioritize intuitive, accessible experiences that make powerful technology feel simple and
                  delightful to use.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  We're committed to constantly refining our models, features, and user experience based on feedback and
                  emerging research.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Community Collaboration</h3>
                <p className="text-muted-foreground">
                  We foster a supportive community where users can share techniques, showcase their work, and inspire
                  each other.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  We strive to make our platform accessible to everyone through inclusive design and flexible pricing
                  options.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border">
                  <Image
                    src="/confident-executive.png"
                    alt="Sarah Chen, CEO"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Sarah Chen</h3>
                <p className="text-primary">CEO & Co-founder</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Former AI Research Lead at TechVision with 10+ years in machine learning and computer vision.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border">
                  <Image
                    src="/tech-leader-portrait.png"
                    alt="Michael Rodriguez, CTO"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Michael Rodriguez</h3>
                <p className="text-primary">CTO & Co-founder</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Previously led engineering at ImageAI, specializing in scalable ML infrastructure and diffusion
                  models.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border">
                  <Image
                    src="/confident-creative-director.png"
                    alt="Emily Johnson, Creative Director"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Emily Johnson</h3>
                <p className="text-primary">Creative Director</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Award-winning digital artist and UX designer with experience at leading creative agencies.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-muted-foreground mb-8">
              Be part of the creative revolution. Start generating amazing images with Visionfy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
