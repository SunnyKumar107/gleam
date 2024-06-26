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
import { useSession } from 'next-auth/react'
import { PostDeleteAlert } from './post-delete-alert'

export function PostMenu({
  postId,
  userId,
  imgUrl
}: {
  postId: string
  userId: string
  imgUrl: string
}) {
  const { data: session } = useSession()

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
          <PostDeleteAlert
            postId={postId}
            authorId={session?.user.id}
            imgUrl={imgUrl}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
