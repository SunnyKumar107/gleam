'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Star, Telescope, Search } from 'lucide-react'
import Link from 'next/link'

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search
  },
  {
    name: 'Discover',
    href: '/dashboard/discover',
    icon: Telescope
  },
  {
    name: 'Favorites',
    href: '/dashboard/favorites',
    icon: Star
  }
  // New features will be added

  // {
  //   name: 'Notifications',
  //   href: '/dashboard/notifications',
  //   icon: Bell
  // },
  // {
  //   name: 'Messages',
  //   href: '/dashboard/messages',
  //   icon: MessageCircleMore
  // },
  // {
  //   name: 'Settings',
  //   href: '/dashboard/settings',
  //   icon: Settings
  // }
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 justify-center md:w-full md:flex-col md:justify-start md:space-y-6 md:py-2">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              'flex w-full items-center justify-center gap-4 font-medium text-foreground/60 hover:font-medium hover:text-foreground md:h-auto md:justify-start',
              {
                'hidden md:flex':
                  link.name === 'Settings' || link.name === 'Messages'
              },
              {
                'font-semibold text-foreground': link.href === pathname
              }
            )}
          >
            <Icon strokeWidth={link.href === pathname ? 2.5 : 2} />{' '}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}
