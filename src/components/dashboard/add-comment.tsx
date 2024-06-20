'use client'

import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useToast } from '../ui/use-toast'
import { Send, SendHorizontal } from 'lucide-react'
import { addComment } from '@/actions/comment'

const AddComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('')
  const { data: session } = useSession()
  const { toast } = useToast()
  const textAreaRef = useRef<any>(null)

  useEffect(() => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }, [comment])

  const handleAddComment = async () => {
    const res = await addComment({
      authorId: session?.user.id!,
      postId: postId,
      text: comment
    })

    if (res?.success) {
      setComment('')
      toast({
        title: 'Comment added successfully'
      })
      return
    }

    toast({
      title: 'Something went wrong',
      description: 'Please try again',
      variant: 'destructive'
    })
  }

  return (
    <div className="fixed bottom-0 z-20 flex w-full items-center justify-between space-x-2 border-t-[1px] border-foreground/20 bg-background p-2 md:absolute md:border-t-0">
      <div className="flex w-full items-center justify-between space-x-2 rounded-md">
        <div className="h-7 w-7 min-w-7 overflow-hidden rounded-full bg-foreground/10">
          <Image
            className="min-h-7 object-cover"
            src={
              session?.user.image
                ? session?.user.image
                : '/images/user-avtar.png'
            }
            alt={session?.user.name || 'user avatar'}
            width={100}
            height={100}
          />
        </div>
        <div className="w-full">
          <textarea
            name="comment"
            id="comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            cols={30}
            rows={1}
            ref={textAreaRef}
            className="peer block h-full w-full resize-none bg-background px-1 py-2 text-sm placeholder:text-gray-500 focus:outline-none active:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center py-2">
        <button
          onClick={handleAddComment}
          className="text-2xl"
          disabled={!comment}
        >
          {comment ? <Send /> : <SendHorizontal />}
        </button>
      </div>
    </div>
  )
}

export default AddComment
