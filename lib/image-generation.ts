import openai from "./openai"
import { uploadToBlob } from "./blob-storage"

// Define types for image generation options
export type ImageSize = "256x256" | "512x512" | "1024x1024" | "1024x1792" | "1792x1024"
export type ImageQuality = "standard" | "hd"
export type ImageStyle = "vivid" | "natural"

export interface GenerationOptions {
  size?: ImageSize
  quality?: ImageQuality
  style?: ImageStyle
  n?: number // Number of images to generate
}

/**
 * Generate images from a text prompt using DALL-E
 * @param prompt The text prompt to generate images from
 * @param options Generation options
 * @returns Array of image URLs
 */
export async function generateImagesFromPrompt(prompt: string, options: GenerationOptions = {}): Promise<string[]> {
  try {
    // Set default options
    const { size = "1024x1024", quality = "standard", style = "vivid", n = 1 } = options

    // Rate limiting check could be added here

    // Call OpenAI API to generate images
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: Math.min(n, 4), // DALL-E 3 has a maximum of 4 images per request
      size,
      quality,
      style,
    })

    // Upload each generated image to Blob Storage
    const imageUrls = await Promise.all(
      response.data.map(async (image) => {
        // For DALL-E 3, we get a URL that we need to fetch first
        const imageResponse = await fetch(image.url)
        const imageBuffer = await imageResponse.arrayBuffer()

        // Upload the image to Blob Storage
        return uploadToBlob(
          Buffer.from(imageBuffer),
          `generated/${prompt
            .slice(0, 20)
            .replace(/[^a-z0-9]/gi, "-")
            .toLowerCase()}`,
        )
      }),
    )

    return imageUrls
  } catch (error) {
    console.error("Error generating images:", error)
    throw new Error("Failed to generate images")
  }
}

/**
 * Generate variations of an image using DALL-E
 * @param imageBuffer The source image buffer
 * @param options Generation options
 * @returns Array of image URLs
 */
export async function generateImageVariations(
  imageBuffer: Buffer,
  options: Omit<GenerationOptions, "style"> = {},
): Promise<string[]> {
  try {
    // Set default options
    const { size = "1024x1024", n = 1 } = options

    // Call OpenAI API to generate image variations
    const response = await openai.images.createVariation({
      image: imageBuffer,
      n: Math.min(n, 4),
      size: size as "256x256" | "512x512" | "1024x1024", // DALL-E 2 only supports these sizes for variations
    })

    // Upload each generated image to Blob Storage
    const imageUrls = await Promise.all(
      response.data.map(async (image) => {
        const imageResponse = await fetch(image.url)
        const variationBuffer = await imageResponse.arrayBuffer()

        return uploadToBlob(Buffer.from(variationBuffer), "variations")
      }),
    )

    return imageUrls
  } catch (error) {
    console.error("Error generating image variations:", error)
    throw new Error("Failed to generate image variations")
  }
}

/**
 * Generate edited images using DALL-E
 * @param imageBuffer The source image buffer
 * @param prompt The text prompt for editing
 * @param maskBuffer Optional mask buffer for specifying edit areas
 * @param options Generation options
 * @returns Array of image URLs
 */
export async function generateImageEdits(
  imageBuffer: Buffer,
  prompt: string,
  maskBuffer?: Buffer,
  options: Omit<GenerationOptions, "style" | "quality"> = {},
): Promise<string[]> {
  try {
    // Set default options
    const { size = "1024x1024", n = 1 } = options

    // Call OpenAI API to edit the image
    const response = await openai.images.edit({
      image: imageBuffer,
      mask: maskBuffer,
      prompt,
      n: Math.min(n, 4),
      size: size as "256x256" | "512x512" | "1024x1024", // DALL-E 2 only supports these sizes for edits
    })

    // Upload each generated image to Blob Storage
    const imageUrls = await Promise.all(
      response.data.map(async (image) => {
        const imageResponse = await fetch(image.url)
        const editBuffer = await imageResponse.arrayBuffer()

        return uploadToBlob(
          Buffer.from(editBuffer),
          `edits/${prompt
            .slice(0, 20)
            .replace(/[^a-z0-9]/gi, "-")
            .toLowerCase()}`,
        )
      }),
    )

    return imageUrls
  } catch (error) {
    console.error("Error editing image:", error)
    throw new Error("Failed to edit image")
  }
}
