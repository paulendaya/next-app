import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  //validate the request body
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  //check if user already exists
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 }); //400 - Bad Request

  //hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  //create the user
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });

  //return the user
  return NextResponse.json(
    { message: "User created successfully", email: newUser.email },
    { status: 201 } //201 - Created
  );
}
