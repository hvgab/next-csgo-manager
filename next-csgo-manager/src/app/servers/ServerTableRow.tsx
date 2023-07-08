"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ServerTableRow({ serverId }: { serverId: number }) {
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

  if (isLoading)
    return (
      <tr>
        <td>loading id</td>
        <td>loading host</td>
        <td>loading port</td>
        <td>
          <Link href={`/servers/${serverId}`}>View</Link>
        </td>
      </tr>
    );
  if (!data)
    return (
      <tr>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
          <Link href={`/servers/${serverId}`}>View</Link>
        </td>
      </tr>
    );

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.host}</td>
      <td>{data.port}</td>
      <td>
        <Link href={`/servers/${serverId}`}>View</Link>
      </td>
    </tr>
  );
}
