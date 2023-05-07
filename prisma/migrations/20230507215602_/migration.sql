/*
  Warnings:

  - Added the required column `title` to the `Metric` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "journal_order" INTEGER NOT NULL
);
INSERT INTO "new_Metric" ("id", "journal_order", "name", "property", "unit") SELECT "id", "journal_order", "name", "property", "unit" FROM "Metric";
DROP TABLE "Metric";
ALTER TABLE "new_Metric" RENAME TO "Metric";
CREATE UNIQUE INDEX "Metric_journal_order_key" ON "Metric"("journal_order");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
