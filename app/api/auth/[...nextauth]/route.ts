import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  // :NextAuthOptions is a type that defines the options for the next-auth library
  adapter: PrismaAdapter(prisma), //we're using the prisma adapter to store the user in the database
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, //the exclamation mark is added to tell typescript we do have this value at compile time
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", //jwt is the default strategy, this fixes the signing error that says "Try signing in with a different account"
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//we're telling next-auth to use the /api/auth/[...nextauth] route for all the auth endpoints
