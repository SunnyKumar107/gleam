'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { followUser, unfollowUser } from '@/actions/user'

type followingProps = {
  id: string
  followingId: string
}[]

type followersProps = {
  id: string
  followerId: string
}[]

const FollowButton = ({
  followers,
  following,
  userId
}: {
  followers?: followersProps
  following?: followingProps
  userId: string
}) => {
  const [isFollow, setIsFollow] = useState(false)
  const { data: session } = useSession()

  const isUserFollow = () => {
    if (following) {
      return following.find((user) => user.followingId === userId)
    }

    if (followers) {
      return followers.find((user) => user.followerId === session?.user.id)
    }
  }

  useEffect(() => {
    if (isUserFollow()) {
      setIsFollow(true)
    }
  }, [isUserFollow])

  const handleFollow = async () => {
    setIsFollow(!isFollow)
    if (isFollow) {
      await unfollowUser({ followerId: session?.user.id!, followingId: userId })
      return
    }

    await followUser({ followerId: session?.user.id!, followingId: userId })
  }

  return (
    <Button
      variant={isFollow ? 'secondary' : 'default'}
      className="w-full max-w-72"
      onClick={handleFollow}
    >
      {isFollow ? 'Following' : 'Follow'}
    </Button>
  )
}

export default FollowButton
