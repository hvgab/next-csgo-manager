const servers = [
  {
    id: 1,
    name: "Server 1",
    href: "/servers/1",
    ip: ":27015",
    rcon_password: "",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Server 2",
    href: "/servers/2",
    ip: ":27030",
    rcon_password: "",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
];

async function getServerData(id: number) {
  const res = await fetch("/api/servers/{id}");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function ServerList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Servers</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {servers.map((server) => (
            // Initiate both requests in parallel
            // const serverData = await getServerData(server.id);

            <a key={server.id} href={server.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={server.imageSrc}
                  alt={server.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{server.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {server.ip}
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {server.rcon_password}
              </p>

              <ul>{/* <li>{serverData}</li> */}</ul>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
