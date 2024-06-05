'use client'

import {
  Bookmark,
  Dot,
  EllipsisVertical,
  Heart,
  MessageSquareMore
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type PostProps = {
  post: {
    id: number
    image: string
    caption: string | null
    createdAt: Date
    author: {
      id: number
      email: string
      username: string
      password: string
      name: string
      image: string | null
      bio: string | null
      createdAt: Date
      updatedAt: Date
    }
  }
}

const Post = ({ post }: PostProps) => {
  const [isLike, setIsLike] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [savePost, setSavePost] = useState(false)

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      setTotalLikes(totalLikes - 1)
      return
    }

    setTotalLikes(totalLikes + 1)
  }

  const handleSavePost = async () => {
    setSavePost(!savePost)
  }

  return (
    <div
      className="flex w-screen flex-col  border-b-[1px] border-gray-200
        pb-1 sm:w-[480px]"
    >
      <div className="flex w-full items-center justify-between px-2 py-2 md:px-1">
        <div className="flex items-center">
          <Link
            href={`/dashboard/user`}
            className="items-centre flex h-8 w-8 overflow-hidden rounded-full bg-gray-200"
          >
            <Image
              src={
                post.author.image ? post.author.image : '/images/user-avtar.png'
              }
              alt={'avatar'}
              width={40}
              height={40}
            />
          </Link>
          <div className="ml-2 flex items-center">
            <Link href={`/dashboard/user`}>
              <h3 className="flex items-center text-sm font-semibold">
                {post.author.username}
                <Dot />
              </h3>
            </Link>
            <span className="flex items-center text-xs font-normal">
              2d ago
            </span>
          </div>
        </div>
        <div>
          <EllipsisVertical size={18} />
        </div>
      </div>
      <div className="flex max-h-[500px] w-full items-center overflow-hidden bg-gray-200">
        <Image
          src={post.image}
          alt={'caption'}
          width={500}
          height={500}
          className="w-full"
        />
      </div>
      <div className="mb-1 mt-2 flex items-center justify-between px-2 sm:px-1">
        <div className="flex space-x-5">
          <button onClick={handleUpdateLike}>
            {isLike ? <Heart color="#ff0000" fill="#ff0000" /> : <Heart />}
          </button>
          <Link href={`/post/1`}>
            <MessageSquareMore />
          </Link>
        </div>
        <div>
          <button onClick={handleSavePost}>
            {savePost ? <Bookmark fill="#000" /> : <Bookmark />}
          </button>
        </div>
      </div>
      {totalLikes ? (
        <div className="mb-1 px-2 text-sm font-medium sm:px-1">
          {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
        </div>
      ) : null}
      {post.caption && (
        <div className="flex gap-2 px-2 text-sm sm:px-1">
          <h3 className="flex items-center font-semibold">
            {post.author.username}
          </h3>{' '}
          <span className="">{post.caption}</span>
        </div>
      )}
    </div>
  )
}

export default Post
