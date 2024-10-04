/*
  Warnings:

  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "RconCommandRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    CONSTRAINT "RconCommandRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RconCommandRequest_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RconCommandResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serverId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    CONSTRAINT "RconCommandResponse_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RconCommandResponse_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "RconCommandRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
