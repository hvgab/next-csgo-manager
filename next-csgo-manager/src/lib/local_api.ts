import { Server as ValveServer } from "@fabricio-191/valve-server-query";

// General for local API
export async function localGet(url: string) {
  const baseUrl = "http://localhost:3000";
  console.log("getLocal");
  console.log(url);
  const res = await fetch(`${baseUrl}/${url}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Servers

export async function getServerData(id: string) {
  console.log("getServerData");
  const res = await fetch(`http://localhost:3000/api/servers/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getServerInfo(
  id: string
): Promise<{ info: ValveServer.Info }> {
  console.log("getServerInfo");
  const res = await fetch(`http://localhost:3000/api/servers/${id}/info`, {
    next: { revalidate: 10 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch ServerInfo data");
  }

  return res.json();
}

export async function getServerPlayerInfo(
  id: string
): Promise<{ info: ValveServer.PlayerInfo }> {
  console.log("getServerPlayers");
  const res = await fetch(`http://localhost:3000/api/servers/${id}/players`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch ServerPlayerInfo data");
  }

  return res.json();
}

export async function getServerQuery(id: string) {
  console.log("getServerQuery");
  const res = await fetch(`http://localhost:3000/api/servers/${id}/query`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
