import React from "react";
import UsersTable from "./UsersTable";
import Link from "next/link";

interface Props {
  searchParams: { sortType: string; sortOrder: string }; //
}

const usersPage = ({ searchParams: { sortType, sortOrder } }: Props) => {
  return (
    <>
      <Link href="/users/new" className="btn my-3">
        {" "}
        New User{" "}
      </Link>
      <UsersTable sortOrder={sortOrder} sortType={sortType} />
    </>
  );
};

export default usersPage;
