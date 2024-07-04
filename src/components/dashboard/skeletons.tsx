export function PostSkeleton() {
  return (
    <div className="flex w-screen flex-col overflow-hidden pb-1 sm:w-[480px]">
      <div className="flex w-full items-center justify-between px-2 py-2 md:px-1">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-foreground/10"></div>
          <div className="h-4 w-24 rounded bg-foreground/10"></div>
        </div>
        <div className="h-4 w-4 rounded bg-foreground/10"></div>
      </div>
      <div className="h-[500px] w-full bg-foreground/10"></div>
      <div className="mb-2 mt-2 flex items-center justify-between px-2 sm:px-1">
        <div className="flex space-x-5">
          <div className="h-6 w-6 rounded bg-foreground/10"></div>
          <div className="h-6 w-6 rounded bg-foreground/10"></div>
        </div>
        <div className="h-6 w-6 rounded bg-foreground/10"></div>
      </div>
      <div className="ml-2 h-4 w-32 rounded bg-foreground/10 sm:ml-1"></div>
    </div>
  )
}

export function PostsSkeleton() {
  return (
    <div className="mb-12 mt-14 md:mb-0 md:mt-0">
      <div className="flex flex-col flex-wrap gap-2 py-2 sm:px-10  md:px-14 md:py-6 xl:px-24">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  )
}
