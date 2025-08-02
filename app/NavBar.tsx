import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar bg-base-100">
        <ul className="flex">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/about">Services</Link>
          </li>
          <li>
            <Link href="/about">Media</Link>
          </li>
          <li>
            <Link href="/about">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
