import { getPostTable } from '@/actions/post'
import { getUserByUsername, getUserTable } from '@/actions/user'
import { auth } from '@/auth'
import Header from '@/components/dashboard/common/header'
import { CreatePost } from '@/components/dashboard/create-post'
import Post from '@/components/dashboard/post'
import User from '@/components/dashboard/user'
import { ThemeToggle } from '@/components/theme-toggle'

export default async function Dashboard() {
  const session = await auth()
  const posts = await getPostTable()
  const users = await getUserTable(session?.user.id as string)
  const loginUser = await getUserByUsername(session?.user.username as string)

  return (
    <main className="flex w-full">
      <Header type="home" />
      <div className="mb-12 mt-14 flex flex-col flex-wrap gap-2 py-2 sm:px-10 md:mb-0 md:mt-0 md:px-14 md:py-6 xl:px-24">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="fixed right-6 top-0 hidden max-h-[400px] pt-8 xl:block">
        <h3 className="mb-2 text-lg font-medium">Suggested for you</h3>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
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
