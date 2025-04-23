"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ImageIcon,
  Sparkles,
  ListPlus,
  Copy,
  Edit,
  RefreshCw,
  X,
  Check,
  Bookmark,
  Download,
  AlertTriangle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useFavorites, type SavedImage } from "@/components/favorites/favorites-provider"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { Playfair_Display } from "next/font/google"
import { saveGeneratedImage } from "@/lib/store/image-store"
import { useSearchParams } from "next/navigation"
import ProjectGrid from "@/components/project-grid"
import {
  saveGenerationProject,
  getGenerationProject,
  extractTitleFromPrompt,
  getRandomColor,
} from "@/lib/store/project-store"
import LoadingSpinner from "@/components/loading-spinner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Suggestion categories and options
const promptSuggestions = [
  {
    category: "SHOT",
    options: ["establishing", "pov", "wide", "full body", "medium", "closeup", "extreme closeup", "over the shoulder"],
  },
  {
    category: "CAMERA ANGLE",
    options: [
      "low angle",
      "high angle",
      "ground level",
      "overhead",
      "aerial shot",
      "drone shot",
      "birds eye view",
      "wide angle",
      "fisheye lens",
    ],
  },
  {
    category: "STYLE",
    options: [
      "photorealistic",
      "anime",
      "3d animation",
      "surreal",
      "3d render",
      "pixel art",
      "illustration",
      "digital art",
      "graphic design",
      "claymation",
    ],
  },
  {
    category: "LIGHTING",
    options: [
      "natural light",
      "studio lighting",
      "dramatic",
      "soft light",
      "hard light",
      "backlit",
      "neon",
      "cinematic",
      "golden hour",
      "blue hour",
    ],
  },
]

// Message type definition
type Message = {
  id: string
  type: "prompt" | "response"
  content: string
  images?: string[]
  aspectRatio: string
  timestamp: Date
  isEditing?: boolean
  isGenerating?: boolean
  keywords?: string[] // Add this line to track keywords
  uploadedImages?: string[]
}

// CharacterWarning component
const CharacterWarningComponent = ({
  characterCount,
  characterLimit,
}: {
  characterCount: number
  characterLimit: number
}) => {
  const remaining = characterLimit - characterCount
  const isOverLimit = characterCount > characterLimit

  return (
    <div
      className={`absolute top-0 left-0 w-full text-center text-xs font-medium ${
        isOverLimit ? "text-red-500" : "text-yellow-500"
      }`}
    >
      {isOverLimit ? `Character limit exceeded by ${Math.abs(remaining)}` : `${remaining} characters remaining`}
    </div>
  )
}

