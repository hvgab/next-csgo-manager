import { Server } from "@prisma/client";
import { cache } from "react";
import { prisma } from "./database";

export const getServer = cache(async (serverId: string) => {
  console.log("###################");
  console.log(serverId);
  const server: Server | null = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
  });

  return server;
});
