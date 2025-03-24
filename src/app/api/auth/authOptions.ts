// src/app/api/auth/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../lib/mongodb";

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
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
          if (user && user.password === credentials.password) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role
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
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string | null | undefined;
      }
      return session;
    },
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