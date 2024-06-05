import NextAuth from "next-auth";
import { authConfig as authEdgeConfig } from "./config.edge";
// import { cache } from "react";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/prisma/client";

const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
  } = NextAuth({
    ...authEdgeConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
  });

// export const auth = cache(async () => {
//     return await uncachedAuth();
// });
export { signIn, signOut, GET, POST, auth };