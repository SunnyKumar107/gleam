import { getPostTable } from '@/actions/post'
import Header from '@/components/dashboard/common/header'
import { CreatePost } from '@/components/dashboard/create-post'
import Post from '@/components/dashboard/post'
import { ThemeToggle } from '@/components/theme-toggle'

export default async function Dashboard() {
  const posts = await getPostTable()

  return (
    <>
      <Header type="home" />
      <div className="mb-12 mt-14 flex flex-col flex-wrap gap-2 pt-2 sm:px-10 md:mb-0 md:mt-0 md:px-14 xl:px-24">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <CreatePost screen="mobile" />
        <div className="fixed bottom-8 right-12 hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
