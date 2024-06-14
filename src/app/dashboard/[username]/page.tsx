import { getUserByUsername } from '@/actions/user'
import Profile from '@/components/dashboard/user-profile'

export default async function UserProfilePage({
  params
}: {
  params: { username: string }
}) {
  const username = params.username
  const user = await getUserByUsername(username)

  return <Profile user={user} />
}
