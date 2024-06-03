import Post from '@/components/dashboard/post'

export default function Dashboard() {
  return (
    <div className="mb-12 mt-16 flex flex-col flex-wrap gap-2 sm:px-10 md:mb-0 md:mt-0 md:px-14 xl:px-24">
      <Post />
      <Post />
      <Post />
    </div>
  )
}
