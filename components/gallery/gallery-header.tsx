"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Grid3X3, Grid2X2, LayoutGrid, GridIcon } from "lucide-react"

export default function GalleryHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "large">("masonry")
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [gridDensity, setGridDensity] = useState<"compact" | "normal" | "spacious">("normal")

  const styles = [
    "Photorealistic",
    "Digital Art",
    "Oil Painting",
    "Watercolor",
    "Pixel Art",
    "3D Render",
    "Anime",
    "Sketch",
    "Comic",
    "Abstract",
  ]

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((current) => {
      if (current.includes(style)) {
        return current.filter((s) => s !== style)
      } else {
        return [...current, style]
      }
    })
  }

  // Dispatch event when view mode changes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("viewModeChange", {
        detail: { viewMode },
      }),
    )
  }, [viewMode])

  // Dispatch event when grid density changes
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("gridDensityChange", {
        detail: { gridDensity },
      }),
    )
  }, [gridDensity])

  return (
    <section className="container py-12 md:py-16 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Image Gallery</h1>
        <p className="text-muted-foreground text-lg">
          Explore stunning AI-generated images created with our platform. Get inspired and see what's possible.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by prompt or description..." className="pl-9 w-full" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
                {selectedStyles.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {selectedStyles.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Styles</p>
                {styles.map((style) => (
                  <DropdownMenuCheckboxItem
                    key={style}
                    checked={selectedStyles.includes(style)}
                    onCheckedChange={() => handleStyleToggle(style)}
                  >
                    {style}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Grid Density Control */}
          <Select
            value={gridDensity}
            onValueChange={(value) => setGridDensity(value as "compact" | "normal" | "spacious")}
          >
            <SelectTrigger className="w-[130px]">
              <GridIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Grid Density" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="spacious">Spacious</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${viewMode === "masonry" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("masonry")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Masonry view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${viewMode === "large" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("large")}
            >
              <Grid2X2 className="h-4 w-4" />
              <span className="sr-only">Large view</span>
            </Button>
          </div>
        </div>
      </div>

      {selectedStyles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in-50 slide-in-from-top-5">
          {selectedStyles.map((style) => (
            <div key={style} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
              {style}
              <button
                onClick={() => handleStyleToggle(style)}
                className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Remove {style}</span>
              </button>
            </div>
          ))}
          <button onClick={() => setSelectedStyles([])} className="text-sm text-muted-foreground hover:text-foreground">
            Clear all
          </button>
        </div>
      )}
    </section>
  )
}
