"use client";

import { useState, useEffect } from "react";
import CardSkeleton from "../components/skeletons/cardSkeleton";

export default function ServerQueryCard({ serverId }: { serverId: number }) {
  const [serverData, setServerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`serverQueryCard id: ${serverId}`);
    setIsLoading(true);
    fetch(`/api/servers/${serverId}/query`)
      .then((res) => res.json())
      .then((data) => {
        setServerData(data);
        setIsLoading(false);
      });
  }, [serverId]);

  if (isLoading) {
    return <CardSkeleton />;
  }
  if (!serverData) {
    return <div>Failed to load data</div>;
  }

  return (
    <>
      <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700 text-base">
            <h3 className="mt-4 text-sm text-gray-700">
              {serverData.info.name}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {serverData.info.map}
            </p>
            <p>Game {serverData.info.game}</p>
            <p>Connect to {serverData.info.address}</p>
            <p>Workshop Map ? {serverData.mapWorkshopId}</p>
            <p>Last ping {serverData.lastPing}</p>
            <p className="mt-1 text-s font-medium text-gray-900">
              {serverData.rconPassword}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
