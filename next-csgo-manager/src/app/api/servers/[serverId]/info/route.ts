import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/database";
import { Server, RCON, MasterServer } from "@fabricio-191/valve-server-query";
import { Server as ValveServer } from "@fabricio-191/valve-server-query/typings";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/info
export async function GET(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  const server = await prisma.server.findUnique({ where: { id: serverId } });
  console.log(server);
  if (!server) {
    return NextResponse.json(
      { error: "Could not find server" },
      { status: 404 }
    );
  }

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 5000,
    });
  } catch (error) {
    // console.log(error);
    console.error("server connection");
    console.error(`${error.name} ${error.code} ${error.message}`);
    return NextResponse.json(
      {
        type: "Valve Server Query Fail",
        title: `${error?.name}: ${error?.message}`,
        status: 500,
        detail: "Valve Server Query failed, Server is probably offline.",
        instance: `/api/servers/${serverId}/info`,
      },
      { status: 500 }
    );
  }

  let info: ValveServer.Info | null = null;
  try {
    info = await serverConnection.getInfo();
  } catch (error) {
    console.error("error on getInfo");
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
  // Do I need this?
  if (info == null) {
    return NextResponse.json(
      {
        type: "Valve Server Query Fail",
        title: `Info is null`,
        status: 500,
        detail: "Valve Server Query failed, could not query for info.",
        instance: `/api/servers/${serverId}/query`,
      },
      { status: 500 }
    );
  }
  return NextResponse.json({ info });
}
