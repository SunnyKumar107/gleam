'use client'

import {
  RemoveFavoritePost,
  addFavoritePost,
  likePost,
  removeLikePost
} from '@/actions/post'
import { cn } from '@/lib/utils'
import {
  Star,
  Dot,
  EllipsisVertical,
  Heart,
  MessageSquareMore
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { formatDistance, subDays } from 'date-fns'
import { PostMenu } from './post-menu'

type PostProps = {
  post: {
    id: string
    image: string
    caption: string | null
    createdAt: Date
    author: {
      id: string
      username: string
      image: string | null
    }
    postLikes: {
      id: string
      authorId: string
    }[]
    favoritedBy: {
      authorId: string
      id: string
    }[]
    comments: {
      id: string
    }[]
  }
}

const Post = ({ post }: PostProps) => {
  const [isLike, setIsLike] = useState(false)
  const [totalLikes, setTotalLikes] = useState(post.postLikes.length || 0)
  const [favoritePost, setFavoritePost] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  const isUserLike = post.postLikes.find(
    (like: { authorId: string }) => like.authorId === session?.user.id
  )

  const isUserFavorite = post.favoritedBy.find(
    (favorite: { authorId: string }) => favorite.authorId === session?.user.id
  )

  useEffect(() => {
    if (isUserLike) {
      setIsLike(true)
    }
    if (isUserFavorite) {
      setFavoritePost(true)
    }
  }, [session])

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      setTotalLikes(totalLikes - 1)
      await removeLikePost({ likeId: isUserLike?.id! })
      return
    }

    setTotalLikes(totalLikes + 1)
    await likePost({
      postId: post.id,
      authorId: session?.user.id!
    })
  }

  const handleFavoritePost = async () => {
    setFavoritePost(!favoritePost)
    if (favoritePost) {
      await RemoveFavoritePost({ favoritePostId: isUserFavorite?.id! })
      return
    }

    await addFavoritePost({
      postId: post.id,
      authorId: session?.user.id!
    })
  }

  return (
    <div
      className={cn('flex w-screen flex-col pb-1 sm:w-[480px]', {
        'border-b border-foreground/20': pathname !== '/dashboard'
      })}
    >
      <div className="flex w-full items-center justify-between px-2 py-2 md:px-1">
        <div className="flex items-center">
          <Link
            href={
              session?.user.username === post.author.username
                ? '/dashboard/profile'
                : `/dashboard/user/${post.author.username}`
            }
            className="items-centre flex h-8 w-8 overflow-hidden rounded-full bg-foreground/10"
          >
            <Image
              src={
                post.author.image ? post.author.image : '/images/user-avtar.png'
              }
              alt={'avatar'}
              width={100}
              height={100}
              className="min-h-8 object-cover"
            />
          </Link>
          <div className="ml-2 flex items-center">
            <Link
              href={
                session?.user.username === post.author.username
                  ? '/dashboard/profile'
                  : `/dashboard/user/${post.author.username}`
              }
            >
              <h3 className="flex items-center text-sm font-semibold">
                {post.author.username}
                <Dot size={18} />
              </h3>
            </Link>
            <span className="flex items-center text-xs font-normal">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true
              })}
            </span>
          </div>
        </div>
        <div className="-mb-2">
          <PostMenu
            postId={post.id}
            userId={post.author.id}
            imgUrl={post.image}
          />
        </div>
      </div>
      <div className="flex max-h-[500px] w-full items-center overflow-hidden bg-foreground/10">
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
          <Link href={`/dashboard/post/${post.id}`}>
            <MessageSquareMore />
          </Link>
        </div>
        <div>
          <button onClick={handleFavoritePost}>
            {favoritePost ? <Star color="#ffd700" fill="#ffd700" /> : <Star />}
          </button>
        </div>
      </div>
      {totalLikes ? (
        <Link
          href={`/dashboard/post/${post.id}/likes`}
          className="mb-1 px-2 text-sm font-medium sm:px-1"
        >
          {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
        </Link>
      ) : null}
      <div className="px-2 text-sm sm:px-1">
        <p>
          <span className="mr-2 font-semibold">{post.author.username}</span>
          {post.caption}
        </p>
      </div>
      {post.comments.length > 0 && (
        <Link
          href={`/dashboard/post/${post.id}`}
          className={`mt-1 cursor-pointer px-2 text-sm font-normal text-foreground/70 md:px-1 ${
            pathname === `/dashboard/post/${post.id}` && 'hidden'
          }`}
        >
          View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Link>
      )}
    </div>
  )
}

export default Post
