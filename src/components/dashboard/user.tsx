'use client'

import Image from 'next/image'
import React from 'react'
import FollowButton from './follow-button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type userProps = {
  id: string
  name: string
  username: string
  email: string
  bio: string | null
  image: string | null
}

type loginUserProps = {
  id: string
  following: {
    id: string
    followingId: string
  }[]
}

const User = ({
  user,
  loginUser
}: {
  user: userProps
  loginUser: loginUserProps
}) => {
  const { data: session } = useSession()

  return (
    <div className="flex h-[195px] w-[180px] flex-col items-center gap-2 rounded-md bg-primary-foreground p-2 shadow">
      <Link
        href={
          session?.user.username === user.username
            ? '/dashboard/profile'
            : `/dashboard/user/${user.username}`
        }
        className="h-20 w-20 overflow-hidden rounded-full bg-foreground/10"
      >
        <Image
          src={user.image ? user.image : '/images/user-avtar.png'}
          alt={user.username}
          width={100}
          height={100}
          className="min-h-20 w-full object-cover"
        />
      </Link>
      <Link
        href={
          session?.user.username === user.username
            ? '/dashboard/profile'
            : `/dashboard/user/${user.username}`
        }
        className="flex flex-col items-center"
      >
        <h3 className="text-lg font-medium">{user.name}</h3>
        <p className="-mt-1 text-sm text-foreground/60">@{user.username}</p>
      </Link>
      {loginUser.id !== user.id ? (
        <FollowButton following={loginUser.following} userId={user.id} />
      ) : null}
    </div>
  )
}

export default User
