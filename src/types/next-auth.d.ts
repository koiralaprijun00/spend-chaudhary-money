import { DefaultSession } from 'next-auth';

// Extend the existing Session type from NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
  
  interface User {
    id: string;
  }
}