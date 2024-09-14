import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/database";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { NextAuthRequest } from "next-auth/lib";

// GET /api/servers/
export async function GET() {
  const servers = await prisma.server.findMany();
  return NextResponse.json(servers);
}

// POST /api/servers

export const POST = auth(async (req) => {
  console.log(req.auth);
  if (!req.auth) {
    return NextResponse.json({ error: "Not signed in..." }, { status: 401 });
  }

  console.log("bodyUsed: ", req.bodyUsed);

  let reqData;

  // If JSON body
  if (req.bodyUsed) {
    try {
      reqData = await req.json();
    } catch (error) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
  } else {
    // If Form Data???
    const formData = await req.formData();
    console.log("formData: ");
    console.log(formData);
    const jobject = {};
    formData.forEach((value, key) => {
      jobject[key] = value;
    });
    console.log("jobject: ", jobject);
    const json = JSON.stringify(jobject);
    console.log("json: ", json);

    reqData = json;
  }

  const reqDataObject = JSON.parse(reqData);
  console.log("reqData: ", reqData);
  console.log("reqDataObject: ", reqDataObject);

  if (!reqData) {
    return NextResponse.json({ data: "No body received." }, { status: 400 });
  }

  if (!reqDataObject.host || !reqDataObject.port) {
    console.log("reqData.host: ", reqDataObject.host);
    console.log("reqData.port: ", reqDataObject.port);
    return NextResponse.json(
      { data: "Host and port is required" },
      { status: 400 }
    );
  }

  console.log("userid: ", req.auth.user?.id);
  const newServer = await prisma.server.create({
    data: {
      host: reqDataObject.host,
      port: Number(reqDataObject.port),
      ownerUserId: req.auth.user?.id,
    },
  });
  return NextResponse.json(newServer, { status: 201 });
});
