"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SidebarLogin() {
  const { data: session, status } = useSession();
  if (status === "authenticated" && session.user) {
    return (
      <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center gap-x-2">
          <img
            className="object-cover rounded-full h-7 w-7"
            src={session?.user?.image}
            alt="avatar"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {session.user.name}
          </span>
        </a>

        <a
          href="#"
          className="text-gray-500 transition-colors duration-200 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
        >
          {/* logout icon */}
          <button onClick={() => signOut()}>
            {/* <span className="hidden">Sign out</span> */}
            <ArrowRightOnRectangleIcon className="h-5 w-5"></ArrowRightOnRectangleIcon>
          </button>
        </a>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        type="button"
        className="
        w-full

        text-white 
        bg-[#5865F2] 
        
        hover:bg-[#5865F2]/90 
        focus:ring-4 
        focus:outline-none 
        focus:ring-[#5865F2]/50 
        font-medium 
        rounded-lg 
        text-sm 
        
        px-4
        py-3
        text-center 
        inline-flex 
        items-center 
        
        dark:focus:ring-gray-500 
        dark:hover:bg-[#050708]/30 
        
        
        mb-2

        "
      >
        {/* <!-- https://feathericons.dev/?search=discord&iconset=brands --> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="main-grid-item-icon mr-2"
          fill="none"
        >
          <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037c-1.687.29-3.33.8-4.885 1.515a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.227-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.078.078 0 0 1-.038-.062.077.077 0 0 1 .03-.066c.126-.094.252-.192.372-.292a.075.075 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.076.076 0 0 1 .03.065.078.078 0 0 1-.036.063c-.599.349-1.225.647-1.873.89a.076.076 0 0 0-.05.076c.001.012.004.022.009.032.36.698.772 1.362 1.225 1.993a.077.077 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03ZM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"
            fill="#fff"
          />
        </svg>
        Sign in with Discord
        {/* Discord Color #5865F2 */}
      </button>
    </>
  );
}
