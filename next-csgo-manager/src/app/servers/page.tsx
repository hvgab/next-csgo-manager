import { prisma } from "../lib/database";

// Components
import ServerTableRow from "./ServerTableRow";

async function getServers() {
  const servers = await prisma.server.findMany({ include: { owner: true, admins: true } });
  return servers;
}

export default async function ServerList() {
  const servers = await getServers();

  return (
    <div className="container mx-auto px-4">
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
              <th>ID</th>
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
            {servers.map((server) => (
              <ServerTableRow key={server.id} serverId={server.id} server={server}></ServerTableRow>
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
      </div>
    </div>
  );
}
