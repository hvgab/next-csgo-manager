"use client";

import { useState, useEffect } from "react";
import CardSkeleton from "../../../components/skeletons/cardSkeleton";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function ServerQueryCard({ serverId }: { serverId: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/servers/${serverId}/info`,
    fetcher
  );

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (error) {
    return (
      <div>
        <h2>Failed to load data</h2>
        <pre>
          <code>{JSON.stringify(error, null, 4)}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
