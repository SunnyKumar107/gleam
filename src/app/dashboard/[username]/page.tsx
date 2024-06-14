import { getUserByUsername } from '@/actions/user'
import Profile from '@/components/dashboard/common/user-profile'

export default async function UserProfilePage ({ params }: { params: { username: string } }) {
  const username = params.username
  const user = await getUserByUsername(username)
  console.log('username', user)

  return <Profile user={user} />
}

