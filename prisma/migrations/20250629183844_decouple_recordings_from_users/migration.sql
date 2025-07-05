/*
  Warnings:

  - You are about to drop the column `userId` on the `Recording` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_userId_fkey";

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "userId";
