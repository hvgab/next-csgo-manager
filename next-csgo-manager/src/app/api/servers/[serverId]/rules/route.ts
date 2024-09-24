import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";
import { Server, RCON, MasterServer } from "@fabricio-191/valve-server-query";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/rules
export async function GET(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  //
  console.log("serverId");
  console.log(serverId);

  // Get server from db
  const server = await prisma.server.findUnique({
    where: { id: serverId },
  });

  if (!server) {
    return NextResponse.json(
      { status: "error", error: "server not found" },
      { status: 404 }
    );
  }

  // Start valve connection
  const serverConnection = await Server({
    ip: server.host,
    port: server.port,
    timeout: 3000,
  });

  const rules = await serverConnection.getRules();
  console.log("rules");
  console.log(rules);

  return NextResponse.json({ rules: rules });
}
