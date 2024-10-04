// src/app/servers/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific server ID.

import { updateServer } from "@/actions/servers";
import ServerForm from "@/components/servers/ServerForm";
import { fetchServerById } from "@/lib/db/queries/servers";

interface ServersEditProps {
  params: {
    id: string;
  };
}

// Defining a new page, server component ServersEdit
export default async function ServersEdit({ params }: ServersEditProps) {
  // Receives params as a prop, which includes the id of the server to be edited.
  const { id } = params;

  // Fetches the server from the database
  const server = await fetchServerById(id);

  // binds the id to the updateServer action to create an updateAction,
  const updateAction = updateServer.bind(null, id);

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* // renders a ServerForm component, passing the updateAction as the form action and the server data  */}
        {/* // as the initial data */}
        <ServerForm
          formAction={updateAction}
          initialData={{
            host: server?.host ?? "",
            port: server?.port ?? 27015,
          }}
        />
      </div>
    </main>
  );
}
