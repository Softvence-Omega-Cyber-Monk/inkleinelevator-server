/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_paymentId_fkey";

-- DropIndex
DROP INDEX "Job_paymentId_key";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "paymentId";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "jobId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_jobId_key" ON "Payment"("jobId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("jobId") ON DELETE CASCADE ON UPDATE CASCADE;
