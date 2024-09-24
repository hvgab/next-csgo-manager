/*
  Warnings:

  - You are about to drop the column `rcon_password` on the `Server` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PlayersOnTeam" (
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("teamId", "userId"),
    CONSTRAINT "PlayersOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayersOnTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Server" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "rconPassword" TEXT,
    "ownerUserId" TEXT NOT NULL,
    CONSTRAINT "Server_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Server" ("host", "id", "ownerUserId", "port") SELECT "host", "id", "ownerUserId", "port" FROM "Server";
DROP TABLE "Server";
ALTER TABLE "new_Server" RENAME TO "Server";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
