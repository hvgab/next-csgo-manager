import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
};

async function getData() {
  const steamId = "76561198082857351";
  // const res = await fetch(`http://localhost:3000/api/steam/IPublishedFileService/GetUserFiles/${steamId}`, {
  const res = await fetch(`http://localhost:3000/api/steam/workshop-maps-official`, {
    // cache: "no-store",
    cache: "no-cache",
  });
  const maps = await res.json();
  console.log(`maps.length: ${maps.length}`);
  return maps;
}

export default async function Page() {
  const maps = await getData();
  const no_comp_maps = [];
  for (let index = 0; index < maps.length; index++) {
    const element = maps[index];
    if (!element.title.includes("Compatibility Version")) {
      no_comp_maps.push(element);
    }
  }
  return (
    <>
      <h1>Workshop Officals</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Published File Id</th>
            <th>Filename</th>
            <th>Title</th>
            {/* <th>Short Description</th> */}
            {/* <th>Description</th> */}
            <th>Flags</th>
            <th>Workshop File</th>
            <th>Workshop Accepted</th>
            <th>Can Be Deleted</th>
            <th>Visibility</th>
          </tr>
        </thead>
        <tbody>
          {no_comp_maps.map((map) => (
            <tr key={map.publishedfileid}>
              <td>{map.publishedfileid}</td>
              <td>{map.filename}</td>
              <td>{map.title}</td>
              {/* <td>{map.short_description}</td> */}
              {/* <td>{map.description}</td> */}
              <td>{map.flags}</td>
              <td>{map.workshop_file.toString()}</td>
              <td>{map.workshop_accepted.toString()}</td>
              <td>{map.can_be_deleted.toString()}</td>
              <td>{map.visibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>
        <code>{JSON.stringify(maps, null, 2)}</code>
      </pre>
    </>
  );
}
