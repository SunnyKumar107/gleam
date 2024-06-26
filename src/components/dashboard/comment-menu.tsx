'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { Ellipsis } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { deleteComment } from '@/actions/comment'

export function CommentMenu({
  commentId,
  userId,
  postAuthorId
}: {
  commentId: string
  userId: string
  postAuthorId: string
}) {
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleDeleteComment = async () => {
    const res = await deleteComment({ commentId })
    if (res.success) {
      toast({
        title: 'Comment deleted successfully'
      })
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
          <Ellipsis size={16} />
          <span className="sr-only">Comment menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session?.user.id === userId ||
          (session?.user.id === postAuthorId && (
            <DropdownMenuItem onClick={handleDeleteComment}>
              Delete
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
