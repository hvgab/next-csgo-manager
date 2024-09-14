import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";

// GET /api/cups/{cupId}
export async function GET(
  request: Request,
  { params: { cupId } }: { params: { cupId: string } }
) {
  const cup = await prisma.cup.findUnique({
    where: { id: cupId },
  });
  return NextResponse.json(cup);
}

// PUT /api/cups/{cupId}
export async function PUT(
  request: Request,
  { params: { cupId } }: { params: { cupId: string } }
) {
  const { name, organizationId } = await request.json();
  const cup = await prisma.cup.update({
    where: { id: cupId },
    data: { name, organizationId },
  });
  return NextResponse.json(cup);
}

// DELETE /api/cups/{cupId}
export async function DELETE(
  request: Request,
  { params: { cupId } }: { params: { cupId: string } }
) {
  await prisma.cup.delete({
    where: { id: cupId },
  });
  return NextResponse.json({}, { status: 204 });
}
