/*
  Warnings:

  - Added the required column `backgroundColor` to the `Button` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `Button` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Button" ADD COLUMN     "backgroundColor" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "textColor" TEXT NOT NULL;
