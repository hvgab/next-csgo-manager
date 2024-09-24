import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";

// GET /api/servers/
export async function GET() {
  const servers = await prisma.server.findMany();
  return NextResponse.json(servers);
}
