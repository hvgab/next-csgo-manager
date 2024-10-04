"use client";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Server } from "@prisma/client";

export default function ServerGame({ server }: { server: Server }) {
  const { data, error, isLoading } = useSWR(
    `/api/servers/${server.id}/info`,
    fetcher
  );

  if (isLoading)
    return (
      <span className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></span>
    );

  if (error)
    return (
      <>
        <span className="h-2.5  w-48 mb-4 text-red-400">
          {error?.info?.title}
        </span>
        <pre className="text-gray-500">
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </>
    );

  return (
    <span>
      {data?.info?.game ? data.info.game : JSON.stringify(data, null, 2)}
    </span>
  );
}
