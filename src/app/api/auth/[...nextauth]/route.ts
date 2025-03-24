// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import { NextAuthOptions, Session } from "next-auth";

// Extend the Session and User types to include role
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    role?: string | null;
  }
}

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const usersCollection = client.db("geo-nepal").collection("users");
          
          // Find user by email
          const user = await usersCollection.findOne({ 
            email: credentials.email 
          });
          
          // In a real application, you should compare hashed passwords
          // This is simplified for this example
          if (user && user.password === credentials.password) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role // Include the role in the user object
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    // Include user.role in session
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string | null | undefined;
      }
      return session;
    },
    // Include user.role in JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: "/login",
    error: "/error"
  },
  session: {
    strategy: "jwt"
  }
};

// Export a handler function for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };