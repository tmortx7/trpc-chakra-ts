-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('storm', 'sanitary', 'field', 'other');

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "role" "RoleEnumType" DEFAULT 'sanitary';

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
