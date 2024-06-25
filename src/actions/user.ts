'use server'

import { signIn, signOut } from '@/auth'
import { prisma } from '@/lib/db'
import { AuthError } from 'next-auth'
import bcrypt from 'bcrypt'
import { RegisterFormSchema } from '@/schema/user.schema'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

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
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        favorites: true,
        followers: true,
        following: true
      }
    })
    return user
  } catch (error) {
    throw new Error('Failed to fetch user by username')
  }
}

export async function getUserTable(userId: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId }
      }
    })
    return users
  } catch (error) {
    throw new Error('Failed to fetch all users')
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
    revalidatePath('/dashboard/profile')
    return { success: true, status: 200, message: 'User updated successfully' }
  } catch (error) {
    throw new Error('Failed to update user')
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    await prisma.post.deleteMany({
      where: { authorId: userId }
    })

    await prisma.comment.deleteMany({
      where: { authorId: userId }
    })

    await prisma.favoritePost.deleteMany({
      where: { authorId: userId }
    })

    await prisma.follow.deleteMany({
      where: { followerId: userId }
    })

    await prisma.follow.deleteMany({
      where: { followingId: userId }
    })

    await prisma.postLike.deleteMany({
      where: { authorId: userId }
    })

    await prisma.commentLike.deleteMany({
      where: { authorId: userId }
    })

    await prisma.user.delete({
      where: { id: userId }
    })
    return { success: true, status: 200, message: 'User deleted successfully' }
  } catch (error) {
    return { success: false, status: 500, message: 'Failed to delete user' }
  }
}

export const getFollowersByUsername = async (username: string) => {
  try {
    const followers = await prisma.follow.findMany({
      where: { following: { username } },
      select: { follower: true },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return followers
  } catch (error) {
    throw new Error('Failed to fetch followers')
  }
}

export const getFollowingByUsername = async (username: string) => {
  try {
    const following = await prisma.follow.findMany({
      where: { follower: { username } },
      select: { following: true },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return following
  } catch (error) {
    throw new Error('Failed to fetch following')
  }
}

export async function followUser({
  followingId,
  followerId
}: {
  followingId: string
  followerId: string
}) {
  try {
    await prisma.follow.create({
      data: {
        followingId,
        followerId
      }
    })
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/user/[username]', 'page')
    return { success: true, status: 200, message: 'User followed successfully' }
  } catch (error) {
    throw new Error('Failed to follow user')
  }
}

export async function unfollowUser({
  followingId,
  followerId
}: {
  followingId: string
  followerId: string
}) {
  try {
    await prisma.follow.deleteMany({
      where: {
        followingId,
        followerId
      }
    })
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/user/[username]', 'page')
    return {
      success: true,
      status: 200,
      message: 'User unfollowed successfully'
    }
  } catch (error) {
    throw new Error('Failed to unfollow user')
  }
}
