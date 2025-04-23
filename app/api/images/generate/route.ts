import { type NextRequest, NextResponse } from "next/server"
import { generateImagesFromPrompt, type GenerationOptions } from "@/lib/image-generation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { rateLimit } from "@/lib/rate-limit"
import { incrementQuotaUsage, saveGeneratedImage, trackGeneration } from "@/lib/db"

// Rate limiter for image generation
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per interval
})

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.error("Authentication failed: No session found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user ID for rate limiting
    const userId = session.user.id || session.user.email

    // Apply rate limiting based on user's plan
    // This is a simplified example - in a real app, you'd check the user's subscription
    const { success, limit, remaining } = await limiter.check(userId, 10) // 10 requests per minute

    if (!success) {
      console.warn(`Rate limit exceeded for user ${userId}. Limit: ${limit}, Remaining: ${remaining}`)
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Remaining": remaining.toString() },
        },
      )
    }

    // Check user's daily quota
    const quotaCheck = await incrementQuotaUsage(userId)
    if (!quotaCheck.success) {
      console.warn(`Quota exceeded for user ${userId}. Remaining: ${quotaCheck.remaining}`)
      return NextResponse.json({ error: "Daily generation limit reached. Please try again tomorrow." }, { status: 429 })
    }

    // Parse request body
    let prompt: string, options: GenerationOptions
    try {
      const requestBody = await req.json()
      prompt = requestBody.prompt
      options = requestBody.options
    } catch (parseError: any) {
      console.error("Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    if (!prompt || typeof prompt !== "string") {
      console.error(`Invalid prompt: ${prompt}`)
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Generate images
    let imageUrls: string[]
    try {
      imageUrls = await generateImagesFromPrompt(prompt, options as GenerationOptions)
    } catch (generationError: any) {
      console.error("Image generation failed:", generationError)
      return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
    }

    // Track this generation for analytics
    try {
      await trackGeneration(userId, "dall-e", prompt)
    } catch (trackingError: any) {
      console.error("Tracking generation failed:", trackingError)
    }

    // Save generated images to database
    const now = Date.now()
    try {
      await Promise.all(
        imageUrls.map(async (url, index) => {
          await saveGeneratedImage(userId, {
            id: `gen_${now}_${index}`,
            prompt,
            url,
            createdAt: now,
            model: (options as any)?.model || "dall-e-3",
            options,
          })
        }),
      )
    } catch (dbError: any) {
      console.error("Failed to save generated images to database:", dbError)
    }

    // Return the image URLs
    return NextResponse.json({
      success: true,
      images: imageUrls,
      usage: {
        limit: quotaCheck.remaining + 1,
        remaining: quotaCheck.remaining,
      },
    })
  } catch (error: any) {
    console.error("Error in image generation API:", error)
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
  }
}
