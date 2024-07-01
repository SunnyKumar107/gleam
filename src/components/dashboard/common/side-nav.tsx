import { ChevronRight } from 'lucide-react'
import { logoutUser } from '@/actions/user'
import NavLinks from './nav-links'
import { auth } from '@/auth'
import Link from 'next/link'
import UserAvatar from './user-avtar'
import LogoutButton from './logout-button'
import Logo from './gleam-logo'
import { CreatePost } from '../create-post'

export default async function SideNav() {
  const session = await auth()
  const user = session?.user!

  return (
    <section className="wrap fixed bottom-0 z-10 flex h-12 w-full border-t border-foreground/10 bg-background md:h-screen md:max-w-64 md:flex-col md:gap-6 md:border-r md:border-t-0 md:px-8 md:py-4">
      <div className="hidden py-2 md:block">
        <Logo />
      </div>
      <NavLinks />
      <CreatePost screen="desktop" />
      <Link
        href="/dashboard/profile"
        className="flex w-1/4 items-center justify-center gap-2 md:w-full md:justify-between"
      >
        <UserAvatar user={user} />
        <div className="hidden flex-col items-start justify-center md:flex">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-foreground/60">@{user?.username}</p>
        </div>
        <ChevronRight className="hidden h-4 w-4 md:block" />
      </Link>
      <form action={logoutUser} className="hidden md:block">
        <LogoutButton />
      </form>
    </section>
  )
}
