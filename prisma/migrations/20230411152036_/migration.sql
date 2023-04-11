/*
  Warnings:

  - Added the required column `property` to the `Metric` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "metric_id" INTEGER NOT NULL,
    CONSTRAINT "User_metric_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_metric_data_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User_metric_data" ("date", "id", "metric_id", "metric_value", "user_id") SELECT "date", "id", "metric_id", "metric_value", "user_id" FROM "User_metric_data";
DROP TABLE "User_metric_data";
ALTER TABLE "new_User_metric_data" RENAME TO "User_metric_data";
CREATE TABLE "new_Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);
INSERT INTO "new_Metric" ("id", "name", "unit") SELECT "id", "name", "unit" FROM "Metric";
DROP TABLE "Metric";
ALTER TABLE "new_Metric" RENAME TO "Metric";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
