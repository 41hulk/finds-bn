-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" DROP DEFAULT,
ALTER COLUMN "avatar" SET DATA TYPE TEXT;
