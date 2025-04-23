import { type NextRequest, NextResponse } from "next/server"
import { generateImageEdits } from "@/lib/image-generation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { rateLimit } from "@/lib/rate-limit"
import { incrementQuotaUsage, saveGeneratedImage, trackGeneration } from "@/lib/db"

// Rate limiter for image edits
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per interval
})

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user ID for rate limiting
    const userId = session.user.id || session.user.email

    // Apply rate limiting
    const { success, limit, remaining } = await limiter.check(userId, 5) // 5 requests per minute

    if (!success) {
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
      return NextResponse.json({ error: "Daily generation limit reached. Please try again tomorrow." }, { status: 429 })
    }

    // Parse form data
    const formData = await req.formData()
    const imageFile = formData.get("image") as File | null
    const maskFile = formData.get("mask") as File | null
    const prompt = formData.get("prompt") as string
    const size = (formData.get("size") as string) || "1024x1024"
    const n = Number.parseInt((formData.get("n") as string) || "1")

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Convert files to buffers
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
    let maskBuffer: Buffer | undefined
    if (maskFile) {
      maskBuffer = Buffer.from(await maskFile.arrayBuffer())
    }

    // Generate image edits
    const imageUrls = await generateImageEdits(imageBuffer, prompt, maskBuffer, { size, n })

    // Track this generation for analytics
    await trackGeneration(userId, "dall-e-edit", prompt)

    // Save generated images to database
    const now = Date.now()
    await Promise.all(
      imageUrls.map((url, index) =>
        saveGeneratedImage(userId, {
          id: `edit_${now}_${index}`,
          prompt,
          url,
          createdAt: now,
          model: "dall-e-2",
          options: { size, n },
        }),
      ),
    )

    // Return the image URLs
    return NextResponse.json({
      success: true,
      images: imageUrls,
      usage: {
        limit: quotaCheck.remaining + 1,
        remaining: quotaCheck.remaining,
      },
    })
  } catch (error) {
    console.error("Error in image edit API:", error)
    return NextResponse.json({ error: "Failed to edit image" }, { status: 500 })
  }
}
