//if we want handle http requests, we need to a route file,
//otherwise, for outputting HTML or markup, we create a page file

import { NextRequest, NextResponse } from "next/server";

//GET - getting data
//POST - creating data
//PUT - updating data
//DELETE - deleting data

export function GET(req: NextRequest) {
  // let's keep the req even if we don't use it so NextJS won't cache the response
  const users = [
    { id: 1, name: "John Doe", email: "john@doe.com" },
    { id: 2, name: "Jane Doe", email: "jane@doe.com" },
  ];
  return NextResponse.json(users);
}
