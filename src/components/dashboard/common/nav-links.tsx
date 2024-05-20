'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Bell,
  Home,
  MessageCircle,
  Settings,
  Star,
  Telescope
} from 'lucide-react'
import Link from 'next/link'

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageCircle
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell
  },
  {
    name: 'Discover',
    href: '/dashboard/discover',
    icon: Telescope
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  },
  {
    name: 'Favorites',
    href: '/dashboard/favorites',
    icon: Star
  }
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="flex flex-1 flex-col justify-center space-y-6">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <Link
            href={link.href}
            key={link.href}
            className={cn('flex gap-4 font-medium text-foreground/50', {
              'font-semibold text-foreground': link.href === pathname
            })}
          >
            <Icon strokeWidth={link.href === pathname ? 2.5 : 2} /> {link.name}
          </Link>
        )
      })}
    </div>
  )
}
