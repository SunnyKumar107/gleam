'use client'

import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="h-64 w-64">
        <Image
          width={1023}
          height={786}
          src="/images/bug_fixing.svg"
          alt="something went wrong"
        />
      </div>
      <Button onClick={() => reset()} size="lg" className="uppercase">
        <RefreshCw className="mr-2 h-4 w-4" /> Try Again
      </Button>
    </div>
  )
}
