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
  { name: "List", href: "/", icon: HomeIcon, current: true },
  { name: "Create", href: "/", icon: HomeIcon, current: true },
];

// This is the *ORGANIZATIONS* sidebar!
export default function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-hidden bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          {navigation.map((item) => (
            <>
              <a
                key={item.name}
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 hover:border-stone-600 hover:border-l-2"
                href={item.href}
              >
                {/* icon */}
                <item.icon className="h-5 w-5 text-stone-300" />

                <span className="mx-2 text-sm font-medium">{item.name}</span>
              </a>
            </>
          ))}
        </nav>
      </div>
    </aside>
  );
}
