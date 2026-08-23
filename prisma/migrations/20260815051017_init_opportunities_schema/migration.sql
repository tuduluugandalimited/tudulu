-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('EXTERNAL_URL', 'EMAIL', 'PORTAL', 'ORGANIZATION_WEBSITE', 'OTHER');

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "application_method" "ApplicationMethod" NOT NULL DEFAULT 'EXTERNAL_URL',
ADD COLUMN     "description_translations" JSONB,
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "source_url" TEXT,
ADD COLUMN     "summary_translations" JSONB,
ADD COLUMN     "title_translations" JSONB;

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "headquarters" TEXT NOT NULL DEFAULT 'Kampala, Uganda',
    "email" TEXT NOT NULL DEFAULT 'tuduluugandalimited@gmail.com',
    "phone" TEXT NOT NULL DEFAULT '+256 750 692 621',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "opportunities_status_type_expires_at_idx" ON "opportunities"("status", "type", "expires_at");
