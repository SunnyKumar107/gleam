import { prisma } from '@/lib/db'
import { RegisterPostSchema } from '@/schema/post.schema'

export async function getPostTable() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      image: true,
      caption: true,
      createdAt: true,
      author: true
    }
  })
  return posts
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
    console.log(image, caption, authorId, typeof authorId)
    const validatedPost = RegisterPostSchema.safeParse({
      image: image,
      caption: caption,
      authorId: authorId
    })
    console.log(validatedPost)

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
