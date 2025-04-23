"use client"

import Link from "next/link"
import type { GenerationProject } from "@/lib/store/project-store"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { deleteGenerationProject } from "@/lib/store/project-store"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProjectCardProps {
  project: GenerationProject
  onDelete?: () => void
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    deleteGenerationProject(project.id)
    toast({
      title: "Project deleted",
      description: "The project has been permanently deleted",
    })
    if (onDelete) onDelete()
    setIsDeleteDialogOpen(false)
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
        <Link href={`/dashboard/create?project=${project.id}`} className="block h-full">
          <div className={cn("p-6 h-full flex flex-col", project.color)}>
            <div className="mb-auto">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">{project.title}</h3>
              <p className="text-white/80 text-sm mt-1">
                {project.imageCount} {project.imageCount === 1 ? "Idea" : "Ideas"}
              </p>
            </div>

            <div className="mt-4 flex gap-2 justify-start">
              {/* Show up to 3 thumbnail images in a row */}
              <div className="flex -space-x-4">
                <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-white/20 shadow-lg transform transition-transform group-hover:translate-x-0 group-hover:scale-105">
                  <img
                    src={project.thumbnailImage || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Add placeholder for additional images */}
                {project.imageCount > 1 && (
                  <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-white/20 shadow-lg transform transition-transform group-hover:translate-x-2 group-hover:scale-105 bg-black/30 backdrop-blur-sm">
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      +{project.imageCount - 1}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Delete button - only visible on hover */}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors opacity-0 group-hover:opacity-100"
          onClick={() => setIsDeleteDialogOpen(true)}
          aria-label="Delete project"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{project.title}" and all its associated data. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
