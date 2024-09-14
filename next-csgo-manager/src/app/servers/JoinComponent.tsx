import React from "react";

interface ServerModel {
  ip: string;
  port: number;
  joinPassword: string;
}

interface JoinButtonProps {
  server: ServerModel;
}

const JoinButton: React.FC<JoinButtonProps> = ({ server }) => {
  const href = `steam://${server.ip}:${server.port}/${server.joinPassword}`;

  return (
    <a href={href} className="bg-primary rounded p-2">
      Join Server
    </a>
  );
};

export default JoinButton;
