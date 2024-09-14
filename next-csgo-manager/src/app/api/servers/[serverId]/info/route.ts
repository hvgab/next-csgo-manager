import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/database";
import { Server, RCON, MasterServer } from "@fabricio-191/valve-server-query";

// Extend the BigInt prototype to add a toJSON method
// This is needed because JSON.stringify doesn't handle BigInt values by default
BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

// GET /api/servers/[id]/info
export async function GET(
  request: Request,
  // Destructure the serverId from the params object in the function arguments
  { params: { serverId } }: { params: { serverId: string } }
) {
  // Use Prisma to find a server in the database with the provided serverId
  const server = await prisma.server.findUnique({
    where: {
      id: serverId.toLowerCase(),
    },
  });

  // If the server is not found, log an error and return a response with a status message
  if (server == undefined) {
    console.error("Prisma getServer for %s:%s failed", serverId);
    return NextResponse.json({
      status: "server is undefined",
      info: "",
      server: server,
    });
  }
  console.log("Prisma getServer for %s:%s success", server.host, server.port);

  let serverConnection;
  try {
    serverConnection = await Server({
      ip: server.host,
      port: server.port,
      timeout: 30000,
    });
    console.log("serverConnection for %s:%s success", server.host, server.port);
  } catch (error) {
    let errorMessage;
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error";
    }

    console.error(
      "Error on Valve Server Query *%s* for %s:%s.",
      errorMessage,
      server.host,
      server.port
    );

    if (errorMessage === "Invalid IP/Hostname") {
      return NextResponse.json(
        {
          status: "invalid ip/hostname",
          info: "",
          server: server,
        },
        { status: 400 }
      );
    } else if (errorMessage === "Response timeout") {
      return NextResponse.json(
        {
          status: "response timeout",
          info: "",
          server: server,
        },
        { status: 408 }
      );
    } else {
      return NextResponse.json(
        {
          status: "unknown error",
          info: "",
          server: server,
        },
        { status: 500 }
      );
    }
  }

  try {
    const info = await serverConnection.getInfo();
    console.log("getInfo for %s:%s success", server.host, server.port);
    return NextResponse.json({
      status: "success",
      info: info,
      server: server,
    });
  } catch (error) {
    console.error("Error on serverConnection.getInfo", error);
    return NextResponse.json(
      {
        status: "error on serverConnection.getInfo",
        info: "",
        server: server,
      },
      { status: 500 }
    );
  }
}
