import NextAuth from "next-auth";

// import Atlassian from "next-auth/providers/atlassian"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
import Discord from "next-auth/providers/discord";
// import Faceit from "next-auth/providers/faceit"
// import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
// import Google from "next-auth/providers/google"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import type { NextAuthConfig } from "next-auth";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
});
