import { NextResponse } from "next/server";

import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const server_data = {
  ip: "",
  port: 27030
}


export async function GET() {

  const server = await Server({
    ip: '',
    port: 27015,
    timeout: 3000,
  });
  console.log("server");
  console.log(server);

  const info = await server.getInfo();
  console.log("info");
  console.log(info);

  const players = await server.getPlayers();
  console.log("players");
  console.log(players);

  const rules = await server.getRules();
  console.log("rules");
  console.log(rules);

  console.log("server.lastPing");
  console.log(server.lastPing);

  return NextResponse.json({ info, players, rules, "lastPing": server.lastPing });
}
