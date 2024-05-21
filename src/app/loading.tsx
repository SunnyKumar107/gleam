import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="mb-0.5 mr-2 h-12 w-12 animate-spin" />
    </div>
  )
}
