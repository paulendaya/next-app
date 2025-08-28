"use client"; //session provider only works on client side
import React from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>; //since SessionProvider only works on the client side, we had to create a provider component that only works on the client side
  //this way, we don't need to import the session provider on the server side
};

export default Provider;
