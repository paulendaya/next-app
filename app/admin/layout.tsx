import "../globals.css";
import React, { ReactNode } from "react";
import NavBar from "./partials/NavBar";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex gap-4">
      <aside className="bg-slate-200 p-4">Admin Sidebar</aside>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
