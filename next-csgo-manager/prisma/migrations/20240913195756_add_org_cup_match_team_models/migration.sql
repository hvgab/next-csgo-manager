-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "organizationId" TEXT,
    CONSTRAINT "Cup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "serverId" TEXT,
    "matchTitle" TEXT,
    "dateTime" DATETIME,
    "clinch_series" BOOLEAN NOT NULL DEFAULT true,
    "num_maps" INTEGER NOT NULL DEFAULT 3,
    "players_per_team" INTEGER NOT NULL DEFAULT 5,
    "skip_veto" BOOLEAN NOT NULL DEFAULT false,
    "maplist" TEXT NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    "winnerTeamId" TEXT,
    "pluginVersion" TEXT,
    "forfeit" BOOLEAN NOT NULL DEFAULT false,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "max_maps" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "api_key" TEXT,
    "veto_mappool" TEXT,
    "team1_score" INTEGER,
    "team2_score" INTEGER,
    CONSTRAINT "Match_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "steamId" TEXT NOT NULL,
    "teamId" TEXT,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TeamCups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TeamCups_A_fkey" FOREIGN KEY ("A") REFERENCES "Cup" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TeamCups_B_fkey" FOREIGN KEY ("B") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TeamCups_AB_unique" ON "_TeamCups"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamCups_B_index" ON "_TeamCups"("B");
