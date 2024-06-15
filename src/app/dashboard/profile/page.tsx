import { getUserByUsername } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import Profile from '@/components/dashboard/user-profile'

export default async function ProfilePage() {
  const session = await auth()
  const user = await getUserByUsername(session?.user.username as string)

  return (
    <>
      <Header type="profile" username={user?.username} />
      <Profile user={user} />
    </>
  )
}
