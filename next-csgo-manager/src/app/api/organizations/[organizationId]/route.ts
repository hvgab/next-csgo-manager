import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";

// GET /api/organization/[id]
export async function GET(
  request: Request,
  { params: { organizationId } }: { params: { organizationId: string } }
) {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
    include: { cups: true },
  });

  return NextResponse.json(organization);
}

export async function PUT(
  request: Request,
  { params: { organizationId } }: { params: { organizationId: string } }
) {
  const { name } = await request.json();
  console.log({ name });
  const organization = await prisma.organization.update({
    where: { id: organizationId },
    data: { name },
  });
  return NextResponse.json(organization);
}

export async function DELETE(
  request: Request,
  { params: { organizationId } }: { params: { organizationId: string } }
) {
  await prisma.organization.delete({
    where: { id: organizationId },
  });
  return NextResponse.json({}, { status: 204 });
}
