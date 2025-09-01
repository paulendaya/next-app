"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession(); //this is the hook, a context object, that we use to get the session data, and to use this, it requires us to be in the client side using the "use client" directive
  return (
    <div className=" bg-slate-100 mb-2 ">
      <div className="bh-gov-container">
        <nav className="navbar">
          <ul className="flex gap-3 items-center justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <Link href="/about">Services</Link>
            </li>
            <li>
              <Link href="/about">Media</Link>
            </li>
            <li>
              <Link href="/upload">Upload</Link>
            </li>
            <li>
              <Link href="/about">Contact</Link>
            </li>
            {status === "loading" && <li>Loading...</li>}
            {status === "authenticated" && (
              <>
                <li>
                  Welcome, <strong>{session.user!.name}</strong>
                </li>
                <li>
                  <Link href="/api/auth/signout">Sign Out</Link>{" "}
                  {/* /api/auth/signout is the route that next-auth uses to sign out the user */}
                </li>
              </>
            )}
            {status === "unauthenticated" && (
              <li>
                <Link href="/api/auth/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
