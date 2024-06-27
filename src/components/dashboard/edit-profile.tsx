'use client'

import { UploadButton } from '@/utils/uploadthing'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { getUserByUsername, updateUser } from '@/actions/user'
import { LoaderCircle, X } from 'lucide-react'
import { deleteImage } from '@/actions/delete-img'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { UserData } from '@/auth.config'
import { useSession } from 'next-auth/react'
import { AlertDelete } from './delete-account-alert'
import { revalidate } from '@/actions/revalidate'

type UserProps = {
  user: UserData
}

const EditProfile = ({ user }: UserProps) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [uniqueUsername, setUniqueUsername] = useState('')
  const [bio, setBio] = useState<string | null>(null)
  const [delLoading, setDelLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { data: session, update } = useSession()
  const router = useRouter()

  useEffect(() => {
    setImgUrl(user.image)
    setFullName(user.name)
    setUsername(user.username)
    setUniqueUsername(user.username)
    setBio(user.bio)
  }, [])

  const handleDeleteImg = async () => {
    if (imgUrl) {
      setDelLoading(true)
      const res = await deleteImage(imgUrl)
      if (res.success) {
        setDelLoading(false)
        setImgUrl(null)
      }
    }
  }

  let isUpdate =
    user.name !== fullName ||
    user.username !== uniqueUsername ||
    user.bio !== bio ||
    user.image !== imgUrl

  const isUsernameExist = async (uname: string) => {
    setUsername(uname.trim().toLowerCase())
    setMsg('')
    isUpdate = false
    if (uname === user.username) {
      setUniqueUsername(user.username)
      return
    }

    if (uname.length < 3) {
      setUniqueUsername(user.username as string)
      setMsg('username must be at least 3 characters')
      return
    }

    const exist = await getUserByUsername(uname)
    if (exist) {
      setUniqueUsername(user.username as string)
      setMsg('username already exist')
      return
    } else {
      setUniqueUsername(uname)
      setMsg('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (isUpdate) {
      const res = await updateUser({
        id: user.id,
        name: fullName,
        username: uniqueUsername,
        bio: bio,
        image: imgUrl
      })
      if (res.success) {
        await update({
          ...session!.user,
          name: fullName,
          username: uniqueUsername,
          bio: bio,
          image: imgUrl
        })

        revalidate()
        setLoading(false)
        toast({
          title: 'Profile Updated Successfully'
        })
        router.replace('/dashboard/profile')
        return
      }
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Please try again'
      })
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-14 h-[calc(100vh-56px)] bg-background px-4 py-4 md:mt-0 md:h-screen md:px-8 md:py-6"
    >
      <div className="mb-4 flex items-center justify-between rounded-lg border bg-foreground/5 p-4">
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-foreground/10">
            <Image
              src={imgUrl ? imgUrl : '/images/user-avtar.png'}
              alt="profile"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          {imgUrl && (
            <button
              onClick={handleDeleteImg}
              disabled={delLoading}
              className="absolute right-[-5px] top-[-5px] rounded-full bg-foreground p-1 text-sm font-medium text-background hover:bg-foreground/90"
            >
              {delLoading ? (
                <LoaderCircle size={15} className="h-4 w-4 animate-spin" />
              ) : (
                <X size={15} />
              )}
            </button>
          )}
        </div>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={handleDeleteImg}
            onClientUploadComplete={(res: { url: string }[]) => {
              setImgUrl(res[0].url)
            }}
            onUploadError={(error) => {
              toast({
                variant: 'destructive',
                title: 'Image upload failed!',
                description: 'Image size is too big. Max size is 4MB'
              })
            }}
          />
        </div>
      </div>
      <div className="w-full">
        <Label className="mb-4 px-3">Name</Label>
        <Input
          className="mb-4"
          id="fullname"
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={fullName}
          onChange={(e: any) => setFullName(e.target.value)}
          required
        />
        <Label className="mb-4 px-3">Username</Label>
        <Input
          className="mb-4 lowercase"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => isUsernameExist(e.target.value)}
          required
        />
        {msg && (
          <p className="mb-2 mt-[-12px] px-3 text-sm font-medium text-red-500">
            {msg}
          </p>
        )}
        <Label className="mb-4 px-3">Bio</Label>
        <Textarea
          className="mb-4 resize-none"
          id="Bio"
          name="Bio"
          placeholder="Bio"
          rows={2}
          cols={20}
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <AlertDelete imgUrl={imgUrl} />
        <Button
          className="w-[200px] uppercase"
          disabled={!fullName || !username || !isUpdate || loading}
          type="submit"
        >
          {loading ? (
            <span className="flex w-full justify-center">
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </span>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
    </form>
  )
}

export default EditProfile
