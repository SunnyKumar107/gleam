'use client'

import {
  Dot,
  EllipsisVertical,
  Heart,
  MessageSquareMore,
  Share2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Post = () => {
  const [isLike, setIsLike] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      setTotalLikes(totalLikes - 1)
      return
    }

    setTotalLikes(totalLikes + 1)
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
              src={'https://i.pravatar.cc/300'}
              alt={'avatar'}
              width={40}
              height={40}
            />
          </Link>
          <div className="ml-2 flex items-center">
            <Link href={`/dashboard/user`}>
              <h3 className="flex items-center text-sm font-semibold">
                John Doe
                <Dot />
              </h3>
            </Link>
            <span className="flex items-center text-xs font-normal">
              2d ago
            </span>
          </div>
        </div>
        <div>
          <EllipsisVertical />
        </div>
      </div>
      <div className="flex max-h-[500px] w-full items-center overflow-hidden bg-gray-200">
        <Image
          src={'https://i.pravatar.cc/300'}
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
          <Share2 />
        </div>
      </div>
      {totalLikes ? (
        <div className="mb-1 px-2 text-sm font-medium sm:px-1">
          {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
        </div>
      ) : null}
      <div className="flex gap-2 px-2 text-sm sm:px-1">
        <h3 className="flex items-center font-semibold">John Doe</h3>{' '}
        <span className="">Hello world</span>
      </div>
    </div>
  )
}

export default Post
