import React, { FormEvent, useState } from "react";

export default function CreateServer() {
  return (
    <div className="w-full max-w-xs m-auto">
      <form
        method="POST"
        action="/api/servers"
        // onSubmit={submitForm}
        className="dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label htmlFor="host" className="block mb-2">
            Host
          </label>
          <input
            required
            type="text"
            id="host"
            name="host"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="port" className="block mb-2">
            Port
          </label>
          <input
            required
            type="number"
            id="port"
            name="port"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="loginPassword" className="block mb-2">
            Login Password
          </label>
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="rconPassword" className="block mb-2">
            Rcon Password
          </label>
          <input
            type="password"
            id="rconPassword"
            name="rconPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="admins" className="block mb-2">
            Admins
          </label>
          <input
            type="text"
            name="admins"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
