
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";


declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
    callbacks: {
        signIn: async ({ user }) => {
            if (user.id) {
              return true;
            }
            return false;
          },      
        session: async ({ session, token, user: _ }) => {
            if (token?.sub) {
              session.user.id = token.sub;
            }
            console.log('returning sesh', session)
            return session;
          },
          authorized({ auth, request: { nextUrl } }) {
            if (auth?.user?.id && nextUrl.pathname === "/") {
              return true;
            }
            return false;
          }
    },
    providers: [
      Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              if (credentials.username === "" || credentials.password ==="") {
                return null;
              }
              let user = { id: "1", username: credentials.username, password: credentials.password};
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;
