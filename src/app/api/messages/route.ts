import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        timestamp: "asc",
      },
    });

    // Transform database messages to match frontend Message type
    const transformedMessages = messages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp.toISOString(),
      isBot: msg.isBot,
    }));

    return NextResponse.json({ messages: transformedMessages });
  } catch (error) {
    console.error("Messages API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
