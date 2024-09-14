import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/database";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { NextAuthRequest } from "next-auth/lib";

// GET /api/organizations/
export async function GET() {
  const organizations = await prisma.organization.findMany({
    include: { cups: true },
  });
  return NextResponse.json(organizations);
}

// POST /api/organizations

export const POST = auth(async (req) => {
  // Check Auth
  console.log(req.auth);
  if (!req.auth) {
    return NextResponse.json({ error: "Not signed in..." });
  }

  console.log("bodyUsed: ", req.bodyUsed);

  let reqData;

  try {
    const json = await req.json();
    console.log("json: ");
    console.log(json);
    reqData = json;
  } catch (error) {
    NextResponse.json({ error: "No body=" }, { status: 400 });
  }

  // const reqDataObject = JSON.parse(reqData);
  // console.log("reqData: ", reqData);
  // console.log("reqDataObject: ", reqDataObject);

  if (!reqData) {
    return NextResponse.json({ data: "No body received." }, { status: 400 });
  }

  console.log("userid: ", req.auth.user?.id);

  // Create new organization
  const newOrganization = await prisma.organization.create({
    data: {
      name: reqData.name,
    },
  });
  console.log("new org: ", newOrganization);
  return NextResponse.json(newOrganization, { status: 201 });
});
