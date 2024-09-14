"use client";

import { Server } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import Image from "next/image";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  PromiseLikeOfReactNode,
} from "react";

export default function ServerTableRow({
  serverId,
  server,
}: {
  serverId: string;
  server: Server;
}) {
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/servers/${serverId}/info`,
    fetcher
  );

  const skeleton_text = (
    <div className="h-2 w-16 bg-gray-500 rounded-full dark:bg-gray-700"></div>
  );

  // if (error)
  //   return (
  //     <tr key={serverId}>
  //       <th>
  //         <label>
  //           <input type="checkbox" disabled className="checkbox" />
  //         </label>
  //       </th>
  //       <td className="font-bold">{serverId}</td>
  //       <td>Error</td>
  //     </tr>
  //   );

  let has_error = false;
  if (error) {
    has_error = true;
    console.log(JSON.stringify(error));
  }
  if (data && "error" in data) {
    has_error = true;
    console.log(JSON.stringify(data));
    // data.info = {};
    // data.info.name = data.error;
    // data.info.map = "";
    // data.info.keywords = [];
  }

  return (
    <tr key={serverId}>
      {/* Checkbox */}
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      {/* ID */}
      {/* <td className="font-bold">{serverId}</td> */}
      {/* Status Name IP */}
      <td>
        <Link
          href={`/servers/${serverId}`}
          className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        >
          <div className="flex items-center space-x-3">
            {data && !has_error ? (
              <div className="badge badge-success badge-lg"></div>
            ) : null}
            {isLoading && !has_error ? (
              <div className="badge badge-outline badge-lg"></div>
            ) : null}
            {has_error ? (
              <div className="badge badge-error badge-lg"></div>
            ) : null}

            <div>
              <div className="font-bold">
                {data && !data.error && data?.info?.name
                  ? data.info.name
                  : null}
                {isLoading && !error ? skeleton_text : null}
                {has_error && data?.error == "Response timeout."
                  ? "Offline"
                  : null}
                {has_error && data?.error ? data.error : null}
              </div>
              <div className="text-sm opacity-50">
                {server.host}:{server.port}
              </div>
            </div>
          </div>
        </Link>
      </td>
      {/* Avatar Map */}
      <td>
        <div className="flex items-center space-x-3 my-auto">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {/* <Image
                src="http://www.placekitten.com/250/250"
                alt=""
                width={200}
                height={200}
              /> */}
            </div>
          </div>
          <div className="">
            {/* {data?.info?.map ? data.info.map : skeleton_text} */}
            {data?.info?.map}
          </div>
        </div>
      </td>
      {/* Tags */}
      <td>
        {/* {data?.info?.keywords
          ? data.info.keywords.map((keyword: string) => (
              <span key={keyword} className="badge badge-neutral badge-sm mr-1">
                {keyword}
              </span>
            ))
          : null}
        {!data && isLoading ? (
          <>
            <span className="badge badge-neutral badge-sm mr-1">
              {skeleton_text}
            </span>
            <span className="badge badge-neutral badge-sm mr-1">
              {skeleton_text}
            </span>
          </>
        ) : null} */}
        {data?.info?.keywords.map((keyword: string) => (
          <span key={keyword} className="badge badge-neutral badge-sm mr-1">
            {keyword}
          </span>
        ))}
      </td>
      {/* Players */}
      <td>
        {data?.info?.players ? (
          <div>
            {data?.info?.players?.online} / {data?.info?.players?.max}
          </div>
        ) : (
          <div></div>
        )}
      </td>
      {/* Owner */}
      <td>
        <div className="flex items-center space-x-3 my-auto">
          <div className="avatar">
            {server.owner?.image ? (
              <div className="mask mask-squircle w-12 h-12">
                {server.owner.image ? (
                  <Image
                    src={server.owner?.image}
                    alt=""
                    width={200}
                    height={200}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>{server.owner?.name}</div>
        </div>
      </td>
      {/* Admins */}
      <td>
        <div className="flex flex-col flex-1">
          {server.admins.map((admin: { name: string; id: string }) => (
            <div key={admin.id} className="flex flex-auto space-x-1 mb-1">
              <div className="avatar">
                <div className="mask mask-squircle w-6 h-6">
                  {admin.image ? (
                    <Image src={admin.image} alt="" width={200} height={200} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="items-center justify-center y">{admin.name}</div>
            </div>
          ))}
        </div>
      </td>
      {/* <td>{JSON.stringify(server)}</td> */}
      {/* <td>
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </td> */}
      <th>
        <Link className="btn btn-ghost btn-xs" href={`/servers/${serverId}`}>
          Details
        </Link>
      </th>
    </tr>
  );
}
