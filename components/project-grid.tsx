"use client"

import { useEffect, useState } from "react"
import { getGenerationProjects, type GenerationProject } from "@/lib/store/project-store"
import ProjectCard from "./project-card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ProjectGrid() {
  const [projects, setProjects] = useState<GenerationProject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load projects on initial render
    loadProjects()

    // Listen for updates to projects
    const handleProjectsUpdated = () => {
      loadProjects()
    }

    window.addEventListener("generationProjectsUpdated", handleProjectsUpdated)

    return () => {
      window.removeEventListener("generationProjectsUpdated", handleProjectsUpdated)
    }
  }, [])

  const loadProjects = () => {
    setIsLoading(true)
    const loadedProjects = getGenerationProjects()
    setProjects(loadedProjects)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-xl"></div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No projects yet. Start creating!</p>
        <Link
          href="/dashboard/create?new=true"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* New Project Card */}
      <Link
        href="/dashboard/create?new=true"
        className="group flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-6 text-center hover:bg-muted transition-colors"
      >
        <div className="rounded-full bg-background p-3 mb-3">
          <PlusCircle className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-medium mb-1">New Project</h3>
        <p className="text-sm text-muted-foreground">Start a new generation</p>
      </Link>

      {/* Project Cards */}
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={loadProjects} />
      ))}
    </div>
  )
}
