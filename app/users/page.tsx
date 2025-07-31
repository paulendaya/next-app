import React from "react";
import UsersTable from "./UsersTable";

interface Props {
  searchParams: { sortType: string; sortOrder: string }; //
}

const usersPage = ({ searchParams: { sortType, sortOrder } }: Props) => {
  return (
    <>
      {/* {sortOrder} */}
      <UsersTable sortOrder={sortOrder} sortType={sortType} />
    </>
  );
};

export default usersPage;
