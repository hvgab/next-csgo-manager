"use client";

import RconComponent from "../../RconComponent copy";

export default function ServerDetailRcon({
  params: { serverId },
}: {
  params: { serverId: number };
}) {
  console.log(`ServerDetailRcon params: ${serverId}`);

  return (
    <>
      <div>
        <RconComponent serverId={serverId} />
      </div>
    </>
  );
}
