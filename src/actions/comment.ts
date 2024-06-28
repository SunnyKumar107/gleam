'use server'

import { prisma } from '@/lib/db'
import { RegisterCommentSchema } from '@/schema/comment.schema'
import { revalidatePath } from 'next/cache'

export async function getCommentsByPostId(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        updatedAt: true,
        author: true,
        commentLikes: true,
        post: {
          select: {
            authorId: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return comments
  } catch (error) {
    throw error
  }
}

export async function addComment({
  authorId,
  postId,
  text
}: {
  authorId: string
  postId: string
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
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/post/[postId]', 'page')
    return {
      success: true,
      status: 200,
      message: 'Comment added successfully'
    }
  } catch (error) {
    throw error
  }
}

export async function deleteComment({ commentId }: { commentId: string }) {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId
      }
    })
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/post/[postId]', 'page')
    return {
      success: true,
      status: 200,
      message: 'Comment deleted successfully'
    }
  } catch (error) {
    throw error
  }
}

export async function likeComment({
  commentId,
  authorId
}: {
  commentId: string
  authorId: string
}) {
  try {
    await prisma.commentLike.create({
      data: {
        commentId: commentId,
        authorId: authorId
      }
    })
    revalidatePath('/dashboard/post/[postId]', 'page')
    return {
      success: true,
      message: 'like added',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export async function removeLikeComment({ likeId }: { likeId: string }) {
  try {
    await prisma.commentLike.delete({
      where: {
        id: likeId
      }
    })
    revalidatePath('/dashboard/post/[postId]', 'page')
    return {
      success: true,
      message: 'like removed',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}
