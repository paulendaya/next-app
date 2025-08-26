import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, //the exclamation mark is added to tell typescript we do have this value at compile time
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
});

export { handler as GET, handler as POST };
//we're telling next-auth to use the /api/auth/[...nextauth] route for all the auth endpoints