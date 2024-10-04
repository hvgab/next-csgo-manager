import { getServerPlayerInfo } from "@/lib/local_api";
import { NextRequest } from "next/server";

export default async function Players(
  req: NextRequest,
  { params: { serverId } }
) {
  if (req.nextUrl.searchParams.get("includeBots") == "1") {
    const players = await getServerPlayerInfo(serverId, true);
  } else {
    const players = await getServerPlayerInfo(serverId);
  }
  return (
    <div className="grid grid-flow-col">
      <div>
        Col 1
        <pre>
          <code>{JSON.stringify(players, null, 2)}</code>
        </pre>
      </div>
      <div>Col 2</div>
      <div>Col 3</div>
      <div>Col 4</div>
      <div>Col 5</div>
      <div>Col 6</div>
      <div>Col 7</div>
      <div>Col 8</div>
      <div>Col 9</div>
      <div>Col 10</div>
      <div>Col 11</div>
      <div>Col 12</div>
      <div>Col 13</div>
      <div>Col 14</div>
      <div>Col 15</div>
      <div>Col 16</div>
    </div>
  );
}
