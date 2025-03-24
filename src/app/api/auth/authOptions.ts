// src/app/api/auth/authOptions.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface User {
    accessToken?: string;
    role?: string;
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
  },
  session: {
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

      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try fallback authentication for admins in production
          // This will bypass the MongoDB connection issue
          if (
            process.env.NODE_ENV === 'production' && 
            credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD
          ) {
            console.log('Using fallback admin authentication');
            return {
              id: 'admin-fallback',
              email: credentials.email,
              name: 'Admin',
              role: 'admin',
              accessToken: jwt.sign(
                { id: 'admin-fallback', email: credentials.email, role: 'admin' },
                process.env.JWT_SECRET || "default_secret_key",
                { expiresIn: "30d" }
              )
            };
          }
          
          // If not admin or not in production, return null
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
        console.log('Setting JWT token data:', { 
          accessToken: token.accessToken ? '[present]' : '[missing]', 
          role: token.role 
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string;
      console.log('Setting session data:', { 
        accessToken: session.accessToken ? '[present]' : '[missing]', 
        role: session.role 
      });
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error"
  }
};