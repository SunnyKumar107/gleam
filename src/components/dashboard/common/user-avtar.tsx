import { UserData } from '@/auth.config'
import Image from 'next/image'

type UserAvatarProps = {
  user: UserData
}

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
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
          {user.name[0] + user.name[1]}
        </div>
      )}
    </div>
  )
}
