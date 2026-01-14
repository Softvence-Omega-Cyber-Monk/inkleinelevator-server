/*
  Warnings:

  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PAID', 'UNPAID', 'CANCEL');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" "paymentStatus" NOT NULL;
