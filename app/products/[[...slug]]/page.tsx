import React from "react";

interface Props {
  params: { slug: string[] }; // params is an object that contains the slug parameter and other parameters
  searchParams: { sortOrder: string };
}

const page = ({ params: { slug }, searchParams: { sortOrder } }: Props) => {
  return (
    <div>
      Product Page {slug?.join(" ")} {sortOrder}
    </div>
  );
};

export default page;
