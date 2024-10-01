import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import PublishedFileDetails from "../../components/steam/PublishedFileDetails";

type Repo = {
  name: string;
  stargazers_count: number;
};

async function getData() {
  const res = await fetch(
    `http://localhost:3000/api/steam/IPublishedFileService/QueryFiles`,
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
  return (
    <>
      <h1>Workshop Officals</h1>

      {maps.map((map) => (
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
          {maps.map((map) => (
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
