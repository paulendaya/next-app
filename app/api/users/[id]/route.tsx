import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
interface Props {
  params: { id: number };
}
//Get single object - Hardcoded
// export function GET(req: NextRequest, { params: { id } }: Props) { //use this if you want inline types
/* export function GET(req: NextRequest, { params }: Props) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "John Doe", email: "john@doe.com" });
} */
//Get single object - From Database
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } //we declare here as string because the actual value we get from params is a string
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }, //then, since our model expect
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

//Update an object - Hardcoded
/* export async function PUT(req: NextRequest, { params }: Props) {
  const body = await req.json();
  //Validate the request body
  //If invalid, return a 400 error
  //400 - Bad Request
  const validation = schema.safeParse(body); //safeParse returns the parsed data or throws an error
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
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
} */
//Update an object - Database
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  //Validate the request body
  const validation = schema.safeParse(body); //safeParse returns the parsed data or throws an error
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  //if user doesn't exists, return a 404 error
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }, //then, since our model expect
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //Update the user
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.name,
      email: body.email,
      followers: body.followers,
    },
  });

  //Return the updated user
  return NextResponse.json(updatedUser, { status: 200 });
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
