import { getUserByUsername } from '@/actions/user'
import { auth } from '@/auth'
import Profile from '@/components/dashboard/user-profile'

export default async function ProfilePage() {
  const session = await auth()
  const user = await getUserByUsername(session?.user.username as string)

  return <Profile user={user} />
}
