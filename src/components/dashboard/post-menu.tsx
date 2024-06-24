'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { deletePost } from '@/actions/post'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

export function PostMenu({
  postId,
  userId
}: {
  postId: string
  userId: string
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const handleDeletePost = async () => {
    const res = await deletePost({ postId, authorId: session?.user.id! })

    if (res.success) {
      toast({
        title: 'Post deleted successfully'
      })
      router.replace('/dashboards/profile')
      return
    }

    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: 'Please try again'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="z-0 h-[1.2rem] w-[1.2rem] hover:bg-background"
        >
          <EllipsisVertical size={18} />
          <span className="sr-only">Post menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Download</DropdownMenuItem>
        {session?.user.id === userId && (
          <DropdownMenuItem onClick={handleDeletePost}>Delete</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
