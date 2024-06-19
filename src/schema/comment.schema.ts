import { z } from 'zod'

export const commentSchema = z.object({
  id: z.string(),
  text: z.string(),
  postId: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const RegisterCommentSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
