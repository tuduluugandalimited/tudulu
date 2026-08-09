-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('Full-time', 'Part-time', 'Contract', 'Consultancy', 'Internship');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('Entry', 'Mid-Level', 'Senior', 'Executive');

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "application_email" TEXT,
ADD COLUMN     "application_url" TEXT,
ADD COLUMN     "employment_type" "EmploymentType",
ADD COLUMN     "experience_level" "ExperienceLevel",
ADD COLUMN     "qualifications" TEXT[],
ADD COLUMN     "responsibilities" TEXT[],
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
