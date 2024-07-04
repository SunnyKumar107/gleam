import { logoutUser } from '@/actions/user'
import { auth } from '@/auth'
import SideNav from '@/components/dashboard/common/side-nav'
import { SessionProvider } from 'next-auth/react'

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function Layout({ children }: LayoutProps) {
  const session = await auth()

  if (!session?.user) {
    await logoutUser()
  }

  return (
    <SessionProvider session={session}>
      <main>
        <SideNav />
        <div className="bg-background md:ml-64">{children}</div>
      </main>
    </SessionProvider>
  )
}
