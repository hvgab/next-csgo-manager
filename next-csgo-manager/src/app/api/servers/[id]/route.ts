import { prisma } from '../../../lib/database'
import { NextResponse } from "next/server";

// GET /api/servers/[id]
export async function GET(request: Request, { params: { id }, }: { params: { id: number }; }) {

    const result = await prisma.server.findUnique({
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json(result);
}