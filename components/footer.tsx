import Link from "next/link"
import { Github, Twitter, Instagram, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py:12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold flex items-center">
            Visi
            <Sparkles className="h-4 w-4 mx-0.5 text-primary" />
            nfy
          </h2>
          <p className="text-sm text-muted-foreground">AI-powered image generation for creators everywhere.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground transition-colors hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground transition-colors hover:text-primary">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/visiomancer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/visiomancer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/visiomancer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Visionfy, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
