import { prisma } from "../../lib/database";

// Components
import ServerTableRow from "./components/ServerTableRow";
// Importing the function to fetch servers from the database.
import { fetchServers } from "@/lib/db/queries/servers";
import Link from "next/link";
// Importing a component that handles server deletion.
import ServerDelete from "@/components/servers/ServerDelete";
import Indicatior from "@/components/ui/Indicator";
import { getServerInfo } from "@/lib/local_api";

// import { Server as ValveServer } from "@fabricio-191/valve-server-query/typings";
import { Server as ValveServer } from "@fabricio-191/valve-server-query";
import { Server } from "@prisma/client";

async function getServers() {
  const servers = await prisma.server.findMany({
    include: { owner: true, admins: true },
  });
  return servers;
}

export default async function ServerList() {
  // const servers = await getServers();

  const fservers = await fetchServers(); // Fetching the posts from the database.
  const gservers = await getServers();

  console.log("\nfservers\n");
  console.log(fservers);

  console.log("\ngservers\n");
  console.log(gservers);

  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  async function ServerCard({ server }: { server: Server }) {
    let info: ValveServer.Info | null;
    try {
      info = await getServerInfo(server.id);
    } catch (error) {
      info = null;
    }

    console.log("\n\ninfo\n\n");
    console.log(info);
    const isOnline = info == null ? false : true;
    return (
      <div key={server.id}>
        <div className="mb-4">
          <Link
            key={server.id}
            href={`/servers/${server.id}/edit`}
            className=""
          >
            <h2 className={`mb-3 text-2xl font-semibold flex items-center`}>
              <Indicatior color={isOnline ? "green" : "red"} />
              {server.host}
            </h2>
          </Link>
          <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>{server.port}</p>
        </div>
        <div className="text-sm opacity-30">
          {/* {"Updated at " + server.updatedAt.toLocaleDateString("en-US", dateOptions)} */}
        </div>
        <ServerDelete id={server.id} />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Map</th>
              <th>Tags</th>
              <th>Players</th>
              <th>Owner</th>
              <th>Admins</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gservers.map((server) => (
              <ServerTableRow
                key={server.id}
                serverId={server.id}
                server={server}
              ></ServerTableRow>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Map</th>
              <th>Tags</th>
              <th>Players</th>
              <th>Owner</th>
              <th>Admins</th>
              <th></th>
            </tr>
          </tfoot>
        </table>

        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          <Link href="/servers/create">Add Server</Link>
        </button>
      </div>
    </>
  );
}
