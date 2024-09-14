import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";

// GET /api/servers/[id]
export async function GET(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  const result = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: { owner: true, admins: true },
  });

  return NextResponse.json(result);
}
