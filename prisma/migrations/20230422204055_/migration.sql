/*
  Warnings:

  - You are about to alter the column `metric_value` on the `User_metric_data` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" REAL NOT NULL,
    "goal_value" INTEGER,
    "user_id" INTEGER NOT NULL,
    "metric_id" INTEGER NOT NULL,
    CONSTRAINT "User_metric_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_metric_data_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User_metric_data" ("date", "goal_value", "id", "metric_id", "metric_value", "user_id") SELECT "date", "goal_value", "id", "metric_id", "metric_value", "user_id" FROM "User_metric_data";
DROP TABLE "User_metric_data";
ALTER TABLE "new_User_metric_data" RENAME TO "User_metric_data";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
