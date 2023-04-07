/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "layout" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "metric_id" INTEGER,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" INTEGER NOT NULL,
    CONSTRAINT "User_metric_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_metric_data_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metrics" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "property_id" INTEGER,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "Metrics_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Properties" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "property" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_first_name_key" ON "Users"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
