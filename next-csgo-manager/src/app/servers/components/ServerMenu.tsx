import { getServer } from "@/lib/db_queries";
import { Server } from "@prisma/client";
import { ReactNode } from "react";

export default async function ServerMenu({ serverId }: { serverId: string }) {
  const server: Server | null = await getServer(serverId);
  if (server == null) {
    return <ul className="menu bg-base-200 rounded-box w-56"></ul>;
  }

  const links = [
    {
      href: `/servers/${server.id}`,
      text: "Dashboard",
    },
    {
      href: `/servers/${server.id}/rcon`,
      text: "RCON",
    },
    {
      href: `/servers/${server.id}/feed`,
      text: "Feed (logs)",
    },
    {
      href: `/servers/${server.id}/players`,
      text: "Players",
    },
  ];

  return (
    <ul className="menu bg-base-200 rounded-box w-auto">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <a href={link.href}>{link.text}</a>
          </li>
        );
      })}
    </ul>
  );
}
