'use client'

import Link from 'next/link'
import Logo from './gleam-logo'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { MessageCircleMore } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 z-10 flex h-[60px] w-screen items-center justify-between bg-white p-4 md:hidden">
      <Logo />
      <Link
        href={'/dashboard/messages'}
        key={'/dashboard/messages'}
        className={cn(
          'font-medium text-foreground/50 hover:font-medium hover:text-foreground',
          {
            'font-semibold text-foreground': '/dashboard/settings' === pathname
          }
        )}
      >
        <MessageCircleMore
          strokeWidth={'/dashboard/settings' === pathname ? 2.5 : 2}
        />
      </Link>
    </div>
  )
}

export default Header
