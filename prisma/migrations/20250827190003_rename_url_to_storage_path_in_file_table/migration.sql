/*
  Warnings:

  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "url",
ADD COLUMN     "storage_path" TEXT NOT NULL DEFAULT '';
