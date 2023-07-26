"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MasterServerTableRow({ key, ip, port }: { key: number; ip: string; port: number }) {
  const [data, setData] = useState({ info: { name: "loading" }, lastPing: 0 });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/master-servers/query`, { method: "POST", body: JSON.stringify({ ip: ip, port: port }) })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [ip, port, data]);

  if ("error" in data) return;

  return (
    <tr key={key}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div>
          <div className="">{ip}</div>
          <div className="text-sm opacity-50">{port}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="https://th.bing.com/th/id/R.3a7decdea529016c67ab109a23c5b942?rik=WgyFavkHD61x1A&riu=http%3a%2f%2fassets.vg247.com%2fcurrent%2f2015%2f03%2fde_dust2_cs_go.jpg&ehk=935D2JZYGs2s1cPWm%2fpCm%2f0H6tKEWoQA%2fsYhbtb%2b45Y%3d&risl=&pid=ImgRaw&r=0"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{data.info.name}</div>
            <div className="text-sm opacity-50">{data.info.map}</div>
          </div>
        </div>
      </td>
      <td>
        {data.info.game} ({data.info.folder})
      </td>
      <td>
        {data.info.name}
        <span className="badge badge-ghost badge-sm">{data.info.map}</span>
      </td>
      <td>{data.lastPing}</td>
      <td>
        {JSON.stringify(data.info.players, null, 4)}
        {JSON.stringify(data.players, null, 4)}
      </td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
}
