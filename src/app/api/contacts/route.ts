import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, phone: true, avatar: true, status: true, lastSeen: true },
  });
  return NextResponse.json(users);
}
