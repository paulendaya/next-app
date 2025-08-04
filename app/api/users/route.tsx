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

export async function POST(req: NextRequest) {
  const body = await req.json();
  //Validate
  if (!body.name || !body.email)
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );
  //Generate the id
  const newBody = { id: Math.random(), ...body }; //...body means we're copying the object since we can't mutate it
  //Return the response
  return NextResponse.json(newBody, { status: 201 }); //201 - Created
}
