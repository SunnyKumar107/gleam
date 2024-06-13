'use server'

import { prisma } from '@/lib/db'
import { RegisterPostSchema } from '@/schema/post.schema'

export async function getPostTable() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      image: true,
      caption: true,
      createdAt: true,
      author: true,
      postLikes: true,
      comments: true
    }
  })
  return posts
}

export async function getPostById(id: number) {
  const post = await prisma.post.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      image: true,
      caption: true,
      createdAt: true,
      author: true,
      postLikes: true,
      comments: true
    }
  })
  return post
}

export async function createPost({
  image,
  caption,
  authorId
}: {
  image: string
  caption: string
  authorId: number
}) {
  try {
    const validatedPost = RegisterPostSchema.safeParse({
      image: image,
      caption: caption,
      authorId: authorId
    })

    if (!validatedPost.success) {
      return {
        success: false,
        status: 400,
        message: 'Missing Fields. Failed to Create Post.'
      }
    }

    await prisma.post.create({
      data: {
        ...validatedPost.data
      }
    })
    return {
      success: true,
      status: 200,
      message: 'Post created successfully'
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: 'Something went wrong'
    }
  }
}

export async function likePost({
  postId,
  authorId
}: {
  postId: number
  authorId: number
}) {
  try {
    await prisma.postLike.create({
      data: {
        postId: postId,
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

export async function removeLikePost({ likeId }: { likeId: number }) {
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
