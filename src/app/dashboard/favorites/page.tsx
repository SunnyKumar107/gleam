import { getFavorites } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import Favorite from '@/components/dashboard/favorite-post'
import { Camera } from 'lucide-react'

export default async function Favorites() {
  const session = await auth()
  const favorites = await getFavorites(session?.user.id as string)

  return (
    <>
      <Header type="favorites" />
      <div className="mb-12 mt-14 flex h-[calc(100vh-100px)] flex-col justify-start md:mb-0 md:mt-0 md:h-[calc(100vh)] md:px-4 md:py-8 lg:px-8">
        {favorites.length ? (
          <div className="grid w-full grid-cols-3 gap-1 p-1">
            {favorites.map((post) => (
              <Favorite key={post.id} post={post} />
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
      </div>
    </>
  )
}
