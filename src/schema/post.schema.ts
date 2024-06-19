import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  image: z.string().url(),
  caption: z.string().optional(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RegisterPostSchema = PostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
