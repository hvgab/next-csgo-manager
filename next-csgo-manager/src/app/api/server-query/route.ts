import { NextResponse } from "next/server";

import { Server, RCON, MasterServer } from '@fabricio-191/valve-server-query';

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

const server = {
  ip: "",
  port: 27030
}

export async function GET() {
  // console.log("params")
  // console.log(params)

  const serverConnection = await Server({
    ip: server.ip,
    port: server.port,
    timeout: 3000,
  });
  console.log("serverConnection");
  console.log(serverConnection);

  const info = await serverConnection.getInfo();
  console.log("info");
  console.log(info);

  const players = await serverConnection.getPlayers();
  console.log("players");
  console.log(players);

  const rules = await serverConnection.getRules();
  console.log("rules");
  console.log(rules);

  console.log("serverConnection.lastPing");
  console.log(serverConnection.lastPing);

  return NextResponse.json({ info, players, rules, "lastPing": serverConnection.lastPing });
}

