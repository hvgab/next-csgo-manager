import {
  HomeIcon,
  ServerStackIcon,
  ServerIcon,
  CheckBadgeIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
  TrophyIcon,
  InboxStackIcon,
  ArrowRightOnRectangleIcon,
  // ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import SidebarLogin from "./components/sidebar-login";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "My Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Servers", href: "/servers", icon: ServerIcon, current: false },
  {
    name: "Master Servers",
    href: "/master-servers",
    icon: ServerStackIcon,
    current: false,
  },
  {
    name: "Workshop Official Maps",
    href: "/workshop-officials",
    icon: CheckBadgeIcon,
    current: false,
  },
  {
    name: "Live Logs",
    href: "/logs",
    icon: InboxStackIcon,
    current: false,
  },
  {
    name: "Tournament",
    href: "#",
    icon: TrophyIcon,
    current: false,
    planned: true,
  },
  {
    name: "Settings",
    href: "#",
    icon: Cog8ToothIcon,
    current: false,
    planned: true,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-hidden bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      {/* Top Logo and Name Start */}
      <div className="flex">
        <div className="">
          <a href="#">
            <img className="w-auto h-12" src="/tournament-64.png" alt="" />
          </a>
        </div>
        <div className="m-auto text-xl font-bold text-stone-300">
          CS2 Manager
        </div>
      </div>
      {/* Top Logo and Name End */}

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 space-y-3 ">
          {/* Search */}
          <div className="relative mx-3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              placeholder="Search"
            />
          </div>

          {/* Left and Right Navigation */}
          <div className="flex">
            {/* Left Main Menu */}
            <div className="w-24">
              {navigation.map((item) => (
                <>
                  <a
                    key={item.name}
                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 hover:border-stone-600 hover:border-l-2"
                    href={item.href}
                  >
                    <div className="mx-auto flex flex-col items-center">
                      {/* icon */}
                      <span className="mx-2">
                        <item.icon className="h-7 text-stone-300" />
                      </span>
                      <span className="mx-2 text-xs font-medium content-center text-center">
                        {item.name}
                      </span>
                    </div>
                  </a>
                </>
              ))}
            </div>

            {/* Right  */}
            <div></div>
          </div>
        </nav>

        <div className="mt-6">
          {/* User */}
          <SidebarLogin></SidebarLogin>

          {/* Ad Box */}
          <div className="mt-6 p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
            <h2 className="text-sm font-medium text-gray-800 dark:text-white">
              New feature availabel!
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              harum officia eligendi velit.
            </p>

            <img
              className="object-cover w-full h-32 mt-2 rounded-lg"
              src="https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&h=1374&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
