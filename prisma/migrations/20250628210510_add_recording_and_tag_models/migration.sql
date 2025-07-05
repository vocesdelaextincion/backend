/*
  Warnings:

  - You are about to drop the column `audioUrl` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Recording` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[s3Url]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[s3Key]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `s3Key` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3Url` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "audioUrl",
DROP COLUMN "date",
DROP COLUMN "duration",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "notes",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "s3Key" TEXT NOT NULL,
ADD COLUMN     "s3Url" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recording_s3Url_key" ON "Recording"("s3Url");

-- CreateIndex
CREATE UNIQUE INDEX "Recording_s3Key_key" ON "Recording"("s3Key");

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
