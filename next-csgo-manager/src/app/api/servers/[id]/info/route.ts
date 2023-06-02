import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/info
export async function GET(request: Request, { params: { id }, }: { params: { id: number }; }) {

  const server = await prisma.server.findUnique({ where: { id: Number(id) } });

  const serverConnection = await Server({
    ip: server.host,
    port: server.port,
    timeout: 3000,
  });

  const info = await serverConnection.getInfo();
  console.log("info");
  console.log(info);

  return NextResponse.json(info);
}
