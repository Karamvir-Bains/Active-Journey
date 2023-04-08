/*
  Warnings:

  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `layout` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metric_id" INTEGER NOT NULL,
    CONSTRAINT "User_metric_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_metric_data_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "layout" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "first_name", "id", "last_name", "layout", "password") SELECT "email", "first_name", "id", "last_name", "layout", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_first_name_key" ON "User"("first_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
