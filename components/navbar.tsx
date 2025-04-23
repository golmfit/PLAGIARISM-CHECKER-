"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center">
          <span className="font-bold text-lg flex items-center">
            Visi
            <Sparkles className="h-4 w-4 mx-0.5 text-primary" />
            nfy
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/visions" className="transition-colors hover:text-primary flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Visions</span>
          </Link>
          <Link href="/#features" className="transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-primary">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="https://github.com/visiomancer" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
