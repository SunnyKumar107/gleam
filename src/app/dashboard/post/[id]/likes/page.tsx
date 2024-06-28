import { getLikesByPostId } from '@/actions/post'
import { getUserByUsername } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import User from '@/components/dashboard/user'

export default async function Likes({ params }: { params: { id: string } }) {
  const session = await auth()
  const likes = await getLikesByPostId(params.id)
  const user = await getUserByUsername(session?.user.username as string)

  return (
    <main className="min-h-screen">
      <Header type="default" name="Likes" />
      <div className="mb-12 mt-14 h-full px-2 py-4 md:mb-0 md:mt-0 md:h-[calc(100vh)] md:px-4 md:py-6">
        <div className="mb-6 hidden px-2 text-3xl font-medium md:block">
          Likes
        </div>
        <div className="flex flex-wrap justify-between gap-4 md:justify-start">
          {likes.map((like) => (
            <User user={like.author} key={like.author.id} loginUser={user!} />
          ))}
        </div>
      </div>
    </main>
  )
}
