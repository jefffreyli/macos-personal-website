import { Message } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import { getPersonalIntroduction } from "./personal-context";

export const WELCOME_MESSAGE_ID = "welcome-message";

export const createWelcomeMessage = (): Message => ({
  id: WELCOME_MESSAGE_ID,
  content: getPersonalIntroduction(),
  timestamp: formatTimestamp(new Date()),
  isBot: true,
  status: "sent",
});

export const createUserMessage = (content: string): Message => ({
  id: uuidv4(),
  content,
  timestamp: formatTimestamp(new Date()),
  isBot: false,
  status: "sending",
});

export const createBotMessage = (content: string): Message => ({
  id: uuidv4(),
  content,
  timestamp: formatTimestamp(new Date()),
  isBot: true,
  status: "sent",
});

export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const filterChatHistory = (
  messages: Message[]
): Array<{ role: "user" | "model"; content: string }> => {
  return messages
    .filter((msg) => msg.id !== WELCOME_MESSAGE_ID)
    .map((msg) => ({
      role: msg.isBot ? "model" : ("user" as const),
      content: msg.content,
    }));
};

export const updateMessageStatus = (
  messages: Message[],
  messageId: string,
  status: Message["status"]
): Message[] => {
  return messages.map((msg) =>
    msg.id === messageId ? { ...msg, status } : msg
  );
};
