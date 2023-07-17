import ServerCard from "../ServerCard";
import RconComponent from "../RconComponent";
import { prisma } from "../../lib/database";
import { getServerQuery, localGet } from "@/app/lib/local_api";
import { mapNameToWorkshopId } from "@/app/servers/utils";
import ServerDbCard from "../ServerDbCard";
import ServerQueryCard from "../ServerQueryCard";
import PublishedFileDetails from "@/app/components/steam/PublishedFileDetails";

export default function ServerDetail({ params: { serverId } }: { params: { serverId: number } }) {
  return (
    <>
      <section className="container mx-auto px-40">
        <br />
        {/* <ServerDbCard serverId={serverId} /> */}
        <br />
        {/* <ServerQueryCard serverId={serverId} /> */}
        <br />
        <PublishedFileDetails workshopId={2761127750} />
        <PublishedFileDetails workshopId={2985977542} />
      </section>
    </>
  );
}
