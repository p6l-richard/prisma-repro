import NextAuth from "next-auth";
import { authConfig as authEdgeConfig } from "./config.edge";
import { cache } from "react";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma/client";

const {
    auth: uncachedAuth,
    handlers: { GET, POST },
    signIn,
    signOut,
  } = NextAuth({
    ...authEdgeConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
  });

    export const auth = cache(async () => {
        try {
          return await uncachedAuth();
        } catch (err) {
          console.error("Error fetching session", err);
          // throw here instead of returning null so that nextjs navigation keeps working
          // see https://github.com/vercel/next.js/discussions/64076
          throw err;
        }
      });
export { signIn, signOut, GET, POST };