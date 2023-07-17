"use client";

import Link from "next/link";
import useSWR from "swr";

export default function ServerTableRow({ serverId }: { serverId: number }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/servers/${serverId}/query`, fetcher);

  if (isLoading)
    return (
      <tr key={serverId}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td className="font-bold">{serverId}</td>
        <td>Loading</td>
        <td>Loading</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <Link className="btn btn-ghost btn-xs" href={`/servers/${serverId}`}>
            Details
          </Link>
        </th>
      </tr>
    );
  if (error)
    return (
      <tr key={serverId}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td className="font-bold">{serverId}</td>
        <td>Error</td>
        <td>Error</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <Link className="btn btn-ghost btn-xs" href={`/servers/${serverId}`}>
            Details
          </Link>
        </th>
      </tr>
    );

  return (
    <tr key={serverId}>
      {/* Checkbox */}
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      {/* ID */}
      <td className="font-bold">{serverId}</td>
      {/* Avatar Name Map */}
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{data.info.name}</div>
            <div className="text-sm opacity-50">{data.info.map}</div>
          </div>
        </div>
      </td>
      {/* Tags */}
      <td>
        {data.info.keywords.map((keyword) => (
          <span key={keyword} className="badge badge-ghost badge-sm">
            {keyword}
          </span>
        ))}
      </td>
      {/* <td>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </td> */}
      <th>
        <Link className="btn btn-ghost btn-xs" href={`/servers/${serverId}`}>
          Details
        </Link>
      </th>
    </tr>
  );
}
