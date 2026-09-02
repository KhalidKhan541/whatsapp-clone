import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");
  
  if (!conversationId) {
    return NextResponse.json({ error: "conversationId required" }, { status: 400 });
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: { sender: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content, senderId, conversationId, type = "text", mediaUrl } = body;

  const message = await prisma.message.create({
    data: { content, senderId, conversationId, type, mediaUrl },
    include: { sender: true },
  });

  return NextResponse.json(message);
}
