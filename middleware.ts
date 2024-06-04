/**
 * 1️⃣ NextAuth config split 
 * this splits the nextauth config so that we avoid prisma here (works ✅)
 * 
 * Uncomment this block & comment out line xx to see the error go away
 * 
 * */ 
// import NextAuth from "next-auth"
// import { authConfig as authEdgeConfig } from "./auth/config.edge";
// export const { auth: middleware } = NextAuth(authEdgeConfig)

/**
 * 2️⃣ Bundled NextAuth config
 * 
 * This includes the prisma adapter in the NextAuth config, which works but throws an error with the wasm-edge-light-loader.js
 */
export {auth as middleware} from "./auth/config";



// Don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
