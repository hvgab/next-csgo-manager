/*
 Warnings:
 
 - Added the required column `ownerUserId` to the `Server` table without a default value. This is not possible if the table is not empty.
 
 */
-- CreateTable
CREATE TABLE "_ServerUserAdmins" (
  "A" INTEGER NOT NULL,
  "B" TEXT NOT NULL,
  CONSTRAINT "_ServerUserAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "_ServerUserAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys = OFF;

CREATE TABLE "new_Server" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "host" TEXT NOT NULL,
  "port" INTEGER NOT NULL,
  "rcon_password" TEXT,
  "ownerUserId" TEXT NOT NULL,
  CONSTRAINT "Server_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Server" (
    "host",
    "id",
    "port",
    "rcon_password",
    "ownerUserId"
  )
SELECT "host",
  "id",
  "port",
  "rcon_password",
  1
FROM "Server";

DROP TABLE "Server";

ALTER TABLE "new_Server"
  RENAME TO "Server";

PRAGMA foreign_key_check;

PRAGMA foreign_keys = ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ServerUserAdmins_AB_unique" ON "_ServerUserAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_ServerUserAdmins_B_index" ON "_ServerUserAdmins"("B");