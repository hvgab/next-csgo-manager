// src/db/queries/servers.ts

import type { Server } from "@prisma/client"; // Importing the Server type from the Prisma client library.
import { prisma } from "@/lib/database";
import { notFound } from "next/navigation"; // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchServers(): Promise<Server[]> {
  // Function to fetch all servers from the database.
  return await prisma.server.findMany({
    include: {
      owner: true,
      admins: true,
    },
    orderBy: [
      {
        // updatedAt: "desc",
        host: "asc",
      },
    ],
  });
}

export async function fetchServerById(id: string): Promise<Server | null> {
  // Function to fetch a single server by its ID.
  const server = await prisma.server.findFirst({
    where: {
      id,
    },
  });

  if (!server) {
    notFound(); // If the server is not found, a 404 error is thrown.
  }

  return server;
}
