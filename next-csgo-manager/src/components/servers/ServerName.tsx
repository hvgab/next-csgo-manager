"use client";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { Server } from "@prisma/client";
import { ReactNode } from "react";

export default function ServerName({
  server,
}: {
  server: Server;
}): JSX.Element {
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
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </>
    );

  if (!data) {
    <p>ServerName: No data</p>;
  }

  return (
    <span>
      {data?.info?.name ? data.info.name : JSON.stringify(data, null, 2)}
    </span>
  );
}
