'use server'

import { prisma } from '@/lib/db'
import { RegisterCommentSchema } from '@/schema/comment.schema'

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
        commentLikes: true
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
    await prisma.postLike.delete({
      where: {
        id: likeId
      }
    })
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
