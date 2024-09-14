import ServerCard from "../ServerCard";
// import RconComponent from "../RconComponent";
import RconComponent from "../RconComponent";
import { prisma } from "../../lib/database";
import { getServerQuery, localGet } from "@/app/lib/local_api";
import { mapNameToWorkshopId } from "@/app/servers/utils";
import ServerDbCard from "../ServerDbCard";
import ServerQueryCard from "../ServerQueryCard";
import ServerQueryJson from "@/app/servers/ServerQueryJson";
import PublishedFileDetails from "@/app/components/steam/PublishedFileDetails";
import ServerPublishedFileDetails from "@/app/components/steam/ServerPublishedFileDetails";
import useSWR from "swr";
import ServerName from "@/app/components/ServerName";
import ServerMap from "@/app/components/ServerMap";
import ServerGame from "@/app/components/ServerGame";
import RawLog from "./components/rawLogComponent";
import Image from "next/image";
import ServerPlayers from "@/app/components/ServerPlayers";

export default async function ServerDetail({
  params: { serverId },
}: {
  params: { serverId: string };
}) {
  const server = await prisma.server.findUnique({
    where: {
      id: String(serverId),
    },
    include: {
      owner: true,
      admins: true,
    },
  });

  if (server === null) {
    return <div>Server is null</div>;
  }

  return (
    <>
      {/* Server Header */}
      <section className="bg-slate-800">
        {/* Title */}
        <div className="container mx-auto px-4">
          <div className="flex flex-auto gap-4 justify-between items-center ">
            {/* <div className="text-4xl p-4 align-middle">
            <div className="text-sm">Server</div>
            <div className="">#{server.id}</div>
          </div> */}
            <div className="flex flex-col">
              <h1 className="mb-0 text-2xl font-bold">
                <ServerName server={server}></ServerName>
              </h1>
              <h2 className="mb-0 text-lg dark:text-slate-300">
                {server.host}:{server.port}
              </h2>
            </div>
            <div>
              <div>
                🕹️ <ServerGame server={server}></ServerGame>
              </div>
              <div>
                🌍 <ServerMap server={server}></ServerMap>
              </div>
            </div>
            <div>
              <div>🛡️ Vac Protected</div>
              <div>
                👥 <ServerPlayers serverId={server.id} /> Players
              </div>
            </div>
            <div>
              <div>{server.owner.name}</div>
              <div>
                {server.admins.length > 0
                  ? server.admins
                      .map((admin) => <span key={admin.id}>{admin.name}</span>)
                      .join(", ")
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <a
          href={`steam://connect/${server.host}:${server.port}/${server.joinPassword}`}
          className="bg-primary px-4 py-2 rounded"
        >
          Join {server.host}:{server.port}!
        </a>
      </div>

      <hr className="my-12" />
      <p>Debugs</p>
      <br />

      <ServerQueryJson serverId={serverId} />
    </>
  );
}
