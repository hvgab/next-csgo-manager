/*
  Warnings:

  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL DEFAULT '',
    "flag" TEXT NOT NULL DEFAULT 'NO',
    "logo" TEXT,
    "player1" TEXT,
    "player2" TEXT,
    "player3" TEXT,
    "player4" TEXT,
    "player5" TEXT,
    "player6" TEXT,
    "player7" TEXT
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameServerId" TEXT,
    "matchTitle" TEXT DEFAULT '',
    "matchDateTime" DATETIME,
    "clinchSeries" BOOLEAN NOT NULL DEFAULT true,
    "numMaps" INTEGER NOT NULL DEFAULT 3,
    "playersPerTeam" INTEGER NOT NULL DEFAULT 5,
    "skipVeto" BOOLEAN NOT NULL DEFAULT false,
    "maplist" TEXT NOT NULL DEFAULT '',
    "team1Id" TEXT,
    "team2Id" TEXT,
    "seriesType" TEXT NOT NULL,
    "winnerId" TEXT,
    "pluginVersion" TEXT DEFAULT 'unknown',
    "forfeit" BOOLEAN DEFAULT false,
    "cancelled" BOOLEAN DEFAULT false,
    "finished" BOOLEAN DEFAULT false,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "maxMaps" INTEGER,
    "title" TEXT DEFAULT '',
    "apiKey" TEXT DEFAULT '',
    "vetoMappool" TEXT DEFAULT '',
    "team1Score" INTEGER,
    "team2Score" INTEGER,
    CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_gameServerId_fkey" FOREIGN KEY ("gameServerId") REFERENCES "Server" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Organization_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "organizationId" TEXT,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Cup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cup_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OrganizationAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OrganizationAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrganizationAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CupAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CupAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Cup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CupAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__ServerUserAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ServerUserAdmins_A_fkey" FOREIGN KEY ("A") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ServerUserAdmins_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ServerUserAdmins" ("A", "B") SELECT "A", "B" FROM "_ServerUserAdmins";
DROP TABLE "_ServerUserAdmins";
ALTER TABLE "new__ServerUserAdmins" RENAME TO "_ServerUserAdmins";
CREATE UNIQUE INDEX "_ServerUserAdmins_AB_unique" ON "_ServerUserAdmins"("A", "B");
CREATE INDEX "_ServerUserAdmins_B_index" ON "_ServerUserAdmins"("B");
CREATE TABLE "new_Server" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "rcon_password" TEXT,
    "ownerUserId" TEXT NOT NULL,
    CONSTRAINT "Server_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Server" ("host", "id", "ownerUserId", "port", "rcon_password") SELECT "host", "id", "ownerUserId", "port", "rcon_password" FROM "Server";
DROP TABLE "Server";
ALTER TABLE "new_Server" RENAME TO "Server";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationAdmins_AB_unique" ON "_OrganizationAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationAdmins_B_index" ON "_OrganizationAdmins"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CupAdmins_AB_unique" ON "_CupAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_CupAdmins_B_index" ON "_CupAdmins"("B");
