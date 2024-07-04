'use client'

import { getPostTable } from '@/actions/post'
import React, { useEffect, useState } from 'react'
import Post from './post'
import { LoaderCircle } from 'lucide-react'
import { PostsSkeleton } from './skeletons'

type PostType = {
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

export default function PostsContainer() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const initialData = await getPostTable({ page, limit: 15 })
      setLoading(false)
      setPosts(initialData)
    }

    fetchPosts()
  }, [])

  const loadMorePost = async () => {
    setLoading(true)
    const morePost = await getPostTable({ page: page + 1, limit: 15 })

    if (morePost.length > 0) {
      setPosts((currentPosts) => [...currentPosts, ...morePost])
      setPage(page + 1)
    }
    setLoading(false)
  }

  const onScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      await loadMorePost()
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [loading, page])

  return (
    <div className="mb-12 mt-14 md:mb-0 md:mt-0">
      <div className="flex flex-col flex-wrap gap-2 py-2 sm:px-10  md:px-14 md:py-6 xl:px-24">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {loading && <PostsSkeleton />}
      </div>
    </div>
  )
}
