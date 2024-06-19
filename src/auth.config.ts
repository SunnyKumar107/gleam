import type { NextAuthConfig, Session } from 'next-auth'
import { User } from '@prisma/client'

export type UserData = Omit<User, 'password'>

declare module 'next-auth' {
  interface Session {
    user: UserData
  }
}

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }

      const isOnAuth =
        nextUrl.pathname.startsWith('/login') ||
        nextUrl.pathname.startsWith('/register')

      if (isOnAuth) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
      }
      return true
    },
    async jwt({ token, trigger, user }) {
      if (user) {
        return { token, user }
      }
      return token
    },
    async session({ session, token }) {
      return { session, user: token.user } as unknown as Session
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
