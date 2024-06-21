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
      comments: true,
      favoritedBy: true
    }
  })
  return posts
}

export async function getPostById(id: string) {
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
      comments: true,
      favoritedBy: true
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
  authorId: string
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
  postId: string
  authorId: string
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

export async function removeLikePost({ likeId }: { likeId: string }) {
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

export async function getFavoritePosts(userId: string) {
  try {
    const favorites = await prisma.favoritePost.findMany({
      where: { authorId: userId },
      select: { id: true, post: true }
    })
    return favorites
  } catch (error) {
    throw new Error('Failed to fetch favorites')
  }
}

export async function addFavoritePost({
  postId,
  authorId
}: {
  postId: string
  authorId: string
}) {
  try {
    await prisma.favoritePost.create({
      data: {
        postId: postId,
        authorId: authorId
      }
    })
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      statuscode: 500
    }
  }
}

export async function RemoveFavoritePost({
  favoritePostId
}: {
  favoritePostId: string
}) {
  try {
    await prisma.favoritePost.delete({
      where: {
        id: favoritePostId
      }
    })
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      statuscode: 500
    }
  }
}
