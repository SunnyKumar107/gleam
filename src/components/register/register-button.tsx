'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

export default function RegisterButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" disabled={pending} className="uppercase">
      {pending ? (
        <>
          <LoaderCircle className="mb-0.5 mr-2 h-4 w-4 animate-spin" />
          Signing up
        </>
      ) : (
        'Sign up'
      )}
    </Button>
  )
}
