import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const bodySchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { token, password } = parsed.data;

    // Look up the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json({ error: "Invalid or used token" }, { status: 400 });
    }

    if (resetToken.expires < new Date()) {
      // Expired
      // Clean up the expired token
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Ensure the user exists
    const user = await prisma.user.findUnique({ where: { id: resetToken.userId } });
    if (!user || !user.email) {
      // Clean up token as it's not usable
      await prisma.passwordResetToken.delete({ where: { token } });
      return NextResponse.json({ error: "User not found for token" }, { status: 404 });
    }

    // Hash the new password and update user
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword },
      }),
      prisma.passwordResetToken.delete({ where: { token } }),
    ]);

    return NextResponse.json({ message: "Password has been reset successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error resetting password", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}