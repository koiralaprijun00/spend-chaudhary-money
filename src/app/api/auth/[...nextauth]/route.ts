// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

// Create and export the route handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };