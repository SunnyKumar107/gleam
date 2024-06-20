'use client'

import Link from 'next/link'
import Logo from './gleam-logo'
import { ArrowLeft, LoaderCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/actions/user'
import { useFormStatus } from 'react-dom'
import LogoutButton from './logout-button'

const Header = ({ type, name }: { type: string; name?: string }) => {
  const { pending } = useFormStatus()

  return (
    <div className="fixed top-0 z-10 flex h-14 w-screen items-center justify-between bg-white px-3 md:hidden">
      {/* Home page */}
      {type === 'home' && <Logo />}
      {/* This feature is not available yet
       {type === 'home' && (
        <Link
          href={'/dashboard/messages'}
          key={'/dashboard/messages'}
          className={cn(
            'font-medium text-foreground/80 hover:font-medium hover:text-foreground'
          )}
        >
          <MessageCircleMore />
        </Link>
      )} */}

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
    </div>
  )
}

export default Header
