// src/app/api/auth/authOptions.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    role?: string;
  }
}

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
    cookies: {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
          },
        },
      },session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

// Inside the authorize function
// Inside the authorize function
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    const client = await clientPromise;
    const usersCollection = client.db("geo-nepal").collection("users");

    // Find user by email
    const user = await usersCollection.findOne({ email: credentials.email });

    if (user && user.password === credentials.password) {
      // Generate a JWT as the access token
      const accessToken = jwt.sign(
        {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        }, // Payload
        process.env.JWT_SECRET || "K9mP!vWqL2rY5jF8hN3dQ6tJ2zC4xB7nM0pR5sT8uV1wX4yZ6aE2cG9iH3kL6", // Use the secret key from the environment or a default value
        { expiresIn: "30d" } // Token expiration
      );

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        accessToken: accessToken, // Use the generated JWT
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role; // Ensure the role is added here
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string;  // Pass the role from the token to the session
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error"
  }
};