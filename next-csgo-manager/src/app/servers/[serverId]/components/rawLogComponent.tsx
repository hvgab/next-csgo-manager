// import React from "react";
"use client";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { LogType } from "@/app/lib/definitions";

export default function RawLog() {
  const { data, error, isLoading } = useSWR("/api/logs-receiver", fetcher, {
    refreshInterval: 2000,
  });

  if (error) return <div>Error...</div>;

  if (isLoading) return <div>Loading...</div>;

  const logs: LogType[] = data;

  return (
    <div id="log-component-list">
      {logs.map((logData) => (
        <div key={logData.uuid}>{logData.rawLog}</div>
      ))}
    </div>
  );
}
