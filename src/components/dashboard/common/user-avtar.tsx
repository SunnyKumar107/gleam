import { UserData } from '@/auth.config'
import Image from 'next/image'

type UserAvatarProps = {
  user: UserData
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary md:h-12 md:w-12">
      {user.image ? (
        <Image
          width={48}
          height={48}
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
