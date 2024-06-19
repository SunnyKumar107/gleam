import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string({
    invalid_type_error: 'Email must be a string.',
    required_error: 'Email is required.'
  }),
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.'
  }),
  username: z
    .string({
      invalid_type_error: 'Username must be a string.',
      required_error: 'Username is required.'
    })
    .min(3, 'Username must have at least 3 characters.'),
  password: z
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required.'
    })
    .min(6, 'Password must have at least 6 characters.'),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string().url().optional(),
  bio: z.string().optional()
})

export const RegisterFormSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
