"use client";

import { useState, useEffect } from "react";

export default function TestComponent({ serverId }: { serverId: number }) {
  console.log(serverId);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // fetch("/api/servers/" + serverId);
    fetch(`/api/servers/${serverId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [serverId]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.id}</h1>
      <p>{data.host}</p>
      <p>{data.port}</p>
    </div>
  );
}
