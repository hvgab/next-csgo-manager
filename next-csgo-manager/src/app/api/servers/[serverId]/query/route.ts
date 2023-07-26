import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/query
export async function GET(request: Request, { params: { serverId }, }: { params: { serverId: number }; }) {
  console.log("Server Query")
  const server = await prisma.server.findUnique({ where: { id: Number(serverId) } });
  console.log(`Server: ${server?.host} ${server?.port}`)

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 3000,
    });
  } catch (error) {
    console.log(error)
    console.error(`${error.name} ${error.code} ${error.message}`)
    return NextResponse.json(
      {
        "type": "Valve Server Query Fail",
        "title": `${error?.name}: ${error?.message}`,
        "status": 500,
        "detail": "Valve Server Query failed, Server is probably offline.",
        "instance": `/api/servers/${serverId}/query`
      }, { status: 500 }
    )
  }

  const info = await serverConnection.getInfo();

  let mapWorkshopId = null;
  const mapNameArray = info.map.split("/");
  if (mapNameArray.length == 3) {
    mapWorkshopId = mapNameArray[1];
  } else {
    switch (info.map) {
      case "gd_rialto":
        mapWorkshopId = 951294508
        break;
      case "de_shortdust":
        mapWorkshopId = 344476023
        break;
      case "de_overpass":
        mapWorkshopId = 205240106
        break;
      case "de_inferno":
        mapWorkshopId = 125438669
        break;
      default:
        break;
    }
  }

  const players = await serverConnection.getPlayers();
  const rules = await serverConnection.getRules();

  return NextResponse.json({ mapWorkshopId, info, players, rules, "lastPing": serverConnection.lastPing });
}

