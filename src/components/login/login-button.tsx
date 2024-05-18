import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

export default function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending} className="uppercase">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Logging in
        </>
      ) : (
        'Log in'
      )}
    </Button>
  )
}
