import { useState, useCallback } from "react";
import {
  createWelcomeMessage,
  createUserMessage,
  createBotMessage,
  filterChatHistory,
  updateMessageStatus,
} from "@/lib/chat-utils";
import { ChatState } from "@/types/chat";

interface UseChatReturn {
  chatState: ChatState;
  sendMessage: (content: string) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
  isLoading: boolean;
}

export const useChat = (): UseChatReturn => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [createWelcomeMessage()],
    isTyping: false,
  });

  const sendChatRequest = useCallback(
    async (
      messageHistory: Array<{ role: "user" | "model"; content: string }>
    ) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messageHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      return data.response;
    },
    []
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage = createUserMessage(content);

      // Add user message and set typing state
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true,
        error: undefined,
      }));

      try {
        // Prepare message history for API
        const messageHistory = filterChatHistory([
          ...chatState.messages,
          userMessage,
        ]);

        // Send to API
        const botResponse = await sendChatRequest(messageHistory);

        // Update user message status to sent
        setChatState((prev) => ({
          ...prev,
          messages: updateMessageStatus(prev.messages, userMessage.id, "sent"),
        }));

        // Add bot response
        const botMessage = createBotMessage(botResponse);
        setChatState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          isTyping: false,
        }));
      } catch (error) {
        console.error("Error sending message:", error);

        // Update message status to error
        setChatState((prev) => ({
          ...prev,
          messages: updateMessageStatus(prev.messages, userMessage.id, "error"),
          isTyping: false,
          error:
            error instanceof Error ? error.message : "Failed to send message",
        }));
      }
    },
    [chatState.messages, sendChatRequest]
  );

  const retryMessage = useCallback(
    async (messageId: string) => {
      const messageToRetry = chatState.messages.find(
        (msg) => msg.id === messageId
      );
      if (!messageToRetry) return;

      // Remove the failed message and any subsequent messages
      const messageIndex = chatState.messages.findIndex(
        (msg) => msg.id === messageId
      );
      const updatedMessages = chatState.messages.slice(0, messageIndex);

      setChatState((prev) => ({
        ...prev,
        messages: updatedMessages,
        isTyping: false,
        error: undefined,
      }));

      // Retry sending the message
      await sendMessage(messageToRetry.content);
    },
    [chatState.messages, sendMessage]
  );

  return {
    chatState,
    sendMessage,
    retryMessage,
    isLoading: chatState.isTyping,
  };
};
