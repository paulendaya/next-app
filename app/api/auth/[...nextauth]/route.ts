import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, //the exclamation mark is added to tell typescript we do have this value at compile time
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//we're telling next-auth to use the /api/auth/[...nextauth] route for all the auth endpoints