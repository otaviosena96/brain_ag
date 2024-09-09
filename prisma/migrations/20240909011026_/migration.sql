/*
  Warnings:

  - Added the required column `city` to the `Producer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_name` to the `Producer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producer" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "property_name" TEXT NOT NULL;
