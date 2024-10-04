import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/database";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { NextAuthRequest } from "next-auth/lib";

export async function POST(request: Request) {
  const { name, organizationId } = await request.json();
  const cup = await prisma.cup.create({
    data: { name, organizationId },
  });
  return NextResponse.json(cup, { status: 201 });
}

export async function GET() {
  const cups = await prisma.cup.findMany();
  return NextResponse.json(cups);
}