export default function CreatePage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project")
  const isNewProject = searchParams.get("new") === "true"

  const [showProjectGrid, setShowProjectGrid] = useState(!projectId && !isNewProject)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [messages, setMessages] = useState<Message[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [inputBoxWidth, setInputBoxWidth] = useState(0)
  const [keywords, setKeywords] = useState<string[]>([])
  // Add a new state for tracking character count and limit warning
  const [characterCount, setCharacterCount] = useState(0)
  const CHARACTER_LIMIT = 1950
  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; file: File; preview: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Add these new state variables after the existing state declarations
  const [isDragging, setIsDragging] = useState(false)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()
  const { isSaved, toggleSave } = useFavorites()

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const suggestionsButtonRef = useRef<HTMLButtonElement>(null)
  const inputBoxRef = useRef<HTMLDivElement>(null)
  const uploadButtonRef = useRef<HTMLButtonElement>(null)
  const generateButtonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Load project data if projectId is provided
  useEffect(() => {
    if (projectId) {
      const project = getGenerationProject(projectId)
      if (project) {
        setCurrentProjectId(projectId)
        setShowProjectGrid(false)

        // If project has messages, restore them
        if (project.messages && project.messages.length > 0) {
          setMessages(project.messages)
        }
      } else {
        // If project not found, show project grid
        setShowProjectGrid(true)
      }
    } else if (isNewProject) {
      // If it's a new project, generate a new ID and show the creation interface
      setCurrentProjectId(`project_${Date.now()}`)
      setShowProjectGrid(false)
      setMessages([])
    } else {
      // If no project ID and not a new project, show project grid
      setShowProjectGrid(true)
    }
  }, [projectId, isNewProject])

  // Function to trigger jiggle animation
  const triggerJiggle = () => {
    if (inputBoxRef.current) {
      console.log("Triggering jiggle animation")

      // Remove any existing animation
      inputBoxRef.current.classList.remove("animate-jiggle")

      // Force a reflow (repaint) to ensure the animation restarts
      void inputBoxRef.current.offsetWidth

      // Add the animation class
      inputBoxRef.current.classList.add("animate-jiggle")

      // Remove the animation class after it completes
      setTimeout(() => {
        if (inputBoxRef.current) {
          inputBoxRef.current.classList.remove("animate-jiggle")
        }
      }, 800) // Match the CSS animation duration of 0.8s
    } else {
      console.log("Input box ref is null")
    }
  }

  // Update input box width when it changes
  useEffect(() => {
    const updateInputBoxWidth = () => {
      if (inputBoxRef.current) {
        setInputBoxWidth(inputBoxRef.current.offsetWidth)
      }
    }

    // Initial measurement
    updateInputBoxWidth()

    // Set up resize observer to track changes
    const resizeObserver = new ResizeObserver(updateInputBoxWidth)
    if (inputBoxRef.current) {
      resizeObserver.observe(inputBoxRef.current)
    }

    // Clean up
    return () => {
      if (inputBoxRef.current) {
        resizeObserver.unobserve(inputBoxRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [])

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto"

    // Set the height to scrollHeight to expand the textarea
    const newHeight = Math.min(textarea.scrollHeight, 120) // Max height of 120px
    textarea.style.height = `${newHeight}px`

    // Check if scrollbar should be shown
    setShowScrollbar(textarea.scrollHeight > 120)
  }, [prompt])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Close suggestions panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking the suggestions button itself
      if (suggestionsButtonRef.current && suggestionsButtonRef.current.contains(event.target as Node)) {
        return
      }

      // Close if clicking outside the suggestions panel
      if (showSuggestions && suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  // Add a useEffect to update the warning position when the input box changes
  // Add this after the other useEffect hooks (around line 120)

  // Add this new useEffect for dynamic positioning
  useEffect(() => {
    // Function to update warning position based on input box
    const updateWarningPosition = () => {
      if (characterCount > CHARACTER_LIMIT && inputBoxRef.current) {
        // Force a re-render to update the warning position
        setInputBoxWidth(inputBoxRef.current.offsetWidth)
      }
    }

    // Call initially
    updateWarningPosition()

    // Set up a resize observer to track changes to the input box
    const resizeObserver = new ResizeObserver(updateWarningPosition)
    if (inputBoxRef.current) {
      resizeObserver.observe(inputBoxRef.current)
    }

    // Clean up
    return () => {
      if (inputBoxRef.current) {
        resizeObserver.unobserve(inputBoxRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [characterCount, CHARACTER_LIMIT])

  // Add this to the top of the file with other useEffect hooks
  useEffect(() => {
    // Mark that the user has interacted with the page (for audio autoplay)
    const markUserInteraction = () => {
      document.documentElement.setAttribute("data-user-interacted", "true")
    }

    // Add event listeners for common user interactions
    document.addEventListener("click", markUserInteraction)
    document.addEventListener("keydown", markUserInteraction)

    return () => {
      document.removeEventListener("click", markUserInteraction)
      document.removeEventListener("keydown", markUserInteraction)
    }
  }, [])

  // Update the addSuggestionToPrompt function to check character limit
  const addSuggestionToPrompt = (suggestion: string) => {
    // Calculate new total length if we add this keyword
    const newKeywords = [...keywords, suggestion]
    const totalLength = prompt.length + (newKeywords.length > 0 ? newKeywords.join(", ").length + 1 : 0)

    // Only add if we're under the limit
    if (totalLength <= CHARACTER_LIMIT) {
      // Add the suggestion as a keyword
      if (!keywords.includes(suggestion)) {
        setKeywords(newKeywords)
        setCharacterCount(totalLength)
      }
    }

    // Focus the textarea after adding
    textareaRef.current?.focus()
  }

  // Update the removeKeyword function to recalculate character count
  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter((keyword) => keyword !== keywordToRemove)
    setKeywords(newKeywords)

    // Recalculate character count
    const totalLength = prompt.length + (newKeywords.length > 0 ? newKeywords.join(", ").length + 1 : 0)
    setCharacterCount(totalLength)

    textareaRef.current?.focus()
  }

  // Function to handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      }))

      setUploadedImages((prev) => [...prev, ...newImages])

      // Reset the input value so the same file can be selected again
      e.target.value = ""
    }
  }

  // Function to remove an uploaded image
  const removeUploadedImage = (id: string) => {
    setUploadedImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      // Revoke object URLs to avoid memory leaks
      const imageToRemove = prev.find((img) => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return filtered
    })
  }

  // Function to trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => {
        URL.revokeObjectURL(img.preview)
      })
    }
  }, [uploadedImages])

  // Save project data when messages change
  useEffect(() => {
    if (currentProjectId && messages.length > 0) {
      // Find the first prompt message to use as title
      const firstPromptMessage = messages.find((msg) => msg.type === "prompt")

      // Find the first response message with images to use as thumbnail
      const firstResponseWithImages = messages.find(
        (msg) => msg.type === "response" && msg.images && msg.images.length > 0,
      )

      if (firstPromptMessage && firstResponseWithImages?.images) {
        // Count total number of generated images
        const imageCount = messages
          .filter((msg) => msg.type === "response" && msg.images)
          .reduce((count, msg) => count + (msg.images?.length || 0), 0)

        // Handle timestamp - it could be a Date object or a string
        let createdAtIso: string
        if (firstPromptMessage.timestamp instanceof Date) {
          createdAtIso = firstPromptMessage.timestamp.toISOString()
        } else if (typeof firstPromptMessage.timestamp === "string") {
          createdAtIso = firstPromptMessage.timestamp
        } else {
          createdAtIso = new Date().toISOString()
        }

        // Create project data
        saveGenerationProject({
          id: currentProjectId,
          title: extractTitleFromPrompt(firstPromptMessage.content),
          createdAt: createdAtIso,
          updatedAt: new Date().toISOString(),
          imageCount,
          thumbnailImage: firstResponseWithImages.images[0],
          color: getRandomColor(),
          messages: messages,
        })
      }
    }
  }, [messages, currentProjectId])

  // Update the handleGenerate function to check character limit
  const handleGenerate = async () => {
    // Combine the prompt text with keywords
    const fullPrompt = keywords.length > 0 ? `${prompt.trim()} ${keywords.join(", ")}` : prompt.trim()

    if (!fullPrompt && uploadedImages.length === 0) {
      // Only trigger jiggle animation if the prompt is empty and no images
      triggerJiggle()
      return
    }

    // Check if the prompt exceeds character limit
    if (fullPrompt.length > CHARACTER_LIMIT) {
      return
    }

    // Add user prompt to messages
    const messageId = Date.now().toString()
    const newMessage: Message = {
      id: messageId,
      type: "prompt",
      content: fullPrompt,
      aspectRatio,
      timestamp: new Date(),
      keywords: [...keywords], // Store the keywords with the message
      uploadedImages: uploadedImages.map((img) => img.preview), // Include uploaded images
    }

    // Add a loading response message
    const responseId = (Date.now() + 1).toString()
    const responseMessage: Message = {
      id: responseId,
      type: "response",
      content: "",
      aspectRatio,
      timestamp: new Date(),
      isGenerating: true,
    }

    setMessages([...messages, newMessage, responseMessage])
    setIsGenerating(true)
    setPrompt("")
    setKeywords([]) // Clear keywords after generating
    setUploadedImages([]) // Clear uploaded images after generating

    // Scroll to the generating message
    setTimeout(() => {
      const generatingElement = document.getElementById(responseId)
      if (generatingElement) {
        generatingElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)

    try {
      // Get the correct size format based on aspect ratio
      const sizeFormat = getOpenAISize(aspectRatio)

      console.log("Sending request with size:", sizeFormat)

      // Call the API to generate images
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          options: {
            size: sizeFormat,
            quality: "standard",
            style: "vivid",
            n: 1, // DALL-E 3 only supports 1 image per request
          },
        }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        let errorData
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
        } else {
          const errorText = await response.text()
          errorData = { error: errorText }
        }
        throw new Error(errorData.error || "Failed to generate images")
      }

      const data = await response.json()
      const generatedImages = data.images

      // Update the response message with generated images
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === responseId ? { ...msg, images: generatedImages, isGenerating: false } : msg,
        ),
      )

      // Store each generated image in our image store
      generatedImages.forEach((imageSrc, index) => {
        saveGeneratedImage({
          id: `gen_${Date.now()}_${index}`,
          src: imageSrc,
          prompt: fullPrompt,
          aspectRatio,
          timestamp: new Date().toISOString(),
          style: "AI Generated",
          author: "You",
          likes: 0,
          isLiked: false,
        })
      })

      // Play a subtle sound when generation is complete (if user has interacted with the page)
      try {
        if (document.documentElement.hasAttribute("data-user-interacted")) {
          const audio = new Audio("/sounds/generation-complete.mp3")
          audio.volume = 0.2
          await audio.play()
        }
      } catch (soundError) {
        // Ignore sound errors - they're non-critical
        console.log("Sound couldn't be played, likely due to browser autoplay restrictions")
      }
    } catch (error) {
      console.error("Error generating images:", error)
      // Remove the loading response message on error
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== responseId))

      toast({
        title: "Error generating images",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyPrompt = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Prompt has been copied to clipboard",
          duration: 3000,
        })
      })
      .catch((err) => {
        console.error("Failed to copy prompt: ", err)
      })
  }

  const handleEditPrompt = (id: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, isEditing: true } : message)))
  }

  const handleUpdatePrompt = (id: string, newContent: string) => {
    setMessages(
      messages.map((message) => (message.id === id ? { ...message, content: newContent, isEditing: false } : message)),
    )
  }

  const handleCancelEdit = (id: string) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, isEditing: false } : message)))
  }

  // Helper function to convert aspect ratio to OpenAI size format
  const getOpenAISize = (aspectRatio: string): string => {
    switch (aspectRatio) {
      case "1:1":
        return "1024x1024"
      case "16:9":
        return "1792x1024" // Landscape format
      case "9:16":
        return "1024x1792" // Portrait format
      case "4:3":
        return "1024x768" // Not directly supported by DALL-E 3, will use closest match
      default:
        return "1024x1024" // Default to square
    }
  }

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions)
  }

  const handleSaveImage = (imageUrl: string, promptContent: string) => {
    const imageId = `img_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    const imageToSave: SavedImage = {
      id: imageId,
      src: imageUrl,
      prompt: promptContent,
      createdAt: new Date().toISOString(),
    }

    toggleSave(imageToSave)

    toast({
      title: isSaved(imageId) ? "Image removed from saved" : "Image saved to collection",
      description: isSaved(imageId)
        ? "The image has been removed from your collection"
        : "The image has been added to your collection",
      duration: 3000,
    })
  }

  const handleDownloadImage = (imageUrl: string) => {
    // In a real app, this would download the actual image
    // For now, just show a toast notification
    toast({
      title: "Downloading image",
      description: "Your image download has started",
      duration: 3000,
    })
  }

  // Get suggestion panel background based on theme
  const getSuggestionPanelBackground = () => {
    if (theme === "dark") {
      return "bg-black/90 border-gray-800"
    } else {
      return "bg-white/90 border-gray-200"
    }
  }

  // Get suggestion button background based on theme
  const getSuggestionButtonBackground = () => {
    if (theme === "dark") {
      return "bg-gray-800/70 hover:bg-gray-700/70 text-gray-200"
    } else {
      return "bg-gray-200/70 hover:bg-gray-300/70 text-gray-800"
    }
  }

  // Get suggestion category text color based on theme
  const getSuggestionCategoryColor = () => {
    if (theme === "dark") {
      return "text-gray-400"
    } else {
      return "text-gray-600"
    }
  }

  // Update the prompt change handler to track character count
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value
    setPrompt(newPrompt)

    // Calculate total character count including keywords
    const totalLength = newPrompt.length + (keywords.length > 0 ? keywords.join(", ").length + 2 : 0)
    setCharacterCount(totalLength)

    // Auto-resize
    e.target.style.height = "auto"
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`

    // Check if scrollbar should be shown
    setShowScrollbar(e.target.scrollHeight > 120)
  }

  // Add these new event handlers after the existing handler functions
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // Only set isDragging to false if we're leaving the dropzone itself, not its children
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      if (files.length > 0) {
        const newImages = files.map((file) => ({
          id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview: URL.createObjectURL(file),
        }))

        setUploadedImages((prev) => [...prev, ...newImages])

        // Show toast notification for successful upload
        toast({
          title: `${files.length} ${files.length === 1 ? "image" : "images"} uploaded`,
          description: "Your images have been added to the prompt",
          duration: 3000,
        })
      } else {
        // Show toast notification for invalid files
        toast({
          title: "Invalid files",
          description: "Please drop image files only",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }

  // Handle clipboard paste events
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Check if we're pasting into an input field or textarea
      const activeElement = document.activeElement
      const isInputActive = activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement

      // If we're pasting into an input field and it's not our textarea, don't handle it
      if (isInputActive && activeElement !== textareaRef.current) {
        return
      }

      // Check if the clipboard has any images
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items

        let imageFound = false

        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            imageFound = true

            // Get the image as a file
            const file = items[i].getAsFile()
            if (file) {
              // Create a unique ID
              const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

              // Create a preview URL
              const preview = URL.createObjectURL(file)

              // Add the image to the uploadedImages state
              setUploadedImages((prev) => [...prev, { id: imageId, file, preview }])

              // Show a toast notification
              toast({
                title: "Image pasted",
                description: "The image has been added to your prompt",
                duration: 3000,
              })
            }
          }
        }

        // If we found and processed an image, prevent the default paste behavior
        if (imageFound) {
          e.preventDefault()
        }
      }
    }

    // Add the event listener
    document.addEventListener("paste", handlePaste)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("paste", handlePaste)
    }
  }, [])

  const handleRegenerateFromPromptApi = async (promptMessage: Message) => {
    // Find the index of the prompt message
    const promptIndex = messages.findIndex((m) => m.id === promptMessage.id)
    if (promptIndex === -1) return

    // Remove the old response if it exists
    const updatedMessages = [...messages]
    if (promptIndex + 1 < messages.length && messages[promptIndex + 1].type === "response") {
      updatedMessages.splice(promptIndex + 1, 1)
    }

    // Add a new loading response message
    const responseId = Date.now().toString()
    const responseMessage: Message = {
      id: responseId,
      type: "response",
      content: "",
      aspectRatio: promptMessage.aspectRatio,
      timestamp: new Date(),
      isGenerating: true,
    }

    updatedMessages.splice(promptIndex + 1, 0, responseMessage)
    setMessages(updatedMessages)
    setIsGenerating(true)

    // Scroll to the generating message
    setTimeout(() => {
      const generatingElement = document.getElementById(responseId)
      if (generatingElement) {
        generatingElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)

    try {
      // Call the API to generate images
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptMessage.content,
          options: {
            size: getOpenAISize(promptMessage.aspectRatio),
            quality: "standard",
            style: "vivid",
            n: 4, // Generate 4 images
          },
        }),
      })

      if (!response.ok) {
        // Check if the response has JSON content
        const contentType = response.headers.get("content-type")
        let errorData
        if (contentType && contentType.includes("application/json")) {
          errorData = await response.json()
        } else {
          // If not JSON, parse as text
          const errorText = await response.text()
          errorData = { error: errorText }
        }
        throw new Error(errorData.error || "Failed to regenerate images")
      }

      const data = await response.json()
      const generatedImages = data.images

      // Update the response message with generated images
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === responseId ? { ...msg, images: generatedImages, isGenerating: false } : msg,
        ),
      )

      // Store each regenerated image in our image store
      generatedImages.forEach((imageSrc, index) => {
        saveGeneratedImage({
          id: `regen_${Date.now()}_${index}`,
          src: imageSrc,
          prompt: promptMessage.content,
          aspectRatio: promptMessage.aspectRatio,
          timestamp: new Date().toISOString(),
          style: "AI Regenerated",
          author: "You",
          likes: 0,
          isLiked: false,
        })
      })

      // Play a subtle sound when generation is complete (if user has interacted with the page)
      try {
        if (document.documentElement.hasAttribute("data-user-interacted")) {
          const audio = new Audio("/sounds/generation-complete.mp3")
          audio.volume = 0.2
          await audio.play()
        }
      } catch (soundError) {
        // Ignore sound errors - they're non-critical
      }
    } catch (error) {
      console.error("Error regenerating images:", error)
      // Remove the loading response message on error
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== responseId))

      toast({
        title: "Error regenerating images",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerateFromPrompt = (promptMessage: Message) => {
    setPrompt(promptMessage.content)
    setKeywords(promptMessage.keywords || [])
    setUploadedImages(
      promptMessage.uploadedImages
        ? promptMessage.uploadedImages.map((img) => ({
            id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            file: new File([], "regenerated_image.jpg"), // Dummy file, not actually used
            preview: img,
          }))
        : [],
    )
    handleGenerate()
  }

  // If showing project grid, render it
  if (showProjectGrid) {
    return (
      <div className="min-h-screen pt-16 px-6 pb-20 bg-background text-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
            <p className="text-muted-foreground">Continue working on an existing project or start a new one</p>
          </div>

          <ProjectGrid />
        </div>
      </div>
    )
  }

  // Otherwise, render the creation interface
  return (
    <div className="min-h-screen pt-16 px-0 pb-48 bg-background text-foreground">
      <div ref={contentRef} className="w-full max-w-none mx-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <ImageIcon className="h-12 w-12 text-primary/60" />
            </div>
            <h3 className="text-2xl font-medium mb-3">No Image Generated Yet</h3>
            <p className="text-muted-foreground max-w-md mb-8 text-lg">
              Enter a prompt and click Generate to create your first AI image
            </p>
            <Button
              size="lg"
              className="mt-4 px-8 py-6 text-lg"
              onClick={() => {
                // Trigger jiggle animation
                triggerJiggle()

                // Focus the input box and scroll to it
                const inputElement = textareaRef.current
                if (inputElement) {
                  inputElement.focus()
                  inputElement.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Creating
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            {messages.map((message) => (
              <div key={message.id} id={message.id} className="animate-in fade-in-50 duration-300">
                {message.type === "prompt" ? (
                  <div className="flex justify-end mb-6">
                    <div className="bg-transparent text-foreground rounded-2xl px-4 py-3 max-w-[80%]">
                      {message.isEditing ? (
                        <div className="flex flex-col space-y-3">
                          <textarea
                            defaultValue={message.content}
                            className="min-h-[60px] bg-background/80 border border-border/60 text-foreground resize-none rounded-lg p-3 shadow-inner focus:ring-1 focus:ring-primary/30 focus:outline-none"
                            autoFocus
                          />
                          <div className="flex justify-end space-x-3">
                            <Button size="sm" variant="outline" onClick={() => handleCancelEdit(message.id)}>
                              <X className="h-4 w-4 mr-1.5" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                const textarea = e.currentTarget.parentElement?.parentElement?.querySelector("textarea")
                                if (textarea) {
                                  handleUpdatePrompt(message.id, textarea.value)
                                }
                              }}
                            >
                              <Check className="h-4 w-4 mr-1.5" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Display uploaded images if any */}
                          {message.uploadedImages && message.uploadedImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {message.uploadedImages.map((img, idx) => (
                                <div key={idx} className="h-16 w-16 rounded-md overflow-hidden border border-border">
                                  <img
                                    src={img || "/placeholder.svg"}
                                    alt="Reference"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className={`whitespace-pre-wrap break-words tracking-wide ${playfair.className}`}>
                            {message.keywords && message.keywords.length > 0 ? (
                              <>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {message.keywords.map((keyword, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex px-2 py-0.5 rounded-full bg-purple-200 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200 text-xs font-medium"
                                    >
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                                <p
                                  className={`font-medium ${
                                    message.content.length > 80
                                      ? "text-lg md:text-xl leading-tight"
                                      : message.content.length > 40
                                        ? "text-xl md:text-2xl leading-snug"
                                        : "text-2xl md:text-3xl leading-normal"
                                  }`}
                                >
                                  {message.content}
                                </p>
                              </>
                            ) : (
                              <p
                                className={`font-medium ${
                                  message.content.length > 80
                                    ? "text-lg md:text-xl leading-tight"
                                    : message.content.length > 40
                                      ? "text-xl md:text-2xl leading-snug"
                                      : "text-2xl md:text-3xl leading-normal"
                                }`}
                              >
                                {message.content}
                              </p>
                            )}
                          </div>
                          <div className="flex justify-end mt-4 space-x-3">
                            <button
                              className="bg-background/80 hover:bg-muted/80 text-foreground p-2.5 rounded-full shadow-sm border border-border/40 transition-all hover:scale-110"
                              onClick={() => handleCopyPrompt(message.content)}
                              title="Copy prompt"
                            >
                              <Copy className="h-5 w-5" />
                            </button>
                            <button
                              className="bg-background/80 hover:bg-muted/80 text-foreground p-2.5 rounded-full shadow-sm border border-border/40 transition-all hover:scale-110"
                              onClick={() => handleEditPrompt(message.id)}
                              title="Edit prompt"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              className="bg-background/80 hover:bg-muted/80 text-foreground p-2.5 rounded-full shadow-sm border border-border/40 transition-all hover:scale-110"
                              onClick={() => handleRegenerateFromPrompt(message)}
                              title="Regenerate images"
                              disabled={isGenerating}
                            >
                              <RefreshCw className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    {isGenerating ? (
                      <div className="flex items-center justify-center p-8">
                        <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
                          <LoadingSpinner size="lg" showLogo={true} />
                          <div className="text-center space-y-2">
                            <p className="font-medium text-lg">Creating your vision</p>
                            <p className="text-muted-foreground text-sm">
                              Transforming your prompt into stunning visuals. This usually takes 5-10 seconds.
                            </p>
                          </div>
                          <div className="w-full max-w-xs bg-muted/30 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/70 rounded-full animate-[progress_3s_ease-in-out_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 max-w-4xl mx-auto">
                          {message.images?.map((image, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Generated image ${index + 1}`}
                                className={`w-full h-auto object-cover ${
                                  message.aspectRatio === "16:9"
                                    ? "aspect-video"
                                    : message.aspectRatio === "1:1"
                                      ? "aspect-square"
                                      : message.aspectRatio === "9:16"
                                        ? "aspect-[9/16]"
                                        : "aspect-[4/3]"
                                }`}
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-9 w-9"
                                  title="Download"
                                  onClick={() => handleDownloadImage(image)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-9 w-9"
                                  title={isSaved(image) ? "Remove from saved" : "Save to collection"}
                                  onClick={() => handleSaveImage(image, message.content)}
                                >
                                  <Bookmark className={`h-4 w-4 ${isSaved(image) ? "fill-current" : ""}`} />
                                </Button>
                                <Button size="icon" variant="secondary" className="h-9 w-9" title="View details">
                                  <Sparkles className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-muted-foreground text-sm font-light">
                            I've created {message.images?.length} new images based on your idea
                            {message.content ? ` of ${message.content}` : ""}, each with its own unique style and mood,
                            to bring your vision to life
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom prompt input - with original design */}
      <div className="fixed bottom-10 left-0 right-0 px-4 z-50 pointer-events-none">
        <div className="w-full max-w-6xl mx-auto">
          {/* Suggestions panel - positioned absolutely */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute bottom-full mb-4 w-full pointer-events-auto"
              style={{ width: inputBoxWidth > 0 ? `${inputBoxWidth}px` : "100%" }}
            >
              <div
                className={`backdrop-blur-md ${getSuggestionPanelBackground()} rounded-2xl p-6 shadow-lg max-h-[50vh] overflow-y-auto border transition-colors duration-200`}
              >
                <div className="space-y-6">
                  {promptSuggestions.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h4 className={`text-sm font-medium ${getSuggestionCategoryColor()}`}>{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.options.map((option) => (
                          <button
                            key={option}
                            className={`px-4 py-2 ${getSuggestionButtonBackground()} text-sm rounded-full transition-colors`}
                            onClick={() => addSuggestionToPrompt(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            ref={(el) => {
              // Assign the element to both refs
              inputBoxRef.current = el
              dropZoneRef.current = el
            }}
            className={`relative bg-background/20 backdrop-blur-sm border ${
              isDragging ? "border-primary border-dashed border-2" : "border-border/30"
            } rounded-full overflow-hidden shadow-lg pointer-events-auto transition-all duration-200`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center z-10 pointer-events-none">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/30">
                  <p className="text-primary font-medium">Drop images here</p>
                </div>
              </div>
            )}
            <div className="flex items-center min-h-16">
              <div className="flex items-center pl-6 space-x-3">
                {/* Upload button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                />
                <button
                  ref={uploadButtonRef}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={triggerFileUpload}
                  onMouseEnter={() => setActiveTooltip("upload")}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <ImageIcon className="h-6 w-6" />
                </button>

                {/* Suggestions button */}
                <button
                  ref={suggestionsButtonRef}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={toggleSuggestions}
                  onMouseEnter={() => setActiveTooltip("suggestions")}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <ListPlus className={cn("h-6 w-6", showSuggestions && "text-primary")} />
                </button>
              </div>

              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-1 w-full min-h-[48px] py-2 text-lg">
                    {/* Display uploaded images */}
                    {uploadedImages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2 w-full">
                        {uploadedImages.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="h-16 w-16 rounded-md overflow-hidden border border-border">
                              <img
                                src={img.preview || "/placeholder.svg"}
                                alt="Uploaded"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeUploadedImage(img.id)}
                              className="absolute -top-2 -right-2 bg-background text-foreground rounded-full p-1 shadow-sm border border-border hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-200 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200 text-sm font-medium"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-purple-300 dark:hover:bg-purple-700/60"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <textarea
                      ref={textareaRef}
                      placeholder={
                        keywords.length > 0 || uploadedImages.length > 0
                          ? ""
                          : "Use text to make a prompt, or paste/drop images..."
                      }
                      className="flex-1 min-w-[200px] bg-transparent border-0 focus:ring-0 focus:outline-none text-lg resize-none py-1 font-light tracking-wide text-foreground placeholder:text-muted-foreground"
                      value={prompt}
                      onChange={handlePromptChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isGenerating) {
                          e.preventDefault()
                          handleGenerate()
                        }
                      }}
                      rows={1}
                      style={{
                        minHeight: "24px",
                        maxHeight: showScrollbar ? "120px" : "none",
                        overflowY: showScrollbar ? "auto" : "hidden",
                        scrollbarWidth: "thin",
                      }}
                    />
                  </div>
                  {/* Character limit warning remains unchanged */}
                  {characterCount > CHARACTER_LIMIT && (
                    <div className="fixed z-[100] top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                      <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-gray-100 dark:bg-gray-800/95 shadow-lg animate-in fade-in-50 slide-in-from-top-5">
                        <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200 text-lg">Message too long</p>
                          <p className="text-gray-500 dark:text-gray-400">Please shorten message to continue</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center pr-6 space-x-4">
                <div className="flex items-center text-muted-foreground">
                  <span className="mr-1">IMAGE</span>
                  <span className="mx-1">•</span>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-auto focus:ring-0 hover:bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="9:16">9:16</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate button */}
                <Button
                  ref={generateButtonRef}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-300 text-purple-600 h-12 w-12 transition-all hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  onMouseEnter={() => setActiveTooltip("generate")}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {isGenerating ? (
                    <div className="h-6 w-6 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated navigation dots */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center space-x-1 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/30 shadow-md pointer-events-auto">
          {messages
            .filter((m) => m.type === "prompt")
            .map((message, index) => (
              <button
                key={message.id}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === messages.filter((m) => m.type === "prompt").length - 1
                    ? "bg-primary scale-125"
                    : "bg-muted hover:bg-primary/50"
                }`}
                onClick={() => {
                  // Scroll to the message
                  const messageElement = document.getElementById(message.id)
                  if (messageElement) {
                    messageElement.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                title={`Prompt ${index + 1}`}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
