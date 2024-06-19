'use client'

import { likeComment, removeLikeComment } from '@/actions/comment'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type CommentProps = {
  comment: {
    id: string
    text: string
    createdAt: Date
    updatedAt: Date
    author: {
      username: string
      image: string | null
    }
    commentLikes: {
      id: string
      authorId: string
    }[]
  }
}

const Comment = ({ comment }: CommentProps) => {
  const [totalLikes, setTotalLikes] = useState(comment.commentLikes.length)
  const [isLike, setIsLike] = useState(false)
  const { data: session } = useSession()

  const isUserLike = comment.commentLikes.find(
    (like: { authorId: string }) => like.authorId == session?.user.id
  )

  useEffect(() => {
    if (isUserLike) {
      setIsLike(true)
    }
  }, [session])

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      setTotalLikes(totalLikes - 1)
      await removeLikeComment({ likeId: isUserLike?.id! })
      return
    }

    setTotalLikes(totalLikes + 1)
    await likeComment({
      commentId: comment?.id,
      authorId: session?.user.id!
    })
  }

  return (
    <div className="flex w-full justify-between px-2 py-3 md:px-1">
      <div className="flex items-start space-x-3">
        <Link
          href={
            session?.user.username === comment.author.username
              ? '/dashboard/profile'
              : `/dashboard/user/${comment.author.username}`
          }
          className="h-9 w-9 overflow-hidden rounded-full bg-gray-200"
        >
          <Image
            className="min-h-9 object-cover"
            src={
              comment.author.image
                ? comment.author.image
                : '/images/user-avtar.png'
            }
            alt={comment.author.username}
            width={40}
            height={40}
          />
        </Link>
        <div className="flex max-w-[300px] flex-col justify-start md:max-w-[350px]">
          <Link
            href={
              session?.user.username === comment.author.username
                ? '/dashboard/profile'
                : `/dashboard/user/${comment.author.username}`
            }
            className="text-xs font-medium"
          >
            {comment.author.username}
          </Link>
          <p className="text-sm">{comment.text}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start">
        <button onClick={handleUpdateLike}>
          {isLike ? (
            <Heart size={14} color="#ff0000" fill="#ff0000" />
          ) : (
            <Heart size={14} />
          )}
        </button>
        {totalLikes > 0 && <p className="text-xs">{totalLikes}</p>}
      </div>
    </div>
  )
}

export default Comment
