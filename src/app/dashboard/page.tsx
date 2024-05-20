import { Button } from '@/components/ui/button'
import { logoutUser } from '@/actions/user'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello World</h1>
      <form action={logoutUser} className="mt-8">
        <Button type="submit" className="mt-2">
          signout
        </Button>
      </form>
    </div>
  )
}
