import React from "react";

interface Props {
  params: { slug: string[] };
}

const page = ({ params: { slug } }: Props) => {
  return <div>Product Page {slug?.join(" ")}</div>;
};

export default page;
