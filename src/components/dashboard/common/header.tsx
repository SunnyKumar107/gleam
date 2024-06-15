'use client'

import Link from 'next/link'
import Logo from './gleam-logo'
import { cn } from '@/lib/utils'
import { ArrowLeft, MessageCircleMore, Settings } from 'lucide-react'

const Header = ({ type, username }: { type: string; username?: string }) => {
  return (
    <div className="fixed top-0 z-10 flex h-14 w-screen items-center justify-between bg-white px-3 md:hidden">
      {/* Home page */}
      {type === 'home' && <Logo />}
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
      )}

      {/* Your profile page */}
      {type === 'profile' && (
        <div className="flex items-center space-x-4">
          <Link href={'/dashboard'}>
            <ArrowLeft />
          </Link>
          <h2 className="text-xl font-medium">{username}</h2>
        </div>
      )}
      {type === 'profile' && (
        <Link
          href={'/dashboard/settings'}
          key={'/dashboard/settings'}
          className={cn(
            'font-medium text-foreground/80 hover:font-medium hover:text-foreground'
          )}
        >
          <Settings />
        </Link>
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
          <h2 className="text-xl font-medium">{username}</h2>
        </div>
      )}
    </div>
  )
}

export default Header
