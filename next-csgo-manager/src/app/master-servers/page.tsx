import MasterServerTable from "./MasterServerTable";
import MasterServerTableRow from "./MasterServerTableRow";

export default async function MasterServers() {
  const response = await fetch(`http://localhost:3000/api/master-servers`);
  const data = await response.json();
  const servers = data;

  console.log(`use effect servers: ${JSON.stringify(servers)}`);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <MasterServerTable>
            {servers.map((server) => (
              <MasterServerTableRow key={server.key} ip={server.ip} port={server.port}></MasterServerTableRow>
            ))}
          </MasterServerTable>
        </div>
      </div>
    </>
  );
}
