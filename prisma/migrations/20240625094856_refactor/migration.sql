/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `FavoritePost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_authorId_key" ON "CommentLike"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritePost_authorId_key" ON "FavoritePost"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_authorId_key" ON "PostLike"("authorId");
