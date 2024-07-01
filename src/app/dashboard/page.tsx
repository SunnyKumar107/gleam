import { getUserByUsername, getUserTable } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import { CreatePost } from '@/components/dashboard/create-post'
import PostsContainer from '@/components/dashboard/posts-container'
import { PostsSkeleton } from '@/components/dashboard/skeletons'
import User from '@/components/dashboard/user'
import { ThemeToggle } from '@/components/theme-toggle'
import { Suspense } from 'react'

export default async function Dashboard() {
  const session = await auth()
  const users = await getUserTable(session?.user.id as string)
  const loginUser = await getUserByUsername(session?.user.username as string)

  const randomUsers = users.sort(() => 0.5 - Math.random()).slice(0, 4)

  return (
    <main className="flex min-h-screen w-full">
      <Header type="home" />
      <Suspense fallback={<PostsSkeleton />}>
        <PostsContainer />
      </Suspense>
      <div className="fixed right-6 top-0 hidden max-h-[400px] pt-8 xl:block">
        <h3 className="mb-2 text-lg font-medium">Suggested for you</h3>
        <div className="grid grid-cols-2 gap-4">
          {randomUsers.map((user) => (
            <User user={user} key={user.id} loginUser={loginUser!} />
          ))}
        </div>
      </div>
      <CreatePost screen="mobile" />
      <div className="fixed bottom-8 right-12 hidden md:block">
        <ThemeToggle />
      </div>
    </main>
  )
}
