import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

//get all items from the database
export async function GET(req: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 200 });
}

//add a new item to the database
export async function POST(req: NextRequest) {
  //get the request body
  const body = await req.json();
  //validate the request body
  const validation = schema.safeParse(body); //safeParse returns the parsed data or throws an error
  if (!validation.success)
    //if the validation fails, return a 400 error
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  //add the new item to the database
  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  //return the response
  return NextResponse.json(newProduct, { status: 201 });
}
