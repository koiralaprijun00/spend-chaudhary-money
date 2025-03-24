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
  secret: process.env.NEXTAUTH_SECRET,
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
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
    const client = await clientPromise;
    const usersCollection = client.db("geo-nepal").collection("users");

    // Find user by email
    const user = await usersCollection.findOne({ email: credentials.email });
    
    console.log("Found user:", user); // Add this log for debugging
    
    if (user && user.password === credentials.password) {
      // Generate a JWT as the access token
      const accessToken = jwt.sign(
        {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "30d" }
      );

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name || user.email.split('@')[0],
        role: user.role,
        accessToken: accessToken,
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
        token.role = user.role;
        console.log('Setting JWT token data:', { accessToken: token.accessToken ? '[present]' : '[missing]', role: token.role });
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string;
      console.log('Setting session data:', { accessToken: session.accessToken ? '[present]' : '[missing]', role: session.role });
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error"
  }
};