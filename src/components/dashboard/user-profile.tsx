'use client'

import { Camera } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import FollowButton from './follow-button'
import PostImage from './post-image'
import { ShareProfile } from './share-profile'

type PostType = {
  id: string
  image: string
  caption: string | null
  createdAt: Date
}

type UserProps = {
  user: {
    id: string
    name: string
    username: string
    email: string
    bio: string | null
    image: string | null
    posts: PostType[]
    following: {
      id: string
    }[]
    followers: {
      id: string
      followerId: string
    }[]
  } | null
}

const Profile = ({ user }: UserProps) => {
  const { data: session } = useSession()

  if (!user) return

  return (
    <div className="mb-12 mt-14 flex min-h-[calc(100vh-100px)] flex-col justify-start py-4 md:mb-0 md:mt-0 md:min-h-[calc(100vh)] md:px-4 md:py-8 lg:px-14">
      <div className="h-fit w-full border-b border-foreground/20 px-0 xl:px-12">
        <div className="flex w-screen items-center justify-between space-x-4 px-6 md:w-full md:justify-start lg:space-x-8">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-foreground/10 md:h-28 md:w-28 lg:h-36 lg:w-36">
            <Image
              className="h-full w-full object-cover"
              src={user.image ? user.image : '/images/user-avtar.png'}
              alt={user.username}
              width={100}
              height={100}
            />
          </div>
          <div className="flex w-56 max-w-[350px] justify-between  py-2 text-center sm:w-full md:w-[350px] md:py-8">
            <div>
              <h4 className="text-lg font-medium">{user.posts.length}</h4>
              <p className="text-sm text-primary/90">posts</p>
            </div>
            <Link href={`/dashboard/user/${user.username}/followers`}>
              <h4 className="text-lg font-medium">{user.followers.length}</h4>
              <p className="text-sm text-primary/90">followers</p>
            </Link>
            <Link href={`/dashboard/user/${user.username}/following`}>
              <h4 className="text-lg font-medium">{user.following.length}</h4>
              <p className="text-sm text-primary/90">following</p>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2 md:px-8">
          <h4 className="text-base font-medium text-primary md:text-lg ">
            {user.name}
          </h4>
          {user.bio && (
            <p className="text-sm font-normal text-primary/90">{user.bio}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-between space-x-4 p-2 md:justify-start">
          {session?.user?.email === user.email ? (
            <Link
              href="/dashboard/profile/edit"
              className="w-full min-w-[183px] max-w-72"
            >
              <Button variant="secondary" className="w-full">
                Edit Profile
              </Button>
            </Link>
          ) : (
            <FollowButton followers={user.followers} userId={user.id} />
          )}
          <ShareProfile username={user.username} />
        </div>
      </div>
      {user.posts.length ? (
        <div className="flex flex-wrap gap-x-1 p-1">
          {user.posts.map((post: PostType) => (
            <PostImage key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="rounded-full border-2 border-primary/90 p-4 text-4xl">
            <Camera size={40} strokeWidth={1.5} />
          </div>
          <div className="text-2xl font-medium text-primary/90">
            No Posts Yet
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
