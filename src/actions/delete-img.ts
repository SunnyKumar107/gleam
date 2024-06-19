'use server'

import { utapi } from '@/server/uploadthing'

export async function deleteImage(imgUrl: string) {
  const fileName = imgUrl.split('/').at(-1)
  try {
    await utapi.deleteFiles(fileName!)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
