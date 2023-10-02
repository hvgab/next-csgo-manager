import ServerCard from "../ServerCard";
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

export default async function ServerDetail({ params: { serverId } }: { params: { serverId: number } }) {
  const server = await prisma.server.findUnique({
    where: {
      id: Number(serverId),
    },
    include: {
      owner: true,
      admins: true,
    },
  });

  return (
    <>
      <section className="container mx-auto px-40">
        {/* Title */}
        <div className="flex flex-auto gap-4 justify-start bg-green-100 items-center">
          <div className="text-4xl p-4 align-middle bg-yellow-100">
            <span className="">#{server.id}</span>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-0 text-2xl font-bold">
              <ServerName server={server}></ServerName>
            </h1>
            <h2 className="mb-0 text-lg text-neutral-600">
              {server.host}:{server.port}
            </h2>
          </div>
        </div>
        <div className="flex flex-auto justify-around bg-slate-600 text-slate-300 rounded mb-6">
          <p>Owner: {server.owner.name}</p>
          <p>
            Admins:{" "}
            {server.admins.length > 0
              ? server.admins.map((admin) => <span>{admin.name}</span>).reduce((prev, curr) => [prev, ", ", curr])
              : null}
          </p>
        </div>

        <RconComponent serverId={serverId} />
        <br />
        <ServerPublishedFileDetails serverId={serverId} />
        <br />
        <br />
        <ServerQueryCard serverId={serverId} />
        <br />
        <ServerQueryJson serverId={serverId}></ServerQueryJson>
      </section>
    </>
  );
}
