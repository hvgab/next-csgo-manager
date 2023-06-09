import { prisma } from '../../../lib/database'
import { NextResponse } from "next/server";

// GET /api/servers/[id]
export async function GET(request: Request, { params: { serverId }, }: { params: { serverId: number }; }) {

    const result = await prisma.server.findUnique({
        where: {
            id: Number(serverId)
        }
    });

    return NextResponse.json(result);
}

