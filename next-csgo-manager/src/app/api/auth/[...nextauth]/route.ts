// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import DiscordProvider from "next-auth/providers/discord";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import type { Adapater } from "@auth/core/adapters";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const handler = NextAuth({
//   // db config
//   adapter: PrismaAdapter(prisma),
//   // Configure one or more authentication providers
//   providers: [
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

export { GET, POST } from "@/app/auth";
