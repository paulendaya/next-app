import NextAuth from "next-auth"

const handler = NextAuth({});

export { handler as GET, handler as POST };
//we're telling next-auth to use the /api/auth/[...nextauth] route for all the auth endpoints