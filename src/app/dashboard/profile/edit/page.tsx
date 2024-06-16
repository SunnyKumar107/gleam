import { getUserByEmail } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import EditProfile from '@/components/dashboard/edit-profile'

export default async function EditPage() {
  const session = await auth()
  const user = await getUserByEmail(session?.user.email as string)

  return (
    <>
      <Header type="edit" />
      <EditProfile user={user} />
    </>
  )
}
