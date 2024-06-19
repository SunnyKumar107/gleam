'use server'

import { signIn, signOut } from '@/auth'
import { prisma } from '@/lib/db'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { RegisterFormSchema } from '@/schema/user.schema'
import { Prisma } from '@prisma/client'

export async function loginUser(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function logoutUser() {
  await signOut()
}

export async function createUser(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    const validatedUser = RegisterFormSchema.safeParse({
      email: formData.get('email'),
      username: formData.get('username'),
      name: formData.get('name'),
      password: formData.get('password')
    })

    if (!validatedUser.success) {
      return 'Missing Fields. Failed to Create User.'
    }

    const hashPassword = await bcrypt.hash(validatedUser.data.password, 10)

    await prisma.user.create({
      data: {
        ...validatedUser.data,
        password: hashPassword
      }
    })

    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard'
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return 'Username or Email already exists.'
      }
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user
  } catch (error) {
    throw new Error('Failed to fetch user by email')
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        image: true,
        posts: true,
        favorites: true
      }
    })
    return user
  } catch (error) {
    throw new Error('Failed to fetch user by username')
  }
}

export async function updateUser({
  id,
  name,
  username,
  bio,
  image
}: {
  id: string
  name: string
  username: string
  bio: string | null
  image: string | null
}) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        username,
        bio,
        image
      }
    })
    return { success: true, status: 200, message: 'User updated successfully' }
  } catch (error) {
    throw new Error('Failed to update user')
  }
}

export async function getFavorites(userId: string) {
  try {
    const favorites = await prisma.favoritePost.findMany({
      where: { authorId: userId }, select: { id: true, post: true }
    })
    return favorites
  } catch (error) {
    throw new Error('Failed to fetch favorites')
  }
}