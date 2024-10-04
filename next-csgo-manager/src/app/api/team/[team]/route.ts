import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";

// GET /api/teams/{teamId}
export async function GET(
  request: Request,
  { params: { teamId } }: { params: { teamId: string } }
) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
  });
  return NextResponse.json(team);
}

// PUT /api/teams/{teamId}
export async function PUT(
  request: Request,
  { params: { teamId } }: { params: { teamId: string } }
) {
  const { name } = await request.json();
  const team = await prisma.team.update({
    where: { id: teamId },
    data: { name },
  });
  return NextResponse.json(team);
}

// DELETE /api/teams/{teamId}
export async function DELETE(
  request: Request,
  { params: { teamId } }: { params: { teamId: string } }
) {
  await prisma.team.delete({
    where: { id: teamId },
  });
  return NextResponse.json({}, { status: 204 });
}
