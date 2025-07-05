/*
  Warnings:

  - You are about to drop the column `s3Key` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `s3Url` on the `Recording` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileUrl]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fileKey]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileKey` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Recording_s3Key_key";

-- DropIndex
DROP INDEX "Recording_s3Url_key";

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "s3Key",
DROP COLUMN "s3Url",
ADD COLUMN     "fileKey" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recording_fileUrl_key" ON "Recording"("fileUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Recording_fileKey_key" ON "Recording"("fileKey");
