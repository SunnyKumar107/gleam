'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { Ellipsis, LoaderCircle } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { deleteComment } from '@/actions/comment'

export function CommentMenu({
  commentId,
  commentAuthorId,
  postAuthorId
}: {
  commentId: string
  commentAuthorId: string
  postAuthorId: string
}) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [pending, setPending] = useState(false)

  const handleDeleteComment = async () => {
    setPending(true)
    const res = await deleteComment({ commentId })

    setPending(false)
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
        {(() => {
          if (session?.user.id === commentAuthorId) {
            return (
              <button
                className="h-full w-full px-2 py-1 text-start text-sm"
                onClick={handleDeleteComment}
              >
                {pending ? (
                  <LoaderCircle size={16} className="h-4 w-4 animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            )
          }
          if (session?.user.id === postAuthorId) {
            return (
              <button
                className="h-full w-full px-2 py-1 text-start text-sm"
                onClick={handleDeleteComment}
              >
                {pending ? (
                  <LoaderCircle size={16} className="h-4 w-4 animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            )
          }
        })()}
        {/* {session?.user.id === commentAuthorId && (
          <button
            className="h-full w-full px-2 py-1 text-start text-sm"
            onClick={handleDeleteComment}
          >
            {pending ? (
              <LoaderCircle size={16} className="h-4 w-4 animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        )}
        {session?.user.id === postAuthorId && (
          <button
            className="h-full w-full px-2 py-1 text-start text-sm"
            onClick={handleDeleteComment}
          >
            {pending ? (
              <LoaderCircle size={16} className="h-4 w-4 animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
