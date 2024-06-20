'use client'

import { Button } from '@/components/ui/button'
import { LoaderCircle, LogOut } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function LogoutButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="secondary"
      type="submit"
      disabled={pending}
      className="w-full uppercase"
    >
      {pending ? (
        <>
          <LoaderCircle className="mb-0.5 h-4 w-4 animate-spin" />
          <p className="ml-2 hidden md:block"> Logging out</p>
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <p className="ml-2 hidden md:block"> Log out</p>
        </>
      )}
    </Button>
  )
}
