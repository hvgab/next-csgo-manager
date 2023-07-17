import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { prisma } from '../../../../lib/database'
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

// POST /api/servers/[id]/rcon
export async function POST(request: Request, { params: { serverId }, }: { params: { serverId: number }; }) {

    const server = await prisma.server.findUnique({ where: { id: Number(serverId) } });
    console.log(`rcon.route server: ${JSON.stringify(server)}`)
    if (server == null) {
        return NextResponse.json({ "status": "error", "error": "server not found" })
    }
    if (server.rcon_password == null) {
        return NextResponse.json({ "status": "error", "error": "rcon_password not set for server" })
    }

    // Data from POST
    const body = await request.json();
    console.log(`body: ${JSON.stringify(body)}`)

    const rcon = await RCON({
        ip: server.host,
        port: server.port,
        password: server.rcon_password,
    });
    console.log(rcon);

    const rconResponse = await rcon.exec(body.rcon_command)
    console.log("rconResponse");
    console.log(rconResponse);

    if (body.command == "status") {
        let response = rconResponse.split("\n")
        return NextResponse.json({ "response": response });
    } else {
        return NextResponse.json({ "response": rconResponse });
    }
}

