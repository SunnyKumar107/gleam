'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { followUser, unfollowUser } from '@/actions/user'

type followersProps = {
  id: string
  followerId: string
}[]

const FollowButton = ({
  followers,
  userId
}: {
  followers: followersProps
  userId: string
}) => {
  const [isFollow, setIsFollow] = useState(false)
  const { data: session } = useSession()

  const isUserFollow = followers.find(
    (follower) => follower.followerId === session?.user.id
  )

  useEffect(() => {
    if (isUserFollow) {
      setIsFollow(true)
    }
  }, [])

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
