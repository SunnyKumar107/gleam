import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from './actions/user'
import bcrypt from 'bcrypt'
import { z } from 'zod'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<Record<string, unknown> | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUserByEmail(email)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
          }
        }
        return null
      }
    })
  ]
})
