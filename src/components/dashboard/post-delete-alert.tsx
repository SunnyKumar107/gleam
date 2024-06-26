'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { deletePost } from '@/actions/post'
import { useToast } from '../ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { deleteImage } from '@/actions/delete-img'

export function PostDeleteAlert({
  postId,
  authorId,
  imgUrl
}: {
  postId: string
  authorId: string
  imgUrl: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)

  const handleDeletePost = async () => {
    setPending(true)
    await deleteImage(imgUrl)
    const res = await deletePost({ postId, authorId: authorId })

    setPending(false)
    if (res.success) {
      toast({
        title: 'Post deleted successfully'
      })
      if (pathname !== '/dashboard') {
        router.replace('/dashboard/profile')
      }
      return
    }

    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: 'Please try again'
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="h-full w-full px-2 py-1 text-start text-sm">
          {pending ? (
            <LoaderCircle size={16} className="h-4 w-4 animate-spin" />
          ) : (
            'Delete'
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[360px] sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePost}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
