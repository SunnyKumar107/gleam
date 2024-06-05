import { getPostTable } from '@/actions/post'
import Post from '@/components/dashboard/post'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Dashboard() {
  const posts = await getPostTable()

  return (
    <div className=" mb-12 mt-16 flex flex-col flex-wrap gap-2 sm:px-10 md:mb-0 md:mt-0 md:px-14 xl:px-24">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Link
        href={'/dashboard/create'}
        className="fixed bottom-16 right-5 rounded-full bg-foreground p-2 text-primary-foreground shadow md:hidden"
      >
        <Plus size={25} strokeWidth={3} />
      </Link>
    </div>
  )
}
