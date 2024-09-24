// import "./globals.css";
// import LeftSidebar from "@/components/LeftSidebar";
// import ServerMenu from "./ServerMenu";
import { Inter } from "next/font/google";
import { prisma } from "@/lib/database";
import { Server } from "@prisma/client";
import { cache, lazy, Suspense } from "react";
import { getServer } from "@/lib/db_queries";

// META
export async function generateMetadata({
  params,
}: {
  params: { serverId: string };
}) {
  // Get server
  const server: Server | null = await getServer(params.serverId);
  if (server == null) return { title: "Server X" };
  return {
    title: server.host + ":" + server.port,
    description: "Manage your server",
  };
}

// LAYOUT
export default async function ServerLayout({
  params: { serverId },
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  // const server: Server | null = await getServer(serverId);
  return <div className="min-h-screen bg-base-100/40">{children}</div>;
}
