// import { prisma } from "../../../lib/database";
import { NextResponse } from "next/server";
import { parse } from "@blastorg/srcds-log-parser";
import { v4 as uuidv4 } from "uuid";
import { LogType } from "@/app/lib/definitions";
import { Events } from "@blastorg/srcds-log-parser";
// const socketApi = require("../socketApi");

// db
let undefined_logs_storage = [];
let parsedLogs: LogType[] = [];

// POST /api/logs/
export async function POST(request: Request) {
  const headers = request.headers;

  // console.log("headers");
  // console.log(headers);

  // console.log(headers.get("host")); // this server
  // console.log(headers.get("user-agent")); // name of sender
  // console.log(headers.get("x-forwarded-for")); // cs2 server host
  // console.log(headers.get("x-forwarded-host")); // cs2 server sent logs to this host
  // console.log(headers.get("x-forwarded-port"));
  // console.log(headers.get("x-forwarded-proto")); //http/https
  // console.log(headers.get("x-logbytes-beginoffset"));
  // console.log(headers.get("x-logbytes-endoffset"));
  // console.log(headers.get("x-server-addr"));
  // console.log(headers.get("x-server-instance-token"));
  // console.log(headers.get("x-steamid"));
  // console.log(headers.get("x-tick-end"));
  // console.log(headers.get("x-tick-start"));
  // console.log(headers.get("x-timestamp"));

  // 'x-tick-start': '2807757',
  // 'x-tick-end': '2807757',
  // 'x-server-addr': '84.212.55.236:27015',
  // 'x-timestamp': '01/28/2024 - 16:11:37.822',
  // 'x-server-instance-token': '0816dd577479d82a',

  // server 14 - 553d26732901bd2d

  // TODO: Parse the headers to set the log to the correct server.

  const data = await request.text();
  const rawLogs = data.split("\n");

  for (const rawLog of rawLogs) {
    // Dont do anything to empty lines
    if (rawLog == "") {
      continue;
    }

    // Parsed Log
    const parsed_log: Events | undefined = parse(rawLog, { format: "http" });

    // Not parsed?
    if (parsed_log === undefined) {
      undefined_logs_storage.push(rawLog);
      console.log(`Missing parser for "${rawLog}"`);
    }

    if (
      parsed_log !== undefined &&
      parsed_log.type == "entity_triggered" &&
      parsed_log.payload.kind == "match_start"
    ) {
      console.log("new match!");
      parsedLogs = [];
    }
    // TODO: Save to DB?

    const uuid = uuidv4();
    let logObject: LogType = {
      uuid: uuid,
      headers: headers,
      rawLog: rawLog,
      log: parsed_log,
      metadata: {
        userAgent: headers.get("user-agent"),
        serverIp: headers.get("x-forwarded-for"),
        localServerIp: headers.get("x-forwarded-for"),
        publicServerIp: headers.get("x-server-addr"),
        serverInstanceToken: headers.get("x-server-instance-token"),
        serverSteamId: headers.get("x-steamid"),
        tickStart: headers.get("x-tick-start"),
        tickEnd: headers.get("x-tick-end"),
      },
    };

    parsedLogs.push(logObject);
  }
  // Return 200 to cs2 server
  // res.status(200).send(log_storage);

  return NextResponse.json(parsedLogs);
}

export async function GET(request: Request) {
  return NextResponse.json(parsedLogs);
}
