//this is a middleware file that we use to protect certain routes
//for example, we don't want to show the admin dashboard to users who are not authenticated
export { default } from "next-auth/middleware";

//we are exporting the default middleware from next-auth/middleware
//we are also using the matcher function to protect certain routes

export const config = {
  // *: means zero or more
  // +: means one or more
  // ?: means zero or one
  matcher: ["/dashboard/:path*", "/auth/reset-password:path*"],
};
//config is an object that contains the matcher function
