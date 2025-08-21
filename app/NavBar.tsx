import Link from "next/link";
import React from "react";

const NavBar = () => {
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
