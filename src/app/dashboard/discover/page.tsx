'use client'

import { getPostsForDiscover } from '@/actions/post'
import Header from '@/components/dashboard/common/header'
import PostImage from '@/components/dashboard/post-image'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type PostType = {
  id: string
  image: string
  caption: string | null
}

export default function Favorites() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const initialData = await getPostsForDiscover({ page, limit: 21 })
      setPosts(initialData)
    }

    fetchPosts()
  }, [])

  const loadMorePost = async () => {
    setLoading(true)
    const morePost = await getPostsForDiscover({ page: page + 1, limit: 21 })

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
    <>
      <Header type="discover" />
      <div className="mb-12 mt-14 flex min-h-[calc(100vh-100px)] flex-col md:mb-0 md:mt-0 md:min-h-[calc(100vh)] md:px-4 md:pb-2 md:pt-6">
        <div className="mb-6 hidden px-2 text-3xl font-medium md:block">
          Discover
        </div>
        <div className="flex flex-wrap gap-x-1 p-1">
          {posts.map((post) => (
            <PostImage key={post.id} post={post} />
          ))}
        </div>
        {loading && (
          <div>
            <LoaderCircle className="mx-auto mb-0.5 h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
    </>
  )
}
