import { getFollowersByUsername, getUserByUsername } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import User from '@/components/dashboard/user'

export default async function Followers({
  params
}: {
  params: { username: string }
}) {
  const session = await auth()
  const followers = await getFollowersByUsername(params.username)
  const user = await getUserByUsername(session?.user.username as string)

  return (
    <div className="h-screen">
      <Header type="followers" name={params.username} />
      <div className="mb-12 mt-14 flex flex-wrap justify-between p-2 md:mb-0 md:justify-start md:gap-4 md:p-4">
        {followers.map((follower) => (
          <User
            user={follower.follower}
            key={follower.follower.id}
            loginUser={user!}
          />
        ))}
      </div>
    </div>
  )
}
