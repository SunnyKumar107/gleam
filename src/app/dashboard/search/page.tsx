'use client'

import { getUserByUsername, getUserTable } from '@/actions/user'
import User from '@/components/dashboard/user'
import { Input } from '@/components/ui/input'
import { Search, User as UserIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type User = {
  id: string
  email: string
  username: string
  name: string
  image: string | null
  bio: string | null
}

type LoginUser = {
  id: string
  following: {
    id: string
    followingId: string
  }[]
}

export default function SearchPage() {
  const { data: session } = useSession()
  if (!session) return null

  const [loginUser, setLoginUser] = useState<LoginUser | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      const user = await getUserByUsername(session.user.username)
      setLoginUser(user)

      const userTable = await getUserTable()
      setUsers(userTable)
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(inputText.toLowerCase())
  )

  return (
    <div className="h-screen p-2 md:p-4">
      <div className="max-w-lg">
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Search"
          className="h-12 w-full"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="h-full max-h-[calc(100vh-100px)] md:max-h-[calc(100vh-100px)]">
        {inputText ? (
          <>
            {filteredUsers.length ? (
              <div className="flex flex-wrap justify-between gap-4 py-4 pb-12 md:justify-start md:py-4">
                {filteredUsers.map((user) => (
                  <User user={user} key={user.id} loginUser={loginUser!} />
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <div className="rounded-full border-2 border-primary/90 p-4 text-4xl">
                  <UserIcon size={40} strokeWidth={1.5} />
                </div>
                <div className="text-2xl font-medium text-primary/90">
                  No User Found
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="text-primary/30">
              <Search size={80} strokeWidth={2} />
            </div>
            <h1 className="font-semi-bold text-6xl text-foreground/30">
              Search
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
