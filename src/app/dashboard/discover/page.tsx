import { getPostsForDiscover } from '@/actions/post'
import Header from '@/components/dashboard/common/header'
import PostImage from '@/components/dashboard/post-image'

export default async function Favorites() {
  const posts = await getPostsForDiscover()

  return (
    <>
      <Header type="discover" />
      <div className="mb-12 mt-14 flex h-[calc(100vh-100px)] flex-col md:mb-0 md:mt-0 md:h-[calc(100vh)] md:px-4 md:py-6">
        <div className="mb-6 hidden px-2 text-3xl font-medium md:block">
          Discover
        </div>
        <div className="flex flex-wrap gap-x-1 p-1">
          {posts.map((post) => (
            <PostImage key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
