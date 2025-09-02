import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // :NextAuthOptions is a type that defines the options for the next-auth library
  adapter: PrismaAdapter(prisma), //we're using the prisma adapter to store the user in the database
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );
        return passwordsMatch ? user : null;
      },
    }),
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
