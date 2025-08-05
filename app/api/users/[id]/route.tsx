import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: { id: number };
}
//Get single object
// export function GET(req: NextRequest, { params: { id } }: Props) { //use this if you want inline types
export function GET(req: NextRequest, { params }: Props) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "John Doe", email: "john@doe.com" });
}

//Update an object
export async function PUT(req: NextRequest, { params }: Props) {
  const body = await req.json();
  //Validate the request body
  //If invalid, return a 400 error
  //400 - Bad Request
  if (!body.name || !body.email)
    return NextResponse.json(
      { error: "Missing name or email" },
      { status: 400 }
    );

  //if user doesn't exists, return a 404 error
  //404 - Not Found
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //Update the user
  //Return the updated user
  return NextResponse.json(
    {
      id: params.id,
      name: body.name,
      email: body.email,
    },
    { status: 200 }
  );
}

//DELETE an object
export async function DELETE(req: NextRequest, { params }: Props) {
  //Fetch the user from the DB
  //if user doesn't exists, return a 404 error
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //DELETE the user
  //Return a 200 OK response
  return NextResponse.json(
    {
      message: `User ${params.id} deleted`,
    },
    { status: 200 }
  );
}
