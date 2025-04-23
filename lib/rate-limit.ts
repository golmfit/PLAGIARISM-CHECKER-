import { kv } from "@vercel/kv"

interface RateLimitOptions {
  interval: number // in milliseconds
  uniqueTokenPerInterval: number
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, uniqueTokenPerInterval } = options

  return {
    check: async (token: string, limit: number): Promise<RateLimitResult> => {
      const key = `ratelimit:${token}:${Math.floor(Date.now() / interval)}`

      // Get current count
      const count = await kv.incr(key)

      // Set expiry
      await kv.expire(key, Math.ceil(interval / 1000))

      // Check if rate limit is exceeded
      const success = count <= limit
      const remaining = Math.max(0, limit - count)

      return { success, limit, remaining }
    },
  }
}
