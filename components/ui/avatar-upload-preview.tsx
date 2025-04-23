"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCw, Check } from "lucide-react"

interface AvatarUploadPreviewProps {
  imageUrl: string
  onConfirm: (processedImageUrl: string) => void
  onCancel: () => void
}

export function AvatarUploadPreview({ imageUrl, onConfirm, onCancel }: AvatarUploadPreviewProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Load the image when the component mounts
  useState(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl
    img.onload = () => {
      imageRef.current = img
      drawImage()
    }
  })

  // Draw the image on the canvas with current zoom and rotation
  const drawImage = () => {
    const canvas = canvasRef.current
    const img = imageRef.current

    if (!canvas || !img) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save context state
    ctx.save()

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2)

    // Rotate
    ctx.rotate((rotation * Math.PI) / 180)

    // Scale (zoom)
    ctx.scale(zoom, zoom)

    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)

    // Restore context state
    ctx.restore()
  }

  // Update canvas when zoom or rotation changes
  useState(() => {
    drawImage()
  }, [zoom, rotation])

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5))
  }

  // Handle rotation
  const handleRotate = () => {
    setRotation((rotation + 90) % 360)
  }

  // Handle confirm
  const handleConfirm = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a circular crop
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create a temporary canvas for the circular crop
    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")
    if (!tempCtx) return

    // Set dimensions
    const size = Math.min(canvas.width, canvas.height)
    tempCanvas.width = size
    tempCanvas.height = size

    // Draw circular mask
    tempCtx.beginPath()
    tempCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    tempCtx.closePath()
    tempCtx.clip()

    // Draw the original canvas content
    tempCtx.drawImage(canvas, (canvas.width - size) / 2, (canvas.height - size) / 2, size, size, 0, 0, size, size)

    // Get the data URL and pass it to the onConfirm callback
    const dataUrl = tempCanvas.toDataURL("image/png")
    onConfirm(dataUrl)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative">
          <canvas ref={canvasRef} width={300} height={300} className="border rounded-md" />
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Slider
              value={[zoom * 10]}
              min={5}
              max={30}
              step={1}
              onValueChange={(value) => setZoom(value[0] / 10)}
              className="w-32"
            />
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            <Check className="mr-2 h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
}
