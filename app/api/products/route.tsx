import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(req: NextRequest) {
  return NextResponse.json(
    [
      { id: 1, name: "Milk", price: 2.5 },
      { id: 1, name: "Bread", price: 3.5 },
    ],
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  //Validate
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  //Generate the id
  const newBody = { id: Math.random(), ...body }; //...body means we're copying the object since we can't mutate it
  //Add the new item to the database
  //Return the response
  return NextResponse.json(newBody, { status: 201 }); //201 - Created
}
