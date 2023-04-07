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
    "layout" TEXT NOT NULL,
    "user_metric_dataId" INTEGER,
    CONSTRAINT "Users_user_metric_dataId_fkey" FOREIGN KEY ("user_metric_dataId") REFERENCES "User_metric_data" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Metrics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_metric_dataId" INTEGER,
    CONSTRAINT "Metrics_user_metric_dataId_fkey" FOREIGN KEY ("user_metric_dataId") REFERENCES "User_metric_data" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "property" INTEGER NOT NULL,
    "metricsId" INTEGER,
    CONSTRAINT "Properties_metricsId_fkey" FOREIGN KEY ("metricsId") REFERENCES "Metrics" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_first_name_key" ON "Users"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
