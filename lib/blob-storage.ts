import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

/**
 * Upload a buffer to Vercel Blob storage
 * @param buffer The buffer to upload
 * @param prefix Optional prefix for the filename
 * @returns The URL of the uploaded blob
 */
export async function uploadToBlob(buffer: Buffer, prefix = "image"): Promise<string> {
  try {
    // Generate a unique filename
    const filename = `${prefix}-${nanoid()}.png`

    // Upload to Vercel Blob
    const blob = await put(filename, buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return blob.url
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    throw new Error("Failed to upload image to storage")
  }
}
