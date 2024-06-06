import { getPostTable } from '@/actions/post'
import { CreatePost } from '@/components/dashboard/create-post'
import Post from '@/components/dashboard/post'

export default async function Dashboard() {
  const posts = await getPostTable()

  return (
    <div className=" mb-12 mt-16 flex flex-col flex-wrap gap-2 sm:px-10 md:mb-0 md:mt-0 md:px-14 xl:px-24">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <CreatePost screen="mobile" />
    </div>
  )
}
