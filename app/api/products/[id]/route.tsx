import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

//Get single object - Database
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

//Update a product - Database
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

  //if product doesn't exists, return a 404 error
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  //Update the product
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  //Return the updated product
  return NextResponse.json(updatedProduct, { status: 200 });
}

//delete a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //Fetch the product from the DB
  //if product doesn't exists, return a 404 error
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  //DELETE the product
  await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  //Return a 200 OK response
  return NextResponse.json(
    {
      message: `Product ${params.id} deleted`,
    },
    { status: 200 }
  );
}
