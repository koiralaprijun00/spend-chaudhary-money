import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/app/lib/firebase';
import type { Session } from 'next-auth';
import type { User } from 'next-auth';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Add other providers as needed
  ],
  adapter: FirestoreAdapter(db as any),
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Preserve locale in redirects
      // If the URL starts with baseUrl, it's an internal redirect
      if (url.startsWith(baseUrl)) return url;
      
      // Check if URL is an absolute URL to an external site 
      if (url.startsWith("http://") || url.startsWith("https://")) return url;
      
      // Relative URL - preserves locale paths
      return baseUrl + url;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page that will be locale-aware
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };