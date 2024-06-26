'use client'

import { likeComment, removeLikeComment } from '@/actions/comment'
import { formatDistance } from 'date-fns'
import { Dot, Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CommentMenu } from './comment-menu'

type CommentProps = {
  comment: {
    id: string
    text: string
    createdAt: Date
    updatedAt: Date
    author: {
      id: string
      username: string
      image: string | null
    }
    commentLikes: {
      id: string
      authorId: string
    }[]
    post: {
      authorId: string
    }
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
          className="h-9 w-9 overflow-hidden rounded-full bg-foreground/10"
        >
          <Image
            className="min-h-9 object-cover"
            src={
              comment.author.image
                ? comment.author.image
                : '/images/user-avtar.png'
            }
            alt={comment.author.username}
            width={100}
            height={100}
          />
        </Link>
        <div className="flex max-w-[300px] flex-col justify-start md:max-w-[350px]">
          <div className="flex items-center">
            <Link
              href={
                session?.user.username === comment.author.username
                  ? '/dashboard/profile'
                  : `/dashboard/user/${comment.author.username}`
              }
            >
              <h3 className="flex items-center text-sm font-medium">
                {comment.author.username}
                <Dot size={16} />
              </h3>
            </Link>
            <span className="mr-2 text-xs font-normal">
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true
              })}
            </span>
            <CommentMenu
              commentId={comment.id}
              userId={comment.author.id}
              postAuthorId={comment.post.authorId}
            />
          </div>
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
