export type GenerationProject = {
  id: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
  imageCount: number
  thumbnailImage: string
  color: string
  messages?: any[] // Store the conversation messages
}

// Available theme colors for project cards
export const projectColors = [
  "bg-purple-600", // Purple
  "bg-gray-600", // Gray
  "bg-emerald-700", // Green
  "bg-amber-700", // Amber
  "bg-blue-700", // Blue
  "bg-rose-700", // Rose
  "bg-indigo-700", // Indigo
  "bg-teal-700", // Teal
]

// Function to get a random color from the projectColors array
export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * projectColors.length)
  return projectColors[randomIndex]
}

// Function to save a generation project
export function saveGenerationProject(project: GenerationProject): void {
  // Get existing projects
  const existingProjects = getGenerationProjects()

  // Check if project already exists
  const existingIndex = existingProjects.findIndex((p) => p.id === project.id)

  if (existingIndex >= 0) {
    // Update existing project
    existingProjects[existingIndex] = {
      ...existingProjects[existingIndex],
      ...project,
      updatedAt: new Date().toISOString(),
    }
  } else {
    // Add new project to the beginning of the array (most recent first)
    existingProjects.unshift(project)
  }

  // Save to localStorage
  localStorage.setItem("visionfy_generation_projects", JSON.stringify(existingProjects))

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event("generationProjectsUpdated"))
}

// Function to get all generation projects
export function getGenerationProjects(): GenerationProject[] {
  try {
    const storedProjects = localStorage.getItem("visionfy_generation_projects")
    return storedProjects ? JSON.parse(storedProjects) : []
  } catch (error) {
    console.error("Error retrieving generation projects:", error)
    return []
  }
}

// Function to get a specific project by ID
export function getGenerationProject(id: string): GenerationProject | null {
  const projects = getGenerationProjects()
  return projects.find((project) => project.id === id) || null
}

// Function to delete a generation project
export function deleteGenerationProject(id: string): void {
  const existingProjects = getGenerationProjects()
  const updatedProjects = existingProjects.filter((project) => project.id !== id)
  localStorage.setItem("visionfy_generation_projects", JSON.stringify(updatedProjects))

  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event("generationProjectsUpdated"))
}

// Function to extract a title from a prompt
export function extractTitleFromPrompt(prompt: string): string {
  // If prompt is empty, return a default title
  if (!prompt || prompt.trim() === "") {
    return "Untitled Project"
  }

  // Get the first 4-5 words or up to 30 characters
  const words = prompt.split(" ")
  let title = words.slice(0, 4).join(" ")

  // If title is too short, add more words
  if (title.length < 20 && words.length > 4) {
    title = words.slice(0, 5).join(" ")
  }

  // If title is too long, truncate it
  if (title.length > 30) {
    title = title.substring(0, 30).trim() + "..."
  } else if (words.length > 5) {
    title += "..."
  }

  return title.charAt(0).toUpperCase() + title.slice(1)
}
