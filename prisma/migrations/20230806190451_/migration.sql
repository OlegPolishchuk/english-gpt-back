/*
  Warnings:

  - You are about to drop the column `user` on the `Word` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_user_fkey";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "user",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
