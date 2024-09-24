import MasterServerTable from "./MasterServerTable";
import MasterServerTableRow from "./MasterServerTableRow";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

BigInt.prototype["toJSON"] = function () {
  return this.toString();
};

export default async function MasterServers() {
  const response = await fetch(`http://localhost:3000/api/master-servers`, {
    cache: "no-store",
  });
  const data = await response.json();
  const servers = data;
  // const { data } = useSWR(`http://localhost:3000/api/master-servers`);
  console.log(`page servers: ${JSON.stringify(data)}`);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <MasterServerTable>
            {data.map((server) => (
              <MasterServerTableRow
                key={server.key}
                ip={server.ip}
                port={server.port}
              ></MasterServerTableRow>
            ))}
          </MasterServerTable>
        </div>
      </div>
    </>
  );
}
