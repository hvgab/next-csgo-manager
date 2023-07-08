import { prisma } from "../lib/database";

// Components
import ServerTableRow from "./ServerTableRow";

async function getServers() {
  const servers = await prisma.server.findMany({});
  return servers;
}

export default async function ServerList() {
  const servers = await getServers();

  return (
    <div className="container mx-auto px-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Host</th>
            <th>Port</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <ServerTableRow key={server.id} serverId={server.id}></ServerTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
