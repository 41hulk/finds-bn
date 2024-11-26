-- CreateTable
CREATE TABLE "Waitlister" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Waitlister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlister_email_key" ON "Waitlister"("email");
