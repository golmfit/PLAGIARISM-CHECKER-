import { kv } from "@vercel/kv"

// User quota tracking
interface QuotaCheck {
  success: boolean
  remaining: number
}

/**
 * Increment a user's quota usage and check if they've exceeded their limit
 * @param userId The user's ID
 * @returns Object indicating success and remaining quota
 */
export async function incrementQuotaUsage(userId: string): Promise<QuotaCheck> {
  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD
  const key = `quota:${userId}:${today}`

  // Get current usage
  const currentUsage = (await kv.get<number>(key)) || 0

  // Get user's daily limit (in a real app, this would come from a user's subscription)
  const dailyLimit = 25 // Default limit

  // Check if user has exceeded their limit
  if (currentUsage >= dailyLimit) {
    return { success: false, remaining: 0 }
  }

  // Increment usage
  await kv.set(key, currentUsage + 1)
  // Set expiry for 48 hours to ensure it's available for the full day regardless of timezone
  await kv.expire(key, 60 * 60 * 48)

  return {
    success: true,
    remaining: dailyLimit - (currentUsage + 1),
  }
}

/**
 * Save a generated image to the database
 */
export async function saveGeneratedImage(userId: string, imageData: any): Promise<void> {
  const key = `images:${userId}:${imageData.id}`
  await kv.set(key, imageData)

  // Add to user's image list
  const userImagesKey = `user:${userId}:images`
  await kv.lpush(userImagesKey, imageData.id)
}

/**
 * Track a generation event for analytics
 */
export async function trackGeneration(userId: string, model: string, prompt: string): Promise<void> {
  const timestamp = Date.now()
  const event = {
    userId,
    model,
    prompt,
    timestamp,
  }

  // Add to analytics stream
  await kv.lpush("analytics:generations", JSON.stringify(event))
}
