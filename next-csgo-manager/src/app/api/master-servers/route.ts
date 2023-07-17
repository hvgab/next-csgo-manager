import { NextResponse } from "next/server";
import { useRouter } from 'next/router';
import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

// GET /api/master-servers
export async function GET(request: Request) {

    async function getServers() {

        const filter = new MasterServer.Filter()
            .add("appid", 730)
            .add("gamedir", "csgo")

        console.log("filter: ")
        console.log(filter)

        const data = MasterServer({
            quantity: 50, // or Infinity or 'all'
            region: 'EUROPE',
            timeout: 3000,
            filter: filter
        })
        console.log(data)
        return data
    }

    let servers_address_list: string[] = await getServers()
    console.log(`Master servers: ${servers_address_list.length}`)

    let servers: [{ key: number, ip: string, port: number }] = []

    // for (let index = 0; index < servers_address_list.length; index++) {
    for (let index = 0; index < 10; index++) {
        const server = servers_address_list[index];
        const [ip, port] = server.split(":");
        console.log(`ipport: ${ip} ${port}`)
        servers.push({ key: index, ip: ip, port: Number(port) })
    }

    console.log(`Master Servers Returned: ${servers.length}`)

    return NextResponse.json(servers);

}

