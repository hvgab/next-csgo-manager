import type { Meta, StoryObj } from "@storybook/react";

import ServerPlayers from "../app/components/ServerPlayers";
import { prisma } from "@/app/lib/database";
import { Prisma } from "@prisma/client";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
import { rest } from "msw";

export const DefaultBehavior = () => <ServerPlayers />;
const MockTemplate = () => <ServerPlayers />;
const infos = [
  {info: {
    address: "10.13.37.14:27015",
    protocol: 17,
    goldSource: false,
    name: "LinuxGSM",
    map: "de_dust2",
    folder: "csgo",
    game: "Counter-Strike 2",
    appID: "730",
    players: {
      online: 4,
      max: 16,
      bots: 0,
    },
    type: "dedicated",
    OS: "linux",
    visibility: "public",
    VAC: true,
    version: "1.39.9.4",
    port: 27015,
    steamID: "85568392931044813",
    keywords: ["empty", "secure"],
    gameID: "730",
  }},
];
]

SuccessBehavior.parameters = {
  msw: {
    handlers: [
      rest.get("/user", (req, res, ctx) => {
        return res(
          ctx.json({
            firstName: "Neil",
            lastName: "Maverick",
          })
        );
      }),
    ],
  },
};

const meta = {
  title: "CS2 Server PlayerCount",
  component: ServerPlayers,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} satisfies Meta<typeof ServerPlayers>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    serverId: "abc",
    // primary: true,
    // label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    serverId: "123",
    // label: "Button",
  },
};
