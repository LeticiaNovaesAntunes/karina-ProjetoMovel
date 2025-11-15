/*
  Warnings:

  - You are about to drop the column `senha` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "senha",
ADD COLUMN     "passwordHash" TEXT NOT NULL DEFAULT 'INVALID_HASH_PENDING_UPDATE',
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
