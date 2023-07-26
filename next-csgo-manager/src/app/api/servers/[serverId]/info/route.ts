import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/info
export async function GET(request: Request, { params: { serverId }, }: { params: { serverId: number }; }) {

  const server = await prisma.server.findUnique({ where: { id: Number(serverId) } });

  const serverConnection = await Server({
    ip: server.host,
    port: server.port,
    timeout: 3000,
  });

  const info = await serverConnection.getInfo();
  return NextResponse.json({ info: info });
}
