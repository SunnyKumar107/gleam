import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <main>
        <div>{children}</div>
      </main>
    </SessionProvider>
  )
}
