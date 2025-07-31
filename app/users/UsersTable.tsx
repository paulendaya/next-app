import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortType: string;
  sortOrder: string;
}

// Let's keep UsersTable inside users table folder
// In the future, if we need to use it another page, we can move it to the components folder

const UsersTable = async ({ sortType, sortOrder }: Props) => {
  // async functions are functions that return a promise
  // we await it because it returns a promise
  // a promise is a value that will be resolved at a later time
  // This page is rendered on the server side, meaning it will be executed on the server
  // and the result will be sent to the client and HTML will be rendered

  /* const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 }, // revalidate or recommunicate the page with the API every 10 seconds
  }); */
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();
  const sortOrderReverse = sortOrder && sortOrder === "asc" ? "desc" : "asc";
  const sortedusers = sort(users).asc(
    sortType === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <>
      <h1>Users</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>
                Name{" "}
                <Link
                  href={`/users?sortType=name&sortOrder=${sortOrderReverse}`}
                >
                  Sort
                </Link>
              </th>
              <th>
                Email{" "}
                <Link
                  href={`/users?sortType=email&sortOrder=${sortOrderReverse}`}
                >
                  Sort
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedusers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link href={`users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
