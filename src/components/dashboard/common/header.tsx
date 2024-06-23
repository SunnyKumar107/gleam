'use client'

import Link from 'next/link'
import Logo from './gleam-logo'
import { ArrowLeft } from 'lucide-react'
import { logoutUser } from '@/actions/user'
import LogoutButton from './logout-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Header = ({ type, name }: { type: string; name?: string }) => {
  const pathname = usePathname()

  if (type === 'followers' || type === 'following') {
    return (
      <div className="fixed top-0 z-10 flex h-14 w-screen items-center justify-between border-b border-foreground/10 bg-background md:w-[calc(100vw-256px)]">
        <Link
          href={`/dashboard/user/${name}/followers`}
          className={cn(
            'flex h-full w-full items-center justify-center border-b-2 border-background text-lg font-medium md:text-xl',
            {
              'border-primary bg-primary-foreground font-semibold text-foreground':
                pathname === `/dashboard/user/${name}/followers`
            }
          )}
        >
          followers
        </Link>
        <Link
          href={`/dashboard/user/${name}/following`}
          className={cn(
            'flex h-full w-full items-center justify-center border-b-2 border-background text-lg font-medium md:text-xl',
            {
              'border-primary bg-primary-foreground font-semibold text-foreground':
                pathname === `/dashboard/user/${name}/following`
            }
          )}
        >
          following
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed top-0 z-10 flex h-14 w-screen items-center justify-between border-b border-foreground/30 bg-background px-3 md:hidden ">
      {/* Home page */}
      {type === 'home' && <Logo />}
      {type === 'home' && (
        <div className="-mr-2 flex items-center space-x-2">
          <ThemeToggle />
          {/* This feature is not available yet
        <Link
          href={'/dashboard/messages'}
          key={'/dashboard/messages'}
          className={cn(
            'font-medium text-foreground/80 hover:font-medium hover:text-foreground'
          )}
        >
          <MessageCircleMore />
        </Link> */}
        </div>
      )}

      {/* Your profile page */}
      {type === 'profile' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
      )}

      {type === 'profile' && (
        <div className="flex items-center space-x-4">
          <form action={logoutUser}>
            <LogoutButton />
          </form>
          {/* This feature is not available yet
          <Link
          href={'/dashboard/settings'}
          key={'/dashboard/settings'}
          className={cn(
            'font-medium text-foreground/80 hover:font-medium hover:text-foreground'
          )}
        >
          <Settings />
        </Link> */}
        </div>
      )}

      {/* Your profile page */}
      {type === 'favorites' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-semibold">Favorites</h2>
        </div>
      )}

      {/* Post page */}
      {type === 'post' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-medium">Post</h2>
        </div>
      )}

      {/* User profile page */}
      {type === 'user' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
      )}

      {/* Edit page */}
      {type === 'edit' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard/profile'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-medium">Edit</h2>
        </div>
      )}

      {/* Default */}
      {type === 'default' && (
        <div className="">
          <h2 className="text-xl font-medium">{name}</h2>
        </div>
      )}
    </div>
  )
}

export default Header
