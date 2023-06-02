import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/query
export async function GET(request: Request, { params: { id }, }: { params: { id: number }; }) {

  const server = await prisma.server.findUnique({ where: { id: Number(id) } });

  const serverConnection = await Server({
    ip: server.host,
    port: server.port,
    timeout: 3000,
  });
  console.log("serverConnection");
  console.log(serverConnection);

  const info = await serverConnection.getInfo();
  console.log("info");
  console.log(info);

  const players = await serverConnection.getPlayers();
  console.log("players");
  console.log(players);

  const rules = await serverConnection.getRules();
  console.log("rules");
  console.log(rules);

  console.log("serverConnection.lastPing");
  console.log(serverConnection.lastPing);

  return NextResponse.json({ info, players, rules, "lastPing": serverConnection.lastPing });
}

