"use client";

import RconComponent from "../../RconComponent";
import { prisma } from "../../../lib/database";
import { mapNameToWorkshopId } from "@/app/servers/utils";

export default async function ServerDetailRcon({ params: { serverId } }: { params: { serverId: number } }) {
  console.log(`ServerDetailRcon params: ${serverId}`);

  return (
    <>
      <div>
        <RconComponent serverId={serverId} />
      </div>
    </>
  );
}
