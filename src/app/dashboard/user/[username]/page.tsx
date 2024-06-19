import { getUserByUsername } from '@/actions/user'
import Header from '@/components/dashboard/common/header'
import Profile from '@/components/dashboard/user-profile'

export default async function UserProfilePage({
  params
}: {
  params: { username: string }
}) {
  const username = params.username
  const user = await getUserByUsername(username)

  return (
    <>
      <Header type="user" name={username} />
      <Profile user={user} />
    </>
  )
}
