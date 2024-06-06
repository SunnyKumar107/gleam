'use server'

import { utapi } from '@/server/uploadthing'

export async function deleteImage(imgUrl: string) {
  try {
    await utapi.deleteFiles(imgUrl)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
