-- CreateTable
CREATE TABLE "rfp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "git_owner" TEXT NOT NULL,
    "git_repo" TEXT NOT NULL,
    "git_title" TEXT NOT NULL,
    "git_body" TEXT NOT NULL,
    "git_url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rfp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rfp" ADD CONSTRAINT "rfp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
