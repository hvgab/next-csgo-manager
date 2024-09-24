import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/database";
import { Server, RCON, MasterServer } from "@fabricio-191/valve-server-query";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/players
export async function GET(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  const server = await prisma.server.findUnique({
    where: { id: serverId },
  });

  if (!server) {
    return NextResponse.json(
      { error: "Could not find server in db" },
      { status: 404 }
    );
  }

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 3000,
    });
  } catch (error) {
    console.log("Could not get server connection");
    return NextResponse.json(
      { error: "could not get server connection" },
      { status: 500 }
    );
  }
  console.log("serverConnection");
  console.log(serverConnection);

  let players;
  try {
    players = await serverConnection.getPlayers();
  } catch (error) {
    const message = "could not get players from server";
    console.log(message);
    return NextResponse.json({ error: message });
  }
  console.log("players");
  console.log(players);

  console.log(`Players: \n ${JSON.stringify({ players: players })}`);

  return NextResponse.json({ players: players });
}
