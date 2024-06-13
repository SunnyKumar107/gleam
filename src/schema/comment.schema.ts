import { z } from 'zod'

export const commentSchema = z.object({
  id: z.number(),
  text: z.string(),
  postId: z.number(),
  authorId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RegisterCommentSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
