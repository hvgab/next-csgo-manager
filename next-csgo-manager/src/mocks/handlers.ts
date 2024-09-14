import { rest } from "msw";

export const handlers = [
  rest.get("/api/servers/abc/info", (req, res, ctx) => {
    return res(
      ctx.json({
        info: {
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
        },
      })
    );
  }),

  rest.get("https://my.backend/book", (_req, res, ctx) => {
    return res(
      ctx.json({
        title: "Lord of the Rings",
        imageUrl: "/book-cover.jpg",
        description:
          "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
      })
    );
  }),

  rest.get("/reviews", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "60333292-7ca1-4361-bf38-b6b43b90cb16",
          author: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
      ])
    );
  }),
];
