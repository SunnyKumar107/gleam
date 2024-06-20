'use client'

import { UserData } from '@/auth.config'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type UserAvatarProps = {
  user: UserData
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded-full bg-primary hover:bg-primary/85 md:h-12 md:w-12',
        {
          'border-2 border-primary bg-primary/85':
            pathname === '/dashboard/profile'
        }
      )}
    >
      {user.image ? (
        <Image
          width={100}
          height={100}
          src={user.image}
          className="h-full w-full rounded-full object-cover"
          alt={user.username}
        />
      ) : (
        <div className="text-xl font-bold text-primary-foreground">
          {user.name[0]}
        </div>
      )}
    </div>
  )
}
