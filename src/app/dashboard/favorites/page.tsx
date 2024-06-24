import { getFavoritePosts } from '@/actions/post'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import PostImage from '@/components/dashboard/post-image'
import { Camera } from 'lucide-react'

export default async function Favorites() {
  const session = await auth()
  const favorites = await getFavoritePosts(session?.user.id as string)

  return (
    <>
      <Header type="favorites" />
      <div className="mb-12 mt-14 h-[calc(100vh-100px)] md:mb-0 md:mt-0 md:h-[calc(100vh)] md:px-4 md:py-6">
        <div className="mb-6 hidden px-2 text-3xl font-medium md:block">
          Favorites
        </div>
        <>
          {favorites.length ? (
            <div className="flex flex-wrap gap-x-1 p-1">
              {favorites.map((post) => (
                <PostImage key={post.id} post={post.post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <div className="rounded-full border-2 border-primary/90 p-4 text-4xl">
                <Camera size={40} strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-medium text-primary/90">
                No Favorites Yet
              </div>
            </div>
          )}
        </>
      </div>
    </>
  )
}
