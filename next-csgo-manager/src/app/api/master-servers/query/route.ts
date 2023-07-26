import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

// GET /api/servers/[id]/query
export async function POST(request: Request) {

    const body = await request.json()

    let serverConnection = null;
    try {
        serverConnection = await Server({
            ip: body.ip,
            port: body.port,
            timeout: 3000,
        });
    } catch (error) {
        console.error(`Could not connect to server (${body.ip}:${body.port})`)
        return NextResponse.json({ error: error.message })
    }

    const info = await serverConnection.getInfo();

    let mapWorkshopId = "";
    const mapNameArray = info.map.split("/");
    if (mapNameArray.length == 3) {
        mapWorkshopId = mapNameArray[1];
    }

    const players = await serverConnection.getPlayers();
    // const players = {}

    // const rules = await serverConnection.getRules();
    const rules = {};

    return NextResponse.json({ mapWorkshopId, info, players, rules, "lastPing": serverConnection.lastPing });
}

