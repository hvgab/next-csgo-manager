"use client";

import { useState, useEffect } from "react";
import CardSkeleton from "../../components/skeletons/cardSkeleton";

export default function ServerQueryCard({ serverId }: { serverId: number }) {
  const [serverData, setServerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("ServerDbCard serverId");
    // console.log(serverId);
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
      <pre>{JSON.stringify(serverData, null, 2)}</pre>
    </>
  );
}
