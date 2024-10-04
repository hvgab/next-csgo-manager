"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerPlayerInfo } from "@/lib/local_api";

import { useState, useEffect } from "react";

export default function ServerPlayerInfoJsonCard({
  serverId,
}: {
  serverId: string;
}) {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await getServerPlayerInfo(serverId);
      setData(res);
    }
    fetchData();
  }, [serverId]);
  // const playerInfo = await getServerPlayerInfo(serverId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
        <CardDescription>Player Info</CardDescription>
      </CardHeader>
      <CardContent>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
