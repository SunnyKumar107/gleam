import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="h-64 w-64">
        <Image
          width={860}
          height={571}
          src="/images/page_not_found.svg"
          alt="page not found"
        />
      </div>
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ size: 'lg' }),
          'inline-flex items-center justify-center gap-1 uppercase'
        )}
      >
        <Home className="mb-1 h-4 w-4" /> Home
      </Link>
    </div>
  )
}
