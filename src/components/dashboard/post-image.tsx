import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type PostProps = {
    id: string
    image: string
    caption: string | null
}

const PostImage = ({ post }: { post: PostProps }) => {
  return (
    <Link
      href={`/dashboard/post/${post.id}`}
      className="mb-1 h-[125px] w-[125px] overflow-hidden bg-foreground/10 md:h-52 md:w-52 lg:h-80 lg:w-80"
    >
      <Image
        className="h-full w-full object-cover hover:scale-105"
        src={post.image}
        alt={post.caption ? post.caption : 'Post Image'}
        width={400}
        height={500}
      />
    </Link>
  )
}

export default PostImage
