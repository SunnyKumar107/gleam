import Post from '@/components/dashboard/post'
import Comment from '@/components/dashboard/comment'
import { getPostById } from '@/actions/post'
import AddComment from '@/components/dashboard/add-comment'
import { getCommentsByPostId } from '@/actions/comment'
import Header from '@/components/dashboard/common/header'

const post = async ({ params }: { params: { id: string } }) => {
  const postId = params.id
  const post = await getPostById(postId)
  const comments = await getCommentsByPostId(postId)

  return (
    <>
      <Header type="post" />
      <div className="mb-12 mt-14 flex h-[calc(100vh-100px)] flex-col items-center pt-2 md:mb-0 md:mt-0 md:h-[calc(100vh)] md:p-4 lg:flex-row lg:items-start lg:justify-center lg:space-x-4">
        <Post post={post!} />
        <div className="flex w-full flex-col sm:w-[480px] md:relative md:min-h-[560px] lg:border-t-0">
          <div className="mb-12 flex w-full flex-col flex-wrap">
            <div className="hidden px-2 py-3 md:block md:px-1">
              <h1 className="text-lg font-medium">Comments</h1>
            </div>
            {comments.map((comment: any) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
          <AddComment postId={params.id} />
        </div>
      </div>
    </>
  )
}

export default post
