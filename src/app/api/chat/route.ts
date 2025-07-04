import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/gemini";
import { ChatApiMessage } from "@/types/chat";

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

    const response = await generateChatResponse(messages);

    return NextResponse.json({ response });
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
