/*
  Warnings:

  - You are about to drop the column `producerId` on the `Crop` table. All the data in the column will be lost.
  - The `code` column on the `Crop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[code]` on the table `Crop` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_producerId_fkey";

-- AlterTable
ALTER TABLE "Crop" DROP COLUMN "producerId",
DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "_ProducerCrops" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProducerCrops_AB_unique" ON "_ProducerCrops"("A", "B");

-- CreateIndex
CREATE INDEX "_ProducerCrops_B_index" ON "_ProducerCrops"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Crop_code_key" ON "Crop"("code");

-- AddForeignKey
ALTER TABLE "_ProducerCrops" ADD CONSTRAINT "_ProducerCrops_A_fkey" FOREIGN KEY ("A") REFERENCES "Crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProducerCrops" ADD CONSTRAINT "_ProducerCrops_B_fkey" FOREIGN KEY ("B") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
