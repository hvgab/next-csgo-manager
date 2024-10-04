"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Fragment, JSX, PromiseLikeOfReactNode, ReactFragment } from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoginButton from "./login-btn";
import { getServerData, getServerInfo } from "@/lib/local_api";
import { getServer } from "@/lib/db_queries";

function navigation(serverId) {
  return [
    { name: "Dashboard", href: `/servers/${serverId}`, current: true },
    { name: "RCON", href: `/servers/${serverId}/rcon`, current: false },
    { name: "Feed (logs)", href: `/servers/${serverId}/feed`, current: false },
    { name: "Players", href: `/servers/${serverId}/players`, current: false },
  ];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default async function ServerNavbar({ serverId }: { serverId: string }) {
  const server = getServerData(serverId);
  const { data: session } = useSession();
  const serverInfo = await getServerInfo(serverId);
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">{}</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>

          {navigation.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
