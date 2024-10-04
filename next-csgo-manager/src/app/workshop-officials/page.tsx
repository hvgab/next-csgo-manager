import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import PublishedFileDetails from "../../components/steam/PublishedFileDetails";

type Repo = {
  name: string;
  stargazers_count: number;
};

async function getData() {
  const steamId = "76561198082857351";
  // const res = await fetch(`http://localhost:3000/api/steam/IPublishedFileService/GetUserFiles/${steamId}`, {
  const res = await fetch(
    `http://localhost:3000/api/steam/workshop-maps-official`,
    {
      // cache: "no-store",
      cache: "no-cache",
    }
  );
  const maps = await res.json();
  console.log(`maps.length: ${maps.length}`);
  return maps;
}

export default async function Page() {
  const maps = await getData();
  if (!maps) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Holy smokes!</strong>
        <span className="block sm:inline">Could not retrieve maps!</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    );
  }
  const no_comp_maps = [];
  for (let index = 0; index < maps.length; index++) {
    const element = maps[index];
    if (
      !element.title.includes("Compatibility Version") &&
      !element.title.includes("Comptability")
    ) {
      no_comp_maps.push(element);
    }
  }
  return (
    <>
      <h1>Workshop Officals</h1>

      {no_comp_maps.map((map) => (
        <PublishedFileDetails
          workshopId={map.publishedfileid}
          key={map.publishedfileid}
        ></PublishedFileDetails>
      ))}

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
