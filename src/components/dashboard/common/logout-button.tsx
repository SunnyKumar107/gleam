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
          <LoaderCircle className="mb-0.5 mr-2 h-4 w-4 animate-spin" />
          Logging out
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </>
      )}
    </Button>
  )
}
