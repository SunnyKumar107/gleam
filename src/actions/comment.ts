'use server'

import { prisma } from '@/lib/db'
import { RegisterCommentSchema } from '@/schema/comment.schema'

export async function addComment({
  authorId,
  postId,
  text
}: {
  authorId: number
  postId: number
  text: string
}) {
  try {
    const validatedComment = RegisterCommentSchema.safeParse({
      authorId: authorId,
      postId: postId,
      text: text
    })
    if (!validatedComment.success) {
      return {
        success: false,
        status: 400,
        message: 'Missing Fields. Failed to Create Post.'
      }
    }

    await prisma.comment.create({
      data: {
        ...validatedComment.data
      }
    })
  } catch (error) {
    throw error
  }
}
