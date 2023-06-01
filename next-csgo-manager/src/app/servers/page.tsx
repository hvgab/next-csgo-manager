import ServerCard from "./server_card";

const { Server, RCON, MasterServer } = require("@fabricio-191/valve-server-query");

const servers = [
  {
    id: 1,
    href: "/servers/1",
    host: "theck1.no",
    port: 27015,
    rcon_password: "",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    href: "/servers/2",
    host: "theck1.no",
    port: 27030,
    rcon_password: "",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt: "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    href: "/servers/3",
    host: "csgo.gabbeh.no",
    port: 27016,
    rcon_password: "",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt: "Olive drab green insulated bottle with flared screw lid and flat top.",
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

        <div className="grid grid-cols-3">
          <ServerCard server={servers[0]} />
          <ServerCard server={servers[1]} />
          <ServerCard server={servers[2]} />
        </div>
      </div>
    </div>
  );
}
