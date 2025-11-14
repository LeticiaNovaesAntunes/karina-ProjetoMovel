-- CreateEnum
CREATE TYPE "Level" AS ENUM ('FACIL', 'MEDIO', 'DIFICIL');

-- CreateEnum
CREATE TYPE "PartExercised" AS ENUM ('POSTURA', 'ABDOMEN', 'PERNAS', 'CARDIO');

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "exercise_name" TEXT NOT NULL,
    "level" "Level" NOT NULL DEFAULT 'FACIL',
    "image_url" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "part_exercised" "PartExercised" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);
