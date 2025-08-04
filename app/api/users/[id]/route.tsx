import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: { id: number };
}
export function GET(req: NextRequest, { params }: Props) {
    if (params.id > 10) return notFound();
  return NextResponse.json([
    { id: 1, name: "John Doe", email: "john@doe.com" },
  ]);
}
