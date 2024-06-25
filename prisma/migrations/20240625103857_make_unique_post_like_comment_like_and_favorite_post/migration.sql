/*
  Warnings:

  - A unique constraint covering the columns `[authorId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId,postId]` on the table `FavoritePost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId,postId]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PostLike_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_authorId_commentId_key" ON "CommentLike"("authorId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritePost_authorId_postId_key" ON "FavoritePost"("authorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_authorId_postId_key" ON "PostLike"("authorId", "postId");
