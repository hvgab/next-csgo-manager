"use server";

const {
  Server,
  RCON,
  MasterServer,
} = require("@fabricio-191/valve-server-query");
const Gamedig = require("gamedig");

export module ServerQuery {
  export async function getServer(server_obj) {
    const server = await Server({
      ip: server_obj.ip,
      port: server_obj.port,
      timeout: 3000,
    });
    return server;
  }

  export async function getInfo(server) {
    const info = await server.getInfo();
    console.log(info);
    return info;
  }

  export async function getPlayers(server) {
    const players = await server.getPlayers();
    console.log(players);
    return players;
  }

  export async function getRules(server) {
    const rules = await server.getRules();
    console.log(rules);
    return rules;
  }

  export async function getPing(server) {
    const ping = server.lastPing;
    console.log(ping);
    return ping;
  }
}
