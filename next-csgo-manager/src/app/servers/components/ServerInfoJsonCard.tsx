"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fetcher from "@/lib/fetcher";
import { getServerInfo } from "@/lib/local_api";
import useSWR from "swr";

export default function ServerInfoJsonCard({ serverId }: { serverId: string }) {
  console.log("server-info-json-card");
  console.log(`serverId: ${serverId}`);
  const BASE_URL = "http://localhost:3000";

  // swr
  const { data, error, isLoading } = useSWR(
    `/api/servers/${serverId}/info`,
    fetcher
  );

  // fetch
  // let res = await fetch(`${BASE_URL}/api/servers/${serverId}/info`);
  // let data = await res.json();
  // if (!data) {
  //   return <div>!Data</div>;
  // }

  console.log("server-info-json-card");
  console.log(data);

  if (error)
    return (
      <div>
        <p>Error</p>
        <p>{JSON.stringify(error, null, 2)}</p>
      </div>
    );
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.info.name}</CardTitle>
        <CardDescription>Query Info</CardDescription>
      </CardHeader>
      <CardContent>
        <pre>
          <code>{JSON.stringify(data.info, null, 2)}</code>
        </pre>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
