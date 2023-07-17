import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/query
export async function GET(request: Request, { params: { serverId }, }: { params: { serverId: number }; }) {

  const server = await prisma.server.findUnique({ where: { id: Number(serverId) } });
  console.log(`server: ${JSON.stringify(server)}`)

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 3000,
    });
  } catch (error) {
    console.log(error)
    console.error(`Could not query server. ${error.code} ${error.message}`)
    return NextResponse.json({ error: error.message })
  }
  console.log("serverConnection");
  console.log(serverConnection);

  const info = await serverConnection.getInfo();
  console.log("info");
  console.log(info);

  let mapWorkshopId = "";
  const mapNameArray = info.map.split("/");
  if (mapNameArray.length == 3) {
    mapWorkshopId = mapNameArray[1];
  }

  const players = await serverConnection.getPlayers();
  console.log("players");
  console.log(players);

  const rules = await serverConnection.getRules();
  console.log("rules");
  console.log(rules);

  console.log("serverConnection.lastPing");
  console.log(serverConnection.lastPing);

  return NextResponse.json({ mapWorkshopId, info, players, rules, "lastPing": serverConnection.lastPing });
}

