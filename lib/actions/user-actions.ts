"use server"

import { revalidatePath } from "next/cache"

// Type for the response from the avatar update API
type AvatarUpdateResponse = {
  success?: boolean
  avatar?: string
  error?: string
  message?: string
}

/**
 * Updates the user's avatar by uploading a file or using a predefined URL
 */
export async function updateUserAvatar(formData: FormData): Promise<AvatarUpdateResponse> {
  try {
    // Use a relative URL instead of absolute URL with environment variable
    const response = await fetch(`/api/user/avatar`, {
      method: "POST",
      body: formData,
      // Include credentials for authentication cookies
      credentials: "include",
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.error || "Failed to update avatar",
      }
    }

    const data = await response.json()

    // Revalidate the settings page to reflect the changes
    revalidatePath("/dashboard/settings")

    return {
      success: true,
      avatar: data.avatar,
      message: data.message || "Avatar updated successfully",
    }
  } catch (error) {
    console.error("Error updating avatar:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

/**
 * Fetches the current user's avatar URL from the backend
 */
export async function getUserAvatar(): Promise<string | null> {
  try {
    // Use a relative URL instead of absolute URL with environment variable
    const response = await fetch(`/api/user/avatar`, {
      // Include credentials for authentication cookies
      credentials: "include",
      // Add cache: 'no-store' to avoid caching the response
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.avatar || null
  } catch (error) {
    console.error("Error fetching avatar:", error)
    return null
  }
}
