// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

// Create and export the route handlers
const handler = NextAuth(authOptions);

// Add some debugging
console.log("NextAuth handler initialized");

export { handler as GET, handler as POST };