'use client'

import { Camera } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type PostType = {
  id: number
  image: string
  caption: string
  createdAt: Date
}

type UserProps = {
  user: {
    id: number
    name: string
    username: string
    email: string
    bio: string | null
    image: string | null
    posts: PostType[]
  }
}

const Profile = ({ user }: UserProps) => {
  const { data: session } = useSession()

  const reversedPosts = user.posts.reverse()

  return (
    <div className="mb-12 mt-16 flex flex-col justify-start py-4 md:mb-0  md:mt-0 md:px-4 md:py-8 lg:px-16">
      <div className="h-fit w-full border-b border-gray-300 px-0 xl:px-12">
        <div className="flex w-screen items-center justify-between space-x-4 px-6 md:w-full md:justify-start lg:space-x-8">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 md:h-28 md:w-28 lg:h-36 lg:w-36">
            <Image
              className="min-h-full w-full object-cover"
              src={user.image ? user.image : '/images/user-avtar.png'}
              alt={user.username}
              width={50}
              height={50}
            />
          </div>
          <div className="flex w-56 max-w-[350px] justify-between  py-2 text-center sm:w-full md:w-[350px] md:py-8">
            <div>
              <h4 className="text-lg font-medium">{user.posts.length}</h4>
              <p className="text-sm text-gray-800">posts</p>
            </div>
            <div>
              <h4 className="text-lg font-medium">0</h4>
              <p className="text-sm text-gray-800">followers</p>
            </div>
            <div>
              <h4 className="text-lg font-medium">0</h4>
              <p className="text-sm text-gray-800">following</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 md:px-8">
          <h4 className="text-base font-medium text-slate-900 md:text-lg ">
            {user.name}
          </h4>
          {user.bio && (
            <p className="text-sm font-normal text-gray-800">{user.bio}</p>
          )}
        </div>

        <div className="flex w-full items-center justify-between space-x-4 p-2 md:justify-start">
          {session?.user?.email === user?.email ? (
            <Link
              href="/dashboard/profile/edit"
              className="hover:foreground/20 w-full max-w-72 space-x-4 rounded-md bg-foreground/10 py-2 text-center text-sm font-medium  text-foreground"
            >
              Edit Profile
            </Link>
          ) : (
            <button className="w-full max-w-72 space-x-4 rounded-md bg-sky-600 py-2 text-sm font-medium text-white  hover:bg-sky-500">
              Follow
            </button>
          )}
          <button className="hover:foreground/20 w-full max-w-72 space-x-4 rounded-md bg-foreground/10 py-2 text-sm font-medium  text-foreground">
            Share Profile
          </button>
        </div>
      </div>
      {user.posts.length ? (
        <div className="grid w-full grid-cols-3 gap-1 p-1">
          {reversedPosts.map((post: PostType) => (
            <Link
              href={`/dashboard/post/${post.id}`}
              key={post.id}
              className="mb-1 h-[125px] w-[125px] overflow-hidden bg-gray-200 md:h-52 md:w-52 lg:h-80 lg:w-80"
            >
              <Image
                className="h-full w-full object-cover"
                src={post.image}
                alt={post.caption}
                width={400}
                height={500}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <div className="rounded-full border-2 border-slate-900 p-4 text-4xl">
            <Camera />
          </div>
          <div className="text-2xl font-medium text-slate-900">
            No Posts Yet
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
