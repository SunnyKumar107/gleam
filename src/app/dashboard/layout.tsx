import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import SideNav from '@/components/dashboard/common/side-nav'
import { SessionProvider } from 'next-auth/react'

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <main className="relative">
        <Header />
        <SideNav />
        <div className="ml-64">{children}</div>
      </main>
    </SessionProvider>
  )
}
