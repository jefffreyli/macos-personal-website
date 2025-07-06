import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";
import { ChatApiMessage } from "@/types/chat";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format: messages must be an array" },
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array cannot be empty" },
        { status: 400 }
      );
    }

    // Validate message format
    const isValidMessage = (msg: ChatApiMessage) =>
      msg.role &&
      (msg.role === "user" || msg.role === "model") &&
      typeof msg.content === "string";

    if (!messages.every(isValidMessage)) {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Get the latest user message (the one we need to save)
    const latestUserMessage = messages[messages.length - 1];

    // Save the user message to database
    const savedUserMessage = await prisma.message.create({
      data: {
        content: latestUserMessage.content,
        isBot: false,
        timestamp: new Date(),
      },
    });

    // Generate bot response
    const response = await generateChatResponse(messages);

    // Save the bot response to database
    const savedBotMessage = await prisma.message.create({
      data: {
        content: response,
        isBot: true,
        timestamp: new Date(),
      },
    });

    return NextResponse.json({
      response,
      userMessageId: savedUserMessage.id,
      botMessageId: savedBotMessage.id,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    if (
      error instanceof Error &&
      error.message.includes("Failed to load system prompt")
    ) {
      return NextResponse.json(
        { error: "Failed to initialize chat system" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
