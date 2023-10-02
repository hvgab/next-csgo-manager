"use client";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { DateTime } from "luxon";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

export default function RconComponent({ serverId }: { serverId: number }) {
  console.log("RconComponent Start");

  // Variables
  // const [serverData, setServerData] = useState({ info: { name: "Loading" } });
  const [rconResponses, setRconResponses] = useState(["Rcon Response"]);
  const [rconCommandHistory, setRconCommandHistory] = useState([]);
  const [rconCommandHistoryId, setRconCommandHistoryId] = useState(1);
  const [firstStatusHasLoaded, setFirstStatusHasLoaded] = useState(false);
  const { data: session } = useSession();

  const { data: serverData, error: serverDataError } = useSWR("/api/servers/" + serverId, fetcher);
  if (serverData) {
    console.log("ServerData:::");
    console.log(serverData);
  }
  // Run "status" on page load as init data
  useEffect(() => {
    function doHandleCommand(rcon_command: string) {
      return handleCommand(rcon_command);
    }
    if (firstStatusHasLoaded === false) {
      setFirstStatusHasLoaded(true);
      doHandleCommand("status");
    }
    scrollToForm();
  }, []);

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const rcon_command = event.target.rcon_command.value;

    // Send to command handler
    handleCommand(rcon_command);
  };

  // Handles all commands, forms, buttons, etc
  const handleCommand = async (rcon_command: string) => {
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify({ rcon_command: rcon_command });

    // Add command to history
    const commandToHistory = {
      id: rconCommandHistoryId,
      senderType: "user",
      sender: session.user.name,
      dateTime: Date.now().toString(),
      message: rcon_command,
    };
    setRconCommandHistory([...rconCommandHistory, commandToHistory]);

    // API endpoint where we send form data.
    const endpoint = `/api/servers/${serverId}/rcon`;

    // Form the request for sending data to the server.
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    console.log(`options: ${JSON.stringify(options)}`);

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
    console.log(`response: ${JSON.stringify(response)}`);

    // Get the response data from server as JSON.
    let result;
    try {
      result = await response.json();
    } catch (error) {
      result = { response: `${error.name} ${error.code} ${error.message}` };
    }
    console.log(`result: ${JSON.stringify(result)}`);

    // Add response to history
    const responseToHistory = {
      id: rconCommandHistoryId + 1,
      senderType: "server",
      sender: serverData?.info?.name,
      dateTime: Date.now().toString(),
      message: result.response,
    };
    setRconCommandHistory([...rconCommandHistory, commandToHistory, responseToHistory]);
    setRconCommandHistoryId(rconCommandHistoryId + 2);
    // Scroll after DOM
    scrollToForm();
  };

  // Premade command STATUS
  const handleCommandStatus = async () => {
    await handleCommand("status");
  };

  // Premade command MAPS *
  const handleCommandMaps = async () => {
    await handleCommand("maps *");
  };

  // Scroll to bottom after each command
  const scrollToForm = async () => {
    const element = document.getElementById("rcon-form");
    console.log(`element: ${element}`);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log("RconComponent End");

  function relativeTime(unixSeconds) {
    const myDateTime = DateTime.fromMillis(parseInt(unixSeconds));
    return `${myDateTime.toISOTime({
      suppressMilliseconds: true,
      includeOffset: false,
      suppressSeconds: true,
    })} - ${myDateTime.toRelative()}`;
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1>{serverData?.info?.name} Rcon</h1>

        <div id="chat">
          <h2>RCON Chat</h2>
          {rconCommandHistory.map((history) => (
            <div
              key={history.id}
              id={`history-${history.id}`}
              className={history.senderType == "server" ? "chat chat-start" : "chat chat-end"}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      history.senderType == "user"
                        ? session?.user?.image
                        : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    alt="Server Avatar"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="chat-header">{history.sender}</div>
              <div className="chat-bubble">
                <pre>{history.message}</pre>
              </div>
              <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">{relativeTime(history.dateTime)}</time>
                {/* Delivered */}
              </div>
            </div>
          ))}
        </div>

        {/* 
          Form

          We pass the event to the handleSubmit() function on submit. 
        */}
        <form onSubmit={handleSubmit} id="rcon-form">
          <label htmlFor="rcon_command">Rcon Command</label>
          <input
            type="text"
            id="rcon_command"
            name="rcon_command"
            required
            placeholder="status"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button type="submit" className="btn btn-info">
            Send Rcon
          </button>
        </form>

        {/* Premade Buttons */}
        <div className="flex flex-wrap items-center gap-2 my-5">
          <button className="btn border-blue-200 bg-blue-200" onClick={handleCommandStatus}>
            Status
          </button>
          <button className="btn border-blue-200 bg-blue-200" onClick={handleCommandMaps}>
            Maps
          </button>
        </div>
      </div>
    </>
  );
}
