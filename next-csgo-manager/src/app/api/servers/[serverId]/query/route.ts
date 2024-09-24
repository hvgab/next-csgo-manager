import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { prisma } from "../../../../../lib/database";
import { Server, RCON, MasterServer } from "@fabricio-191/valve-server-query";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/query
export async function GET(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  console.log("/api/server/[id]/query");
  const server = await prisma.server.findUnique({ where: { id: serverId } });
  if (!server) {
    return NextResponse.json(
      {
        error: "Could not find serverId",
      },
      { status: 404 }
    );
  }
  console.log(`Server: ${server.host} ${server.port}`);

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 5000,
    });
  } catch (error) {
    // console.log(error);
    console.error(`${error.name} ${error.code} ${error.message}`);
    return NextResponse.json(
      {
        type: "Valve Server Query Fail",
        title: `${error?.name}: ${error?.message}`,
        status: 500,
        detail: "Valve Server Query failed, Server is probably offline.",
        instance: `/api/servers/${serverId}/query`,
      },
      { status: 500 }
    );
  }

  let info;
  try {
    info = await serverConnection.getInfo();
  } catch (error) {}

  let mapWorkshopId = null;
  if (info) {
    const mapNameArray = info.map.split("/");
    if (mapNameArray.length == 3) {
      mapWorkshopId = mapNameArray[1];
    } else {
      switch (info.map) {
        case "gd_rialto":
          mapWorkshopId = 951294508;
          break;
        case "de_shortdust":
          mapWorkshopId = 344476023;
          break;
        case "de_overpass":
          mapWorkshopId = 205240106;
          break;
        case "de_inferno":
          mapWorkshopId = 125438669;
          break;
        default:
          break;
      }
    }
  }

  let players;
  try {
    players = await serverConnection.getPlayers();
  } catch (error) {}

  let rules;
  try {
    rules = await serverConnection.getRules();
  } catch (error) {}

  return NextResponse.json({
    mapWorkshopId,
    info,
    players,
    rules,
    lastPing: serverConnection.lastPing,
  });
}
