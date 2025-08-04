import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: { id: number };
}
// export function GET(req: NextRequest, { params: { id } }: Props) { //use this if you want inline types
export function GET(req: NextRequest, { params }: Props) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "John Doe", email: "john@doe.com" });
}
