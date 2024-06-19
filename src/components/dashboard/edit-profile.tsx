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
  const { update } = useSession()
  const router = useRouter()

  useEffect(() => {
    setImgUrl(user.image)
    setFullName(user.name)
    setUsername(user.username)
    setUniqueUsername(user.username)
    setBio(user.bio)
  }, [user, router])

  const updateProfileImage = async () => {
    await updateUser({
      id: user.id,
      name: fullName,
      username: uniqueUsername,
      bio: bio,
      image: imgUrl
    })
    update({ ...user, image: imgUrl })
  }

  const handleDeleteImg = async () => {
    if (imgUrl) {
      setDelLoading(true)
      const res = await deleteImage(imgUrl)
      if (res.success) {
        setDelLoading(false)
        setImgUrl('')
      }
      updateProfileImage()
    }
  }

  let isUpdate =
    user.name !== fullName ||
    user.username !== uniqueUsername ||
    user.bio !== bio ||
    user.image !== imgUrl

  const isUsernameExist = async (uname: string) => {
    setUsername(uname.trim())
    setMsg('')
    if (uname === user.username) {
      setUniqueUsername(user.username)
      isUpdate = false
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

  const handleSubmit = async () => {
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
        update({
          ...user,
          name: fullName,
          username: uniqueUsername,
          bio: bio,
          image: imgUrl
        })
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
    <form className="relative mt-14 h-[calc(100vh-56px)] bg-background px-4 py-4 md:mt-0 md:px-8 md:py-6">
      <div className="mb-4 flex items-center justify-between rounded-lg border bg-gray-50 p-4">
        <div className="relative">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-foreground/10">
            <Image
              src={imgUrl ? imgUrl : '/images/user-avtar.png'}
              alt="profile"
              width={100}
              height={100}
              className="min-h-20 object-cover"
            />
          </div>
          {imgUrl && (
            <button
              onClick={handleDeleteImg}
              disabled={delLoading}
              className="absolute right-[-8px] top-[-8px] rounded-full bg-slate-800 p-1 text-sm font-medium text-white hover:bg-slate-700"
            >
              {delLoading ? (
                <LoaderCircle size={17} className="h-4 w-4 animate-spin" />
              ) : (
                <X size={17} />
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
              updateProfileImage()
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
          className="mb-4"
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
          required
        />
      </div>
      <Button
        className="float-right min-w-[100px]"
        disabled={!isUpdate || loading}
        onClick={handleSubmit}
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
    </form>
  )
}

export default EditProfile
