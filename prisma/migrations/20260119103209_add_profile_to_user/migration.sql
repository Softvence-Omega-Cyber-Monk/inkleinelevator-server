/*
  Warnings:

  - The values [RELEASE] on the enum `PaymentReleaseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentReleaseStatus_new" AS ENUM ('REVIEW', 'RELESE', 'REFUND');
ALTER TABLE "public"."Payment" ALTER COLUMN "releaseStatus" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "releaseStatus" TYPE "PaymentReleaseStatus_new" USING ("releaseStatus"::text::"PaymentReleaseStatus_new");
ALTER TYPE "PaymentReleaseStatus" RENAME TO "PaymentReleaseStatus_old";
ALTER TYPE "PaymentReleaseStatus_new" RENAME TO "PaymentReleaseStatus";
DROP TYPE "public"."PaymentReleaseStatus_old";
ALTER TABLE "Payment" ALTER COLUMN "releaseStatus" SET DEFAULT 'REVIEW';
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile" TEXT;
