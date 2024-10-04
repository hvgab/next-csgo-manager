import { Events } from "@blastorg/srcds-log-parser";
import { v4 as uuidv4 } from "uuid";

export type LogType = {
  uuid: uuidv4;
  headers: Headers;
  rawLog: string;
  log: Events | undefined;
  metadata: {
    userAgent: string | null;
    serverIp: string | null;
    localServerIp: string | null;
    publicServerIp: string | null;
    serverInstanceToken: string | null;
    serverSteamId: string | null;
    tickStart: string | null;
    tickEnd: string | null;
  };
};
