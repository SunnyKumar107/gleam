import { leckerliOne } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ChevronRight, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/actions/user'
import NavLinks from './nav-links'
import { auth } from '@/auth'
import Link from 'next/link'
import UserAvatar from './user-avtar'

export default async function SideNav() {
  const session = await auth()
  const user = session?.user!

  return (
    <section className="wrap fixed inset-0 flex max-w-64 flex-col gap-8 border-r-black bg-background p-8">
      <h1 className={cn('mx-auto text-3xl', leckerliOne.className)}>Gleam</h1>

      <NavLinks />

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
        <Button variant="secondary" type="submit" className="w-full uppercase">
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </form>
    </section>
  )
}
