import { AuthOptions, DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmail } from '@/app/lib/firebase-auth';
import { User } from 'next-auth';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      emailVerified: boolean;
    } & DefaultSession['user']
  }
  
  interface User {
    emailVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    emailVerified: boolean;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }
        
        try {
          const result = await signInWithEmail(
            credentials.email,
            credentials.password
          );
          
          if (!result.success) {
            throw new Error(result.error || 'Authentication failed');
          }

          if (!result.user) {
            throw new Error('User not found after successful authentication');
          }

          // Check if the user's email is verified
          if (!result.user.emailVerified) {
            throw new Error('Please verify your email before signing in');
          }
          
          return {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            image: result.user.photoURL,
            emailVerified: Boolean(result.user.emailVerified),
          };
        } catch (error: any) {
          console.error('Authentication error:', error);
          throw new Error(error.message || 'Authentication failed. Please try again later.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = Boolean(user.emailVerified);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || '';
        session.user.emailVerified = Boolean(token.emailVerified);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle relative and absolute URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow redirects to your own domain
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 