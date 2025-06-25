/**
 * Represents a single chat message
 */
export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isBot: boolean;
  status?: MessageStatus;
}

/**
 * Possible states of a message
 */
export type MessageStatus = "sending" | "sent" | "error";

/**
 * Overall state of the chat interface
 */
export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error?: string;
}

/**
 * API request format for chat messages
 */
export interface ChatApiMessage {
  role: "user" | "model";
  content: string;
}

/**
 * API response format for chat
 */
export interface ChatApiResponse {
  response: string;
}

/**
 * API error response format
 */
export interface ChatApiError {
  error: string;
}
