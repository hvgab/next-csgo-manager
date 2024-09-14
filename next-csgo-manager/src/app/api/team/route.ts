import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/database";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { NextAuthRequest } from "next-auth/lib";

export async function POST(request: Request) {
  const { name } = await request.json();
  const team = await prisma.team.create({
    data: { name },
  });
  return NextResponse.json(team, { status: 201 });
}

export async function GET() {
  const teams = await prisma.team.findMany();
  return NextResponse.json(teams);
}
