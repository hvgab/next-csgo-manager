import { createServer } from "@/actions/servers";
import ServerForm from "@/components/servers/ServerForm";

// create a new server component ServersCreate.
export default function ServersCreate() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* // Renders a ServerForm component, passing the createServer action as the form action  */}
        {/* // and an initial data object with empty title and content. */}
        <ServerForm
          formAction={createServer}
          initialData={{ host: "", port: 27015 }}
        />
      </div>
    </main>
  );
}
