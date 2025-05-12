import NextAuth, { AuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/app/lib/firebase';
import type { Session } from 'next-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

// Ensure environment variables are available and throw early errors if not
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Missing Google OAuth credentials in environment variables');
}

if (!process.env.NEXTAUTH_SECRET) {
  console.error('Missing NEXTAUTH_SECRET environment variable');
}

// Get base URL for callbacks
const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  return 'http://localhost:3000'; // Default for local development
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.displayName,
              image: userCredential.user.photoURL,
            };
          }
          return null;
        } catch (error) {
          console.error('Firebase auth error:', error);
          throw new Error('Invalid email or password');
        }
      }
    }),
  ],
  adapter: FirestoreAdapter(db as any),
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Safely handle redirect URLs
      if (url.startsWith('/')) {
        // For relative URLs, build a full URL from the base URL
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        // Allow redirects to the same domain
        return url;
      }
      // Default fallback to baseUrl
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  logger: {
    error(code, metadata) {
      console.error('NextAuth error:', code, metadata);
    },
    warn(code) {
      console.warn('NextAuth warning:', code);
    },
    debug(code, metadata) {
      console.log('NextAuth debug:', code, metadata);
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };