import { ChevronRight } from 'lucide-react'
import { logoutUser } from '@/actions/user'
import NavLinks from './nav-links'
import { auth } from '@/auth'
import Link from 'next/link'
import UserAvatar from './user-avtar'
import LogoutButton from './logout-button'
import Logo from './gleam-logo'

export default async function SideNav() {
  const session = await auth()
  const user = session?.user!

  return (
    <section className="wrap fixed bottom-0 flex h-12 w-full flex-col gap-6 border-t border-foreground/10 bg-background md:h-screen md:max-w-64 md:border-r md:border-t-0 md:px-8 md:py-4">
      <div className="hidden py-2 md:block">
        <Logo />
      </div>
      <NavLinks />
      <div className="hidden space-y-6 md:block">
        <Link
          href="/dashboard/profile"
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <UserAvatar user={user} />
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-foreground/60">@{user.username}</p>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Link>
        <form action={logoutUser}>
          <LogoutButton />
        </form>
      </div>
    </section>
  )
}
