-- CreateEnum
CREATE TYPE "PaymentReleaseStatus" AS ENUM ('REVIEW', 'RELEASE');

-- AlterEnum
ALTER TYPE "paymentStatus" ADD VALUE 'REFUND';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "releaseStatus" "PaymentReleaseStatus" NOT NULL DEFAULT 'REVIEW';
