"use client";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function ServerPlayers({ serverId }: { serverId: string }) {
  console.log("ServerPlayers - serverId: ", serverId);
  const { data, error, isLoading } = useSWR(
    `/api/servers/${serverId}/info`,
    fetcher
  );

  console.log(data);
  console.log(error);
  console.log(isLoading);

  if (isLoading)
    return (
      <span className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></span>
    );

  if (error) return <span>Error Failed to fetch: {JSON.stringify(error)}</span>;

  return (
    <span>
      {data?.info?.players
        ? data.info.players.online
        : JSON.stringify(data, null, 2)}
      /
      {data?.info?.players
        ? data.info.players.max
        : JSON.stringify(data, null, 2)}
    </span>
  );
}
