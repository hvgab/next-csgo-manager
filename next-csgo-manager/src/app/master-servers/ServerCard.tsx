"use client";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

import Image from "next/image";
import Link from "next/link";

// import { mapNameToWorkshopId } from "./utils";

export default async function ServerCard({ server }) {
  // const [serverData, setServerData] = useState(null);
  // const [serverQuery, setServerQuery] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // const [workshopId, setWorkshopId] = useState(null);
  // const [workshop, setWorkshop] = useState(null);

  // console.log(serverQuery.info.map);
  // console.log(serverQuery.info.map.split("/"));
  // console.log(serverQuery.info.map.split("/").length);

  // if (serverQuery.info.map.split("/").length > 1) {
  //   workshopId = await mapNameToWorkshopId(serverQuery.info.map);
  //   workshop = await localGet(`api/steam/IPublishedFileService/GetDetails/${workshopId}`);
  // }

  const { data: serverData, error: serverDataError } = useSWR(
    "/api/servers/" + server.id,
    fetcher
  );

  const { data: serverQuery, error: serverQueryError } = useSWR(
    "/api/servers/" + server.id + "/query",
    fetcher
  );

  const { data: workshop, error: workshopDataError } = useSWR(
    () => `/api/steam/IPublishedFileService/GetDetails/${serverData.workshopId}`
  );

  if (serverDataError) return <div>Failed to load serverData</div>;
  if (serverQueryError) return <div>Failed to load serverQuery</div>;
  if (workshopDataError) return <div>Failed to load workshopData</div>;

  if (!serverData) return <div>Loading serverData...</div>;
  if (!serverData) return <div>Loading serverQuery...</div>;

  return (
    <>
      {/* <pre>{workshopId}</pre> */}
      {/* <pre>{workshop}</pre> */}
      <Link href={`/servers/${server.id}`}>
        <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg">
          {workshop !== null ? (
            <>
              <img
                className="w-full"
                src={workshop.preview_url}
                alt={workshop.preview_url}
              />
              <p>{workshop.title}</p>
              <p>{workshop.file_description}</p>
            </>
          ) : (
            <p>No workshop data.</p>
          )}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-700 text-base">
              <h3 className="mt-4 text-sm text-gray-700">{server.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {server.name} {server.host}
              </p>
              <p className="mt-1 text-s font-medium text-gray-900">
                {server.rconPassword}
              </p>
            </div>
          </div>
          <div className="px-6 pt-4 pb-2">
            {/* Object */}
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {server.id}
            </span>
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {server.host}
            </span>
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {server.port}
            </span>

            {/* Query */}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.info.address}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.info.name}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.info.map}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.info.game}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.info.players.online} / {serverQuery.info.players.max}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {serverQuery.lastPing}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
