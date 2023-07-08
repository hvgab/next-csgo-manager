"use client";
import { useState, useEffect } from "react";

export default async function RconComponent({ serverId }: { serverId: number }) {
  console.log("RconComponent Start");
  // Variables
  const [serverData, setServerData] = useState({ info: { name: "Loading" } });
  const [rconResponses, setRconResponses] = useState(["Rcon Response"]);
  // const [rconCommand, setRconCommand] = useState("");

  useEffect(() => {
    fetch(`/api/servers/${serverId}/query`)
      .then((res) => res.json())
      .then((data) => {
        setServerData(data);
      });
  }, [serverId]);

  if (!serverData) {
    return <div>No ServerData</div>;
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      rcon_command: event.target.rcon_command.value,
    };
    console.log(`Data: ${data}`);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);
    console.log("JSONdata");
    console.log(JSONdata);

    // API endpoint where we send form data.
    const endpoint = `/api/servers/${serverId}/rcon`;
    console.log(endpoint);

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(`Result: \n${JSON.stringify(result)}`);
    console.log(`Result: \n${JSON.stringify(result.result)}`);

    setRconResponses(rconResponses.concat(result.result));
  };

  console.log("RconComponent End");

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1>{serverData.info.name} Rcon</h1>

        <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg text-neutral-600">
          <h2>Rcon Responses</h2>
          <ul>
            {rconResponses.map((rconResponse) => (
              <li key={rconResponse}>{rconResponse}</li>
            ))}
          </ul>
        </div>
        {/* We pass the event to the handleSubmit() function on submit. */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="rcon_command">Rcon Command</label>
          <input type="text" id="rcon_command" name="rcon_command" required className="text-neutral-600" />
          <button type="submit">Submit</button>
        </form>

        <ul className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row">
          <li>
            <button
              className="my-2 block rounded bg-blue-500 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-100"
              id="status"
            >
              Status
            </button>
          </li>
        </ul>
        <button
          // disabled={!rconCommand}
          // onClick={sendRconCommand}
          className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2"
        >
          Send Rcon
        </button>
        <br />
        <button className="border rounded-md border-blue-200 bg-blue-200 px-4 py-2">Status</button>
        <button>Maps</button>
      </div>
    </>
  );
}
