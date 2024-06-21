'use client'

import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import Image from 'next/image'
import { X, LoaderCircle, Plus } from 'lucide-react'
import { deleteImage } from '@/actions/delete-img'
import { createPost } from '@/actions/post'
import { useSession } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function CreatePost({ screen }: { screen?: string }) {
  const [imgUrl, setImgUrl] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleDeleteImg = async () => {
    setDelLoading(!delLoading)
    if (imgUrl) {
      const res = await deleteImage(imgUrl)
      if (res.success) {
        setDelLoading(false)
        setImgUrl('')
      }
    }
  }

  const handleCreatePost = async () => {
    setLoading(true)
    const res = await createPost({
      image: imgUrl,
      caption: caption,
      authorId: session?.user.id!
    })

    if (res.success) {
      toast({
        title: 'Post created successfully'
      })

      setImgUrl('')
    } else {
      handleDeleteImg()
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive'
      })
    }
    setLoading(false)
    setCaption('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {screen === 'mobile' ? (
          <Button
            size={'icon'}
            className="fixed bottom-20 right-[30px] md:hidden"
          >
            <Plus />
          </Button>
        ) : (
          <Button size={'lg'} className="hidden items-center md:flex">
            <Plus className="mr-2" /> Create
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-center">
          {imgUrl ? (
            <div className="relative max-h-[360px] w-full overflow-hidden bg-background/50">
              <Image
                src={imgUrl}
                alt="imgUrl-upload"
                width={200}
                height={200}
                className="w-full object-cover"
              />
              <button
                onClick={handleDeleteImg}
                disabled={delLoading}
                className="absolute right-2 top-2 rounded-full bg-foreground p-1 text-sm font-medium text-background hover:bg-foreground/90"
              >
                {delLoading ? (
                  <LoaderCircle size={17} className="h-4 w-4 animate-spin" />
                ) : (
                  <X size={17} />
                )}
              </button>
            </div>
          ) : (
            <div className="flex h-56 w-full items-center justify-center border border-foreground/20">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  setImgUrl(res[0].url)
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    title: 'Image upload failed!',
                    description: 'Image size is too big. Max size is 4MB'
                  })
                }}
              />
            </div>
          )}
          <div className="w-full">
            <textarea
              name="caption"
              id="caption"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              cols={30}
              rows={2}
              className="peer block h-full w-full resize-none bg-background p-2 text-base text-primary/90 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreatePost}
            className="min-w-[100px]"
            disabled={loading || !imgUrl}
          >
            {loading ? (
              <LoaderCircle size={15} className="h-4 w-4 animate-spin" />
            ) : (
              'Post'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
