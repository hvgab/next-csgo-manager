"use client";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

export default function RconComponent({ serverId }: { serverId: number }) {
  console.log("RconComponent Start");

  // Variables
  const [serverData, setServerData] = useState({ info: { name: "Loading" } });
  const [rconResponses, setRconResponses] = useState(["Rcon Response"]);
  const [rconCommandHistory, setRconCommandHistory] = useState([]);
  const [rconCommandHistoryId, setRconCommandHistoryId] = useState(1);
  const [firstStatusHasLoaded, setFirstStatusHasLoaded] = useState(false);

  // Run "status" on page load as init data
  useEffect(() => {
    if (firstStatusHasLoaded === false) {
      setFirstStatusHasLoaded(true);
      handleCommand("status");
    }
    scrollToForm();
  }, [firstStatusHasLoaded]);

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
    console.log("JSONdata");
    console.log(JSONdata);

    // Add command to history
    const commandToHistory = {
      id: rconCommandHistoryId,
      senderType: "user",
      sender: "Gabbeh",
      dateTime: Date.now().toString(),
      message: rcon_command,
    };
    setRconCommandHistory([...rconCommandHistory, commandToHistory]);
    console.log(`command id: ${rconCommandHistoryId}`);

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
    console.log(`Result: \n${result.response}`);
    /* \n to <br>  */
    const rcon_text = result.response.replace(/\\n/g, "<br />");
    console.log(`rcon_text: \n ${rcon_text}`);

    // Add response to history
    const responseToHistory = {
      id: rconCommandHistoryId + 1,
      senderType: "server",
      sender: "Server",
      dateTime: Date.now().toString(),
      message: result.response,
    };
    setRconCommandHistory([...rconCommandHistory, commandToHistory, responseToHistory]);
    console.log(`result id: ${rconCommandHistoryId + 1}`);
    setRconCommandHistoryId(rconCommandHistoryId + 2);
    console.log(`new id: ${rconCommandHistoryId}`);
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

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1>{serverData.info.name} Rcon</h1>

        <div id="chat">
          <h2>RCON Chat</h2>
          {rconCommandHistory.map((history) => (
            <div key={history.id} id={`history-${history.id}`} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="chat-header">
                {history.sender} {history.id}
                <time className="text-xs opacity-50">{history.dateTime}</time>
              </div>
              <div className="chat-bubble">
                <pre>{history.message}</pre>
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
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
