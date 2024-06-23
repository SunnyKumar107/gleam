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
    <div className="h-screen">
      <Header type="default" name="Likes" />
      <div className="mb-12 mt-14 flex flex-wrap justify-between p-2 md:mb-0 md:mt-0 md:justify-start md:gap-4 md:p-4">
        {likes.map((like) => (
          <User user={like.author} key={like.author.id} loginUser={user!} />
        ))}
      </div>
    </div>
  )
}
