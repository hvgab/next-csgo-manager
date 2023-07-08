// General for local API
export async function localGet(url: string) {
  const baseUrl = "http://localhost:3000"
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

export async function getServerData(id: number) {
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

export async function getServerQuery(id: number) {
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
