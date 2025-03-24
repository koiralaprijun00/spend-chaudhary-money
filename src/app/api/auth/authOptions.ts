// src/app/api/auth/authOptions.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../lib/mongodb";
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
          // Set a timeout for database operations
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Database connection timeout')), 5000)
          );
          
          const authPromise = async () => {
            console.log("Connecting to MongoDB for authentication...");
            const client = await clientPromise;
            const usersCollection = client.db("geo-nepal").collection("users");
            
            // Find user by email - only select necessary fields
            console.log("Looking for user:", credentials.email);
            const user = await usersCollection.findOne(
              { email: credentials.email },
              { projection: { _id: 1, email: 1, password: 1, name: 1, role: 1 } }
            );
            
            console.log("User found:", user ? "Yes" : "No");
            
            if (user && user.password === credentials.password) {
              console.log("Password matched for user");
              
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

              console.log("Generated access token, role:", user.role);

              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name || user.email.split('@')[0],
                role: user.role,
                accessToken: accessToken,
              };
            }
            
            console.log("Authentication failed - invalid credentials");
            return null;
          };
          
          // If we're in production, try fallback authentication if main auth fails
          try {
            // Try database authentication first
            return await Promise.race([authPromise(), timeoutPromise]) as User | null;
          } catch (dbError) {
            console.error("Database authentication error:", dbError);
            
            // Try fallback authentication for admins in production
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
            
            // Both authentication methods failed
            return null;
          }
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