import { getFollowingByUsername, getUserByUsername } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import User from '@/components/dashboard/user'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function Following({
  params
}: {
  params: { username: string }
}) {
  const session = await auth()
  const followingUsers = await getFollowingByUsername(params.username)
  const user = await getUserByUsername(session?.user.username as string)

  return (
    <main className="min-h-screen">
      <Header type="following" name={params.username} />
      <div className="mb-12 mt-14 flex h-full flex-wrap justify-between gap-4 p-2 md:mb-0 md:justify-start md:p-4">
        {followingUsers.map((following) => (
          <User
            user={following.following}
            key={following.following.id}
            loginUser={user!}
          />
        ))}
      </div>
    </main>
  )
}
