import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePersonalSystemPrompt } from "./personal-context";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Try different model names in order of preference
const getModel = () => {
  const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

  for (const modelName of modelNames) {
    try {
      return genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: generatePersonalSystemPrompt(),
      });
    } catch (error) {
      console.warn(`Failed to load model ${modelName}:`, error);
    }
  }

  // Fallback to the first model if all fail during initialization
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: generatePersonalSystemPrompt(),
  });
};

export const chatModel = getModel();

export const generateChatResponse = async (
  messages: { role: "user" | "model"; content: string }[]
) => {
  try {
    // Filter out the welcome message if it exists and ensure history starts with a user message
    const chatHistory = messages.slice(0, -1).filter((msg, index) => {
      if (index === 0) {
        return msg.role === "user";
      }
      return true;
    });

    const chat = chatModel.startChat({
      history: chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage([{ text: lastMessage.content }]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (
        error.message.includes("404") ||
        error.message.includes("not found")
      ) {
        throw new Error(
          "AI model not available. Please check your API key and try again."
        );
      } else if (error.message.includes("API key")) {
        throw new Error(
          "Invalid API key. Please check your Gemini API key configuration."
        );
      } else if (
        error.message.includes("quota") ||
        error.message.includes("limit")
      ) {
        throw new Error("API quota exceeded. Please try again later.");
      }
    }

    throw new Error("Failed to generate response. Please try again.");
  }
};
