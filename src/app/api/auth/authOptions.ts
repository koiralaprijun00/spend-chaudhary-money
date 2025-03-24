// src/app/api/auth/authOptions.ts
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGODB_URI; 

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    role?: string;
  }

  interface Session {
    accessToken?: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = new MongoClient(MONGO_URI!);
          await client.connect();
          const db = client.db('geo-nepal');
          const usersCollection = db.collection('users');

          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && user.password === credentials.password) {
            const accessToken = jwt.sign(
              { id: user._id, email: user.email, role: user.role },
              process.env.JWT_SECRET || 'default_secret_key',
              { expiresIn: '30d' }
            );
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        console.log('Setting JWT token data:', {
          accessToken: token.accessToken ? '[present]' : '[missing]',
          role: token.role,
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string;
      console.log('Setting session data:', {
        accessToken: session.accessToken ? '[present]' : '[missing]',
        role: session.role,
      });
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error', // Optional, you can set a custom error page
  },
};
