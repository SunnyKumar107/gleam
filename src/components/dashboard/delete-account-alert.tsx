'use client'

import { deleteImage } from '@/actions/delete-img'
import { deleteUser, logoutUser } from '@/actions/user'
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
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function AlertDelete({ imgUrl }: { imgUrl: string | null }) {
  const [pending, setPending] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleDeleteAccount = async () => {
    setPending(true)
    if (imgUrl) {
      await deleteImage(imgUrl)
    }
    const res = await deleteUser({ userId: session?.user.id! })

    setPending(false)
    if (res.success) {
      logoutUser()
      toast({
        title: 'Account deleted successfully'
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          disabled={pending}
          className="w-[200px] uppercase text-red-600"
        >
          {pending ? (
            <>
              <LoaderCircle className="mb-0.5 mr-2 h-4 w-4 animate-spin" />
              Deleting Account
            </>
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Account
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[360px] sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
