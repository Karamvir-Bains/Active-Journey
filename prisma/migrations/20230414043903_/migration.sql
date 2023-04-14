-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "layout" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "unit" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User_metric_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metric_value" INTEGER NOT NULL,
    "goal_value" INTEGER,
    "user_id" INTEGER NOT NULL,
    "metric_id" INTEGER NOT NULL,
    CONSTRAINT "User_metric_data_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_metric_data_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_first_name_key" ON "User"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
