import Image from "next/image";

async function getServerData(id: number) {
  console.log("getServerData");
  const res = await fetch("http://localhost:3000/api/server-query/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ServerCard({ server }) {
  const serverQueryData = await getServerData(server.id);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={server.imageSrc} alt={server.imageAlt} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{server.name}</div>
        <p className="text-gray-700 text-base">
          <h3 className="mt-4 text-sm text-gray-700">{server.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{server.ip}</p>
          <p className="mt-1 text-lg font-medium text-gray-900">{server.rcon_password}</p>
          <ul>
            <li>
              <span className="font-bold"></span>:<span></span>
            </li>
          </ul>
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {serverQueryData.info.name}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {serverQueryData.info.map}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {serverQueryData.info.game}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {JSON.stringify(serverQueryData.players)}
        </span>
      </div>
      <pre className="text-gray-700">{JSON.stringify(server, null, 2)}</pre>
      <br />
      <pre className="text-gray-700">{JSON.stringify(serverQueryData, null, 2)}</pre>
    </div>
  );
}
