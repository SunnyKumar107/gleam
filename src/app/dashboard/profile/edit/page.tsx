import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import EditProfile from '@/components/dashboard/edit-profile'

export default async function EditPage() {
  const session = await auth()
  const user = session?.user!

  return (
    <>
      <Header type="edit" />
      <EditProfile user={user} />
    </>
  )
}
