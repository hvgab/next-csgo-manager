const { Server, RCON, MasterServer } = require("@fabricio-191/valve-server-query");

const server = {
  id: 1,
  name: "GP 3",
  href: "#",
  host: ":27015",
  ip: "",
  port: 27015,
  rcon_password: "",
  imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  imageAlt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
};

export default async function ServerDetail({ params }) {
  console.log("ServerDetail params");
  console.log(params);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-gray-700 text-2xl">{server.name}</h2>

        <div className="text-gray-700">
          <table>
            <tr>
              <th>id</th>
              <td>{server.id}</td>
            </tr>
            <tr>
              <th>name</th>
              <td>{server.name}</td>
            </tr>
            <tr>
              <th>host</th>
              <td>{server.host}</td>
            </tr>
            <tr>
              <th>ip</th>
              <td>{server.ip}</td>
            </tr>
            <tr>
              <th>port</th>
              <td>{server.port}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
