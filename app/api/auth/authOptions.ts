import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    // :NextAuthOptions is a type that defines the options for the next-auth library
    debug: true,
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
        allowDangerousEmailAccountLinking: true,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
        allowDangerousEmailAccountLinking: true,
      }),
    ],
    session: {
      strategy: "jwt", //jwt is the default strategy, this fixes the signing error that says "Try signing in with a different account"
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        /* // If the URL is a relative URL, make it absolute
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // If the URL is on the same origin, allow it
        else if (new URL(url).origin === baseUrl) return url; */
        // Otherwise, redirect to dashboard
  
        /* const user = await auth();
        if (user?.role === "admin") {
          return `${baseUrl}/admin`;
        } */
  
        return `${baseUrl}/dashboard`;
      },
      async signIn({ user, account, profile }) {
        console.log("🔍 Debug SignIn ----");
        console.log("user:", JSON.stringify(user, null, 2));
        console.log("account:", JSON.stringify(account, null, 2));
        console.log("profile:", JSON.stringify(profile, null, 2));
        console.log("---------------------");
  
        return true;
      },
    },
  };