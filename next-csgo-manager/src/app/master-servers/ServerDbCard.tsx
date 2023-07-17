"use client";

import { useState, useEffect } from "react";
import CardSkeleton from "../components/skeletons/cardSkeleton";

export default function ServerDbCard({ serverId }: { serverId: number }) {
  const [serverData, setServerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("ServerDbCard serverId");
    // console.log(serverId);
    setIsLoading(true);
    fetch(`/api/servers/${serverId}`)
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
            <h3 className="mt-4 text-sm text-gray-700">{serverData.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {serverData.name} {serverData.host}
            </p>
            <p className="mt-1 text-s font-medium text-gray-900">{serverData.rcon_password}</p>
          </div>
        </div>
        <div className="px-6 pt-4 pb-2">
          {/* Object */}
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {serverData.id}
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {serverData.host}
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {serverData.port}
          </span>
        </div>
      </div>
    </>
  );
}
