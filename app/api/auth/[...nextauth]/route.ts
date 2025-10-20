import NextAuth from "next-auth";
import { authOptions } from "../authOptions";




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
//we're telling next-auth to use the /api/auth/[...nextauth] route for all the auth endpoints
