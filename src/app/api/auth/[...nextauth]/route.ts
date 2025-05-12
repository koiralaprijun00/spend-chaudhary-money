import NextAuth, { AuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/app/lib/firebase';
import type { Session } from 'next-auth';
import type { User } from 'next-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
            };
          }
          return null;
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      }
    }),
  ],
  adapter: FirestoreAdapter(db as any),
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("http://") || url.startsWith("https://")) return url;
      return baseUrl + url;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };