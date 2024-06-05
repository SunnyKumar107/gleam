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
    const validatedPost = RegisterPostSchema.safeParse({
      image: image,
      caption: caption,
      authorId: authorId
    })

    if (!validatedPost.success) {
      return 'Missing Fields. Failed to Create User.'
    }

    await prisma.post.create({
      data: {
        ...validatedPost.data
      }
    })
    console.log('post created')
  } catch (error) {
    throw error
  }
}
